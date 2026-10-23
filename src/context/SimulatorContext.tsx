'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { User, Asset, Position, Order, Mission, PortfolioSummary, OrderType } from '@/types';
import { INITIAL_ASSETS, fetchLiveMarketData } from '@/services/marketData';
import {
  roundFinancial,
  validateOrderQuantity,
  sanitizeText,
  safeParseCash,
  safeParsePositions,
  safeParseOrders,
  safeParseUser,
} from '@/utils/security';

interface SimulatorContextType {
  user: User;
  assets: Asset[];
  positions: Position[];
  orders: Order[];
  missions: Mission[];
  summary: PortfolioSummary;
  isAuthenticated: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  isResetModalOpen: boolean;
  setIsResetModalOpen: (open: boolean) => void;
  buyAsset: (ticker: string, quantity: number) => { success: boolean; message: string };
  sellAsset: (ticker: string, quantity: number) => { success: boolean; message: string };
  resetPortfolio: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  refreshPrices: () => Promise<void>;
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;
  setNotification: (notif: { type: 'success' | 'error' | 'info'; message: string } | null) => void;
}

const DEFAULT_USER: User = {
  id: 'usr_edu_1001',
  name: 'Arthur Souza',
  email: 'arthur.souza@bahiacapital.com.br',
  investorProfile: 'MODERADO',
  xp: 350,
  level: 'Investidor Aprendiz (Nível 2)',
  enrolledCourse: 'Formação Investidor Inteligente B3 & Cripto',
  joinedAt: '2026-10-15T10:00:00Z',
};

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'mis_1',
    title: 'Primeira Ordem Simulada',
    description: 'Realize sua primeira compra fictícia de Ação ou Criptomoeda sem risco real.',
    xpReward: 100,
    completed: true,
    category: 'iniciante',
  },
  {
    id: 'mis_2',
    title: 'Princípio da Diversificação',
    description: 'Possua pelo menos 3 ativos distintos na carteira (Ex: 2 ações e 1 cripto).',
    xpReward: 150,
    completed: false,
    category: 'diversificacao',
  },
  {
    id: 'mis_3',
    title: 'Gestão Prudente de Risco',
    description: 'Mantenha pelo menos 20% do patrimônio em reserva de caixa disponível.',
    xpReward: 100,
    completed: true,
    category: 'estrategia',
  },
  {
    id: 'mis_4',
    title: 'Raio-X de Ativo',
    description: 'Acesse os detalhes de uma ação para analisar indicadores fundamentalistas (P/L e DY).',
    xpReward: 50,
    completed: true,
    category: 'iniciante',
  },
  {
    id: 'mis_5',
    title: 'Superando a Volatilidade',
    description: 'Obtenha rentabilidade acumulada positiva após 3 operações de compra/venda.',
    xpReward: 200,
    completed: false,
    category: 'estrategia',
  },
];

const INITIAL_POSITIONS: Position[] = [
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
  {
    ticker: 'VALE3',
    name: 'Vale ON',
    type: 'ACAO',
    quantity: 15,
    averagePrice: 62.10,
    currentPrice: 61.80,
    totalCost: 931.50,
    currentValue: 927.00,
    profitLoss: -4.50,
    profitLossPercent: -0.48,
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'CRIPTO',
    quantity: 0.05,
    averagePrice: 16800.00,
    currentPrice: 17280.00,
    totalCost: 840.00,
    currentValue: 864.00,
    profitLoss: 24.00,
    profitLossPercent: 2.85,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    ticker: 'PETR4',
    name: 'Petrobras PN',
    type: 'COMPRA',
    assetType: 'ACAO',
    quantity: 50,
    unitPrice: 34.80,
    totalValue: 1740.00,
    fee: 0.00,
    executedAt: '2026-10-18T14:32:00Z',
    status: 'EXECUTADA',
    portfolioAllocationAtExecution: 17.4,
  },
  {
    id: 'ord_1002',
    ticker: 'VALE3',
    name: 'Vale ON',
    type: 'COMPRA',
    assetType: 'ACAO',
    quantity: 15,
    unitPrice: 62.10,
    totalValue: 931.50,
    fee: 0.00,
    executedAt: '2026-10-19T11:15:00Z',
    status: 'EXECUTADA',
    portfolioAllocationAtExecution: 9.3,
  },
  {
    id: 'ord_1003',
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'COMPRA',
    assetType: 'CRIPTO',
    quantity: 0.05,
    unitPrice: 16800.00,
    totalValue: 840.00,
    fee: 0.00,
    executedAt: '2026-10-20T16:45:00Z',
    status: 'EXECUTADA',
    portfolioAllocationAtExecution: 8.4,
  },
];

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [cash, setCash] = useState<number>(6488.50); // Initial 10k - initial purchases
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [missions, setMissions] = useState<Mission[]>(DEFAULT_MISSIONS);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Safe load from LocalStorage with schema verification & integrity fallbacks
  useEffect(() => {
    try {
      const savedCash = localStorage.getItem('bahia_cash');
      const savedPositions = localStorage.getItem('bahia_positions');
      const savedOrders = localStorage.getItem('bahia_orders');
      const savedUser = localStorage.getItem('bahia_user');
      const savedMissions = localStorage.getItem('bahia_missions');
      const savedAuth = localStorage.getItem('bahia_auth_session');

      setCash(safeParseCash(savedCash, 6488.50));
      setPositions(safeParsePositions(savedPositions, INITIAL_POSITIONS));
      setOrders(safeParseOrders(savedOrders, INITIAL_ORDERS));
      setUser(safeParseUser(savedUser, DEFAULT_USER));
      
      if (savedAuth !== null) {
        setIsAuthenticated(savedAuth === 'true');
      }

      if (savedMissions !== null) {
        try {
          const parsed = JSON.parse(savedMissions);
          if (Array.isArray(parsed)) setMissions(parsed);
        } catch {}
      }
    } catch {
      // Safe fallback already active
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bahia_cash', JSON.stringify(cash));
      localStorage.setItem('bahia_positions', JSON.stringify(positions));
      localStorage.setItem('bahia_orders', JSON.stringify(orders));
      localStorage.setItem('bahia_user', JSON.stringify(user));
      localStorage.setItem('bahia_missions', JSON.stringify(missions));
      localStorage.setItem('bahia_auth_session', String(isAuthenticated));
    } catch {
      // ignore
    }
  }, [cash, positions, orders, user, missions, isAuthenticated]);

  const login = useCallback((email?: string, name?: string) => {
    setIsAuthenticated(true);
    if (email || name) {
      setUser((prev) => ({
        ...prev,
        email: email ? sanitizeText(email, 120) : prev.email,
        name: name ? sanitizeText(name, 80) : prev.name,
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Fetch live market data
  const refreshPrices = useCallback(async () => {
    const live = await fetchLiveMarketData();
    setAssets(live);

    // Update positions with current prices
    setPositions((prev) =>
      prev.map((pos) => {
        const found = live.find((a) => a.ticker === pos.ticker);
        const currentPrice = found ? found.price : pos.currentPrice;
        const currentValue = pos.quantity * currentPrice;
        const profitLoss = currentValue - pos.totalCost;
        const profitLossPercent = pos.totalCost > 0 ? (profitLoss / pos.totalCost) * 100 : 0;
        return {
          ...pos,
          currentPrice,
          currentValue,
          profitLoss,
          profitLossPercent,
        };
      })
    );
  }, []);

  useEffect(() => {
    refreshPrices();
    const interval = setInterval(refreshPrices, 60000);
    return () => clearInterval(interval);
  }, [refreshPrices]);

  // Auto-dismiss notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Check missions
  useEffect(() => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === 'mis_2' && positions.length >= 3) {
          return { ...m, completed: true };
        }
        return m;
      })
    );
  }, [positions]);

  // Buy Asset (Hardened against negative values, float drift and race conditions)
  const buyAsset = useCallback(
    (ticker: string, rawQuantity: number) => {
      const asset = assets.find((a) => a.ticker === ticker);
      if (!asset) return { success: false, message: 'Ativo não encontrado no mercado simulado.' };

      const validation = validateOrderQuantity(rawQuantity, asset.type);
      if (!validation.isValid) {
        return { success: false, message: validation.error || 'Quantidade inválida para negociação.' };
      }
      const quantity = validation.parsedQuantity;

      const totalCost = roundFinancial(quantity * asset.price, 2);
      if (totalCost > cash) {
        return {
          success: false,
          message: `Saldo insuficiente. Necessário: R$ ${totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} | Disponível: R$ ${cash.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        };
      }

      // Deduct cash safely with 2 decimals
      setCash((prev) => roundFinancial(prev - totalCost, 2));

      // Update positions
      setPositions((prev) => {
        const existing = prev.find((p) => p.ticker === ticker);
        if (existing) {
          const newQty = asset.type === 'ACAO' 
            ? Math.floor(existing.quantity + quantity)
            : roundFinancial(existing.quantity + quantity, 6);
          const newTotalCost = roundFinancial(existing.totalCost + totalCost, 2);
          const newAveragePrice = roundFinancial(newTotalCost / newQty, 2);
          const currentValue = roundFinancial(newQty * asset.price, 2);
          const profitLoss = roundFinancial(currentValue - newTotalCost, 2);
          const profitLossPercent = newTotalCost > 0 ? roundFinancial((profitLoss / newTotalCost) * 100, 2) : 0;

          return prev.map((p) =>
            p.ticker === ticker
              ? {
                  ...p,
                  quantity: newQty,
                  averagePrice: newAveragePrice,
                  currentPrice: asset.price,
                  totalCost: newTotalCost,
                  currentValue,
                  profitLoss,
                  profitLossPercent,
                }
              : p
          );
        } else {
          return [
            ...prev,
            {
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
            },
          ];
        }
      });

      // Record Order
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        ticker: asset.ticker,
        name: asset.name,
        type: 'COMPRA',
        assetType: asset.type,
        quantity,
        unitPrice: asset.price,
        totalValue: totalCost,
        fee: 0.00,
        executedAt: new Date().toISOString(),
        status: 'EXECUTADA',
        portfolioAllocationAtExecution: Number(((totalCost / (cash + positions.reduce((acc, p) => acc + p.currentValue, 0))) * 100).toFixed(1)),
      };
      setOrders((prev) => [newOrder, ...prev]);

      // Add XP
      setUser((prev) => ({ ...prev, xp: prev.xp + 50 }));

      setNotification({
        type: 'success',
        message: `Ordem simulada executada: Compra de ${quantity}x ${ticker} por R$ ${totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}!`,
      });

      return { success: true, message: 'Ordem de compra simulada executada com sucesso!' };
    },
    [assets, cash, positions]
  );

  // Sell Asset (BUG-01 Fix: Hardened against negative quantity asset duplication)
  const sellAsset = useCallback(
    (ticker: string, rawQuantity: number) => {
      const asset = assets.find((a) => a.ticker === ticker);
      if (!asset) return { success: false, message: 'Ativo não encontrado.' };

      const validation = validateOrderQuantity(rawQuantity, asset.type);
      if (!validation.isValid) {
        return { success: false, message: validation.error || 'Quantidade inválida para venda.' };
      }
      const quantity = validation.parsedQuantity;

      const position = positions.find((p) => p.ticker === ticker);
      if (!position || position.quantity < quantity) {
        return {
          success: false,
          message: `Quantidade insuficiente em custódia. Você possui: ${position?.quantity || 0} ${ticker}.`,
        };
      }

      const totalSale = roundFinancial(quantity * asset.price, 2);
      const costPortion = roundFinancial((position.totalCost / position.quantity) * quantity, 2);
      const profitOnSale = roundFinancial(totalSale - costPortion, 2);

      // Add cash safely with 2 decimals
      setCash((prev) => roundFinancial(prev + totalSale, 2));

      // Update positions
      setPositions((prev) => {
        const remainingQty = asset.type === 'ACAO'
          ? Math.floor(position.quantity - quantity)
          : roundFinancial(position.quantity - quantity, 6);

        if (remainingQty <= 0.000001) {
          return prev.filter((p) => p.ticker !== ticker);
        } else {
          const newTotalCost = roundFinancial(Math.max(0, position.totalCost - costPortion), 2);
          const currentValue = roundFinancial(remainingQty * asset.price, 2);
          const profitLoss = roundFinancial(currentValue - newTotalCost, 2);
          const profitLossPercent = newTotalCost > 0 ? roundFinancial((profitLoss / newTotalCost) * 100, 2) : 0;

          return prev.map((p) =>
            p.ticker === ticker
              ? {
                  ...p,
                  quantity: remainingQty,
                  totalCost: newTotalCost,
                  currentValue,
                  profitLoss,
                  profitLossPercent,
                }
              : p
          );
        }
      });

      // Record Order
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        ticker: asset.ticker,
        name: asset.name,
        type: 'VENDA',
        assetType: asset.type,
        quantity,
        unitPrice: asset.price,
        totalValue: totalSale,
        fee: 0.00,
        executedAt: new Date().toISOString(),
        status: 'EXECUTADA',
        portfolioAllocationAtExecution: 0,
      };
      setOrders((prev) => [newOrder, ...prev]);

      setUser((prev) => ({ ...prev, xp: prev.xp + 40 }));

      setNotification({
        type: 'info',
        message: `Venda simulada executada: ${quantity}x ${ticker} creditados (R$ ${totalSale.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})! ${profitOnSale >= 0 ? `Lucro: +R$ ${profitOnSale.toFixed(2)}` : `Prejuízo: -R$ ${Math.abs(profitOnSale).toFixed(2)}`}`,
      });

      return { success: true, message: 'Ordem de venda executada com sucesso!' };
    },
    [assets, positions]
  );

  // Reset Portfolio (Pedagogical reset back to R$ 10.000,00)
  const resetPortfolio = useCallback(() => {
    setCash(10000.00);
    setPositions([]);
    setOrders([]);
    setIsResetModalOpen(false);
    setNotification({
      type: 'success',
      message: 'Carteira zerada com sucesso! Seu saldo inicial pedagógico de R$ 10.000,00 foi restaurado.',
    });
  }, []);

  const updateUserProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => ({
      ...prev,
      name: data.name !== undefined ? sanitizeText(data.name, 80) : prev.name,
      email: data.email !== undefined ? sanitizeText(data.email, 120) : prev.email,
      investorProfile: data.investorProfile || prev.investorProfile,
    }));
  }, []);

  // Calculate summary
  const summary: PortfolioSummary = useMemo(() => {
    const invested = positions.reduce((acc, p) => acc + p.currentValue, 0);
    const total = cash + invested;
    const initialCapital = 10000.00;
    const totalProfitLoss = total - initialCapital;
    const totalProfitLossPercent = (totalProfitLoss / initialCapital) * 100;

    // Day yield approximation
    const dayYield = positions.reduce((acc, p) => {
      const asset = assets.find((a) => a.ticker === p.ticker);
      const changeRate = (asset?.change24h || 0) / 100;
      return acc + (p.currentValue * changeRate);
    }, 0);
    const dayYieldPercent = total > 0 ? (dayYield / total) * 100 : 0;

    return {
      cash,
      invested,
      total,
      totalProfitLoss,
      totalProfitLossPercent,
      dayYield,
      dayYieldPercent,
    };
  }, [cash, positions, assets]);

  return (
    <SimulatorContext.Provider
      value={{
        user,
        assets,
        positions,
        orders,
        missions,
        summary,
        isAuthenticated,
        login,
        logout,
        isResetModalOpen,
        setIsResetModalOpen,
        buyAsset,
        sellAsset,
        resetPortfolio,
        updateUserProfile,
        refreshPrices,
        notification,
        setNotification,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
}
