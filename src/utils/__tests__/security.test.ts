import { describe, it, expect } from 'vitest';
import {
  validateOrderQuantity,
  roundFinancial,
  sanitizeTicker,
  sanitizeText,
  safeParseCash,
  safeParsePositions,
} from '../security';

describe('Security & QA Suite: Validação Financeira e Sanitização', () => {
  describe('validateOrderQuantity (Prevenção de Ataques de Lógica / BUG-01)', () => {
    it('deve rejeitar quantidades negativas para ações (mitigando injeção de ativos)', () => {
      const res = validateOrderQuantity(-50, 'ACAO');
      expect(res.isValid).toBe(false);
      expect(res.parsedQuantity).toBe(0);
      expect(res.error).toContain('estritamente maior que zero');
    });

    it('deve rejeitar quantidades negativas para criptomoedas', () => {
      const res = validateOrderQuantity(-0.05, 'CRIPTO');
      expect(res.isValid).toBe(false);
      expect(res.parsedQuantity).toBe(0);
    });

    it('deve rejeitar quantidade zero', () => {
      const res = validateOrderQuantity(0, 'ACAO');
      expect(res.isValid).toBe(false);
    });

    it('deve rejeitar valores NaN, Infinity e strings não numéricas', () => {
      expect(validateOrderQuantity(NaN, 'ACAO').isValid).toBe(false);
      expect(validateOrderQuantity(Infinity, 'ACAO').isValid).toBe(false);
      expect(validateOrderQuantity('-Infinity', 'ACAO').isValid).toBe(false);
      expect(validateOrderQuantity('abc', 'ACAO').isValid).toBe(false);
      expect(validateOrderQuantity('<script>', 'ACAO').isValid).toBe(false);
    });

    it('deve rejeitar frações para ações B3 (exigência de número inteiro de cotas)', () => {
      const res = validateOrderQuantity(10.5, 'ACAO');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('número inteiro');
    });

    it('deve aceitar números inteiros válidos para ações', () => {
      const res = validateOrderQuantity('100', 'ACAO');
      expect(res.isValid).toBe(true);
      expect(res.parsedQuantity).toBe(100);
    });

    it('deve aceitar frações válidas para criptomoedas calibrando para até 6 casas decimais', () => {
      const res = validateOrderQuantity(0.0054321, 'CRIPTO');
      expect(res.isValid).toBe(true);
      expect(res.parsedQuantity).toBe(0.005432);
    });

    it('deve rejeitar overflow de quantidade astronômica (> 100 milhões)', () => {
      const res = validateOrderQuantity(100_000_001, 'ACAO');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('limite máximo');
    });
  });

  describe('roundFinancial (Mitigação de Deriva de Ponto Flutuante IEEE 754)', () => {
    it('deve somar valores monetários sem dízimas residuais (0.1 + 0.2 = 0.3)', () => {
      const sum = 0.1 + 0.2;
      expect(sum).not.toBe(0.3); // Demonstra a falha nativa do JS
      expect(roundFinancial(sum, 2)).toBe(0.3); // Demonstra a correção financeira
    });

    it('deve calcular adequadamente arredondamento de duas casas para BRL', () => {
      expect(roundFinancial(34.805, 2)).toBe(34.81);
      expect(roundFinancial(34.804, 2)).toBe(34.80);
    });
  });

  describe('sanitizeTicker (Mitigação de Injeção de Parâmetros e DOM-XSS)', () => {
    const validTickers = ['PETR4', 'VALE3', 'BTC', 'ETH'];

    it('deve retornar ticker limpo e maiúsculo quando for válido', () => {
      expect(sanitizeTicker('petr4', validTickers)).toBe('PETR4');
      expect(sanitizeTicker('  vale3  ', validTickers)).toBe('VALE3');
    });

    it('deve descartar caracteres especiais e scripts, retornando fallback seguro', () => {
      expect(sanitizeTicker('<script>alert(1)</script>', validTickers)).toBe('PETR4');
      expect(sanitizeTicker('UNKNOWN99', validTickers)).toBe('PETR4');
    });
  });

  describe('sanitizeText', () => {
    it('deve remover tags HTML perigosas e scripts, respeitando tamanho máximo', () => {
      const result = sanitizeText('<b>Arthur Souza</b><script>alert(1)</script>', 20);
      expect(result).toBe('Arthur Souza');
    });
  });

  describe('safeParseCash (Resiliência contra manipulação de LocalStorage)', () => {
    it('deve retornar fallback se o valor em LocalStorage for nulo ou inválido', () => {
      expect(safeParseCash(null, 10000)).toBe(10000);
      expect(safeParseCash('invalid_json', 10000)).toBe(10000);
      expect(safeParseCash('"NaN"', 10000)).toBe(10000);
      expect(safeParseCash('-500', 10000)).toBe(10000);
      expect(safeParseCash('Infinity', 10000)).toBe(10000);
    });

    it('deve carregar saldo legítimo salvo', () => {
      expect(safeParseCash('8500.50', 10000)).toBe(8500.50);
    });
  });

  describe('safeParsePositions', () => {
    it('deve filtrar posições corrompidas ou injetadas com quantidade negativa', () => {
      const maliciousJson = JSON.stringify([
        { ticker: 'PETR4', quantity: 50, averagePrice: 34.8, totalCost: 1740 },
        { ticker: 'HACK', quantity: -999, averagePrice: 10, totalCost: -9990 }, // Injeção
        { ticker: null, quantity: 'abc' }, // Inválido
      ]);

      const result = safeParsePositions(maliciousJson, []);
      expect(result.length).toBe(1);
      expect(result[0].ticker).toBe('PETR4');
      expect(result[0].quantity).toBe(50);
    });
  });
});
