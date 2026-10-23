import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_ASSETS } from '@/services/marketData';
import { validateOrderQuantity, roundFinancial } from '@/utils/security';
import { Position, Order } from '@/types';

// Simulador puro isolado da lógica de negócios financeira para testes de arquitetura e QA
describe('QA Suite: Motor de Execução Financeira e Regras de Negócio', () => {
  let cash: number;
  let positions: Position[];
  let orders: Order[];

  beforeEach(() => {
    cash = 10000.00;
    positions = [
      {
        ticker: 'PETR4',
        name: 'Petrobras PN',
        type: 'ACAO',
        quantity: 50,
        averagePrice: 34.80,
        currentPrice: 36.42,
        totalCost: 1740.00,
        currentValue: 1821.00,
        profitLoss: 81.00,
        profitLossPercent: 4.65,
      },
    ];
    orders = [];
  });

  const executeBuy = (ticker: string, rawQty: number) => {
    const asset = INITIAL_ASSETS.find((a) => a.ticker === ticker);
    if (!asset) return { success: false, message: 'Ativo não encontrado.' };

    const validation = validateOrderQuantity(rawQty, asset.type);
    if (!validation.isValid) return { success: false, message: validation.error };
    const quantity = validation.parsedQuantity;

    const totalCost = roundFinancial(quantity * asset.price, 2);
    if (totalCost > cash) return { success: false, message: 'Saldo insuficiente.' };

    cash = roundFinancial(cash - totalCost, 2);
    const existing = positions.find((p) => p.ticker === ticker);
    if (existing) {
      const newQty = asset.type === 'ACAO' ? Math.floor(existing.quantity + quantity) : roundFinancial(existing.quantity + quantity, 6);
      const newTotalCost = roundFinancial(existing.totalCost + totalCost, 2);
      existing.quantity = newQty;
      existing.totalCost = newTotalCost;
      existing.averagePrice = roundFinancial(newTotalCost / newQty, 2);
    } else {
      positions.push({
        ticker: asset.ticker,
        name: asset.name,
        type: asset.type,
        quantity,
        averagePrice: asset.price,
        currentPrice: asset.price,
        totalCost,
        currentValue: totalCost,
        profitLoss: 0,
        profitLossPercent: 0,
      });
    }
    return { success: true };
  };

  const executeSell = (ticker: string, rawQty: number) => {
    const asset = INITIAL_ASSETS.find((a) => a.ticker === ticker);
    if (!asset) return { success: false, message: 'Ativo não encontrado.' };

    const validation = validateOrderQuantity(rawQty, asset.type);
    if (!validation.isValid) return { success: false, message: validation.error };
    const quantity = validation.parsedQuantity;

    const position = positions.find((p) => p.ticker === ticker);
    if (!position || position.quantity < quantity) {
      return { success: false, message: 'Quantidade insuficiente em custódia.' };
    }

    const totalSale = roundFinancial(quantity * asset.price, 2);
    const costPortion = roundFinancial((position.totalCost / position.quantity) * quantity, 2);

    cash = roundFinancial(cash + totalSale, 2);
    const remainingQty = asset.type === 'ACAO'
      ? Math.floor(position.quantity - quantity)
      : roundFinancial(position.quantity - quantity, 6);

    if (remainingQty <= 0.000001) {
      positions = positions.filter((p) => p.ticker !== ticker);
    } else {
      position.quantity = remainingQty;
      position.totalCost = roundFinancial(Math.max(0, position.totalCost - costPortion), 2);
    }

    return { success: true };
  };

  describe('Cenários de Compra (Buy Order Flow)', () => {
    it('deve debitar saldo e atualizar preço médio ao comprar ações existentes', () => {
      // Compra 50 PETR4 @ 36.42 = R$ 1821.00
      const res = executeBuy('PETR4', 50);
      expect(res.success).toBe(true);
      expect(cash).toBe(8179.00); // 10000 - 1821.00

      const petr4 = positions.find((p) => p.ticker === 'PETR4');
      expect(petr4?.quantity).toBe(100);
      expect(petr4?.totalCost).toBe(3561.00); // 1740 + 1821
      expect(petr4?.averagePrice).toBe(35.61); // 3561 / 100
    });

    it('deve rejeitar compra quando o custo excede o saldo disponível', () => {
      // Tenta comprar 1000 VALE3 @ 61.80 = R$ 61.800 (saldo é 10.000)
      const res = executeBuy('VALE3', 1000);
      expect(res.success).toBe(false);
      expect(res.message).toBe('Saldo insuficiente.');
      expect(cash).toBe(10000.00);
    });

    it('deve rejeitar compra de fração para ações B3', () => {
      const res = executeBuy('PETR4', 10.5);
      expect(res.success).toBe(false);
      expect(res.message).toContain('número inteiro');
      expect(cash).toBe(10000.00);
    });
  });

  describe('Cenários de Venda (Sell Order Flow & BUG-01 Security Protection)', () => {
    it('SEGURANÇA: deve bloquear tentativa de injeção de ativos com quantidade negativa (-50)', () => {
      const res = executeSell('PETR4', -50);
      expect(res.success).toBe(false);
      expect(res.message).toContain('estritamente maior que zero');
      
      const petr4 = positions.find((p) => p.ticker === 'PETR4');
      expect(petr4?.quantity).toBe(50); // Intacto, sem multiplicação fraudulenta
      expect(cash).toBe(10000.00);
    });

    it('deve rejeitar venda quando a quantidade solicitada excede a custódia', () => {
      const res = executeSell('PETR4', 51);
      expect(res.success).toBe(false);
      expect(res.message).toBe('Quantidade insuficiente em custódia.');
      expect(cash).toBe(10000.00);
    });

    it('deve liquidar parcialmente a posição e creditar o valor da venda', () => {
      // Vende 20 PETR4 @ 36.42 = R$ 728.40
      const res = executeSell('PETR4', 20);
      expect(res.success).toBe(true);
      expect(cash).toBe(10728.40);

      const petr4 = positions.find((p) => p.ticker === 'PETR4');
      expect(petr4?.quantity).toBe(30);
      expect(petr4?.totalCost).toBe(1044.00); // 1740 - (1740/50 * 20) = 1740 - 696 = 1044
    });

    it('deve remover o ativo da carteira quando a quantidade restante for zero', () => {
      const res = executeSell('PETR4', 50);
      expect(res.success).toBe(true);
      expect(positions.find((p) => p.ticker === 'PETR4')).toBeUndefined();
      expect(cash).toBe(11821.00); // 10000 + (50 * 36.42 = 1821)
    });
  });
});
