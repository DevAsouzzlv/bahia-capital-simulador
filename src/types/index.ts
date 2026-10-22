export type AssetType = 'ACAO' | 'CRIPTO';

export type InvestorProfile = 'CONSERVADOR' | 'MODERADO' | 'ARROJADO';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  investorProfile: InvestorProfile;
  xp: number;
  level: string;
  enrolledCourse: string;
  joinedAt: string;
}

export interface Asset {
  ticker: string;
  name: string;
  type: AssetType;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: string;
  logo: string;
  peRatio?: number;
  dividendYield?: number;
  roe?: number;
  marketCap?: string;
  description: string;
  sector: string;
  sparkline: number[];
}

export interface Position {
  ticker: string;
  name: string;
  type: AssetType;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export type OrderType = 'COMPRA' | 'VENDA';

export interface Order {
  id: string;
  ticker: string;
  name: string;
  type: OrderType;
  assetType: AssetType;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  fee: number;
  executedAt: string;
  status: 'EXECUTADA';
  portfolioAllocationAtExecution: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'iniciante' | 'diversificacao' | 'estrategia';
}

export interface PortfolioSummary {
  cash: number;
  invested: number;
  total: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  dayYield: number;
  dayYieldPercent: number;
}
