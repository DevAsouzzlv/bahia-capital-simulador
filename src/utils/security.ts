import { AssetType, Position, Order, User, InvestorProfile } from '@/types';

/**
 * Arredondamento financeiro preciso com base no algoritmo exponencial
 * para mitigar deriva de ponto flutuante IEEE 754 (ex: 0.1 + 0.2 != 0.3).
 */
export function roundFinancial(value: number, decimals: number = 2): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0;
  }
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  parsedQuantity: number;
}

/**
 * Validação rigorosa de quantidade para ordens de compra e venda.
 * Previne explorações de quantidade negativa (BUG-01), NaN, Infinity,
 * overflow de buffer e frações inválidas de ações B3.
 */
export function validateOrderQuantity(rawQuantity: unknown, assetType: AssetType): ValidationResult {
  if (rawQuantity === null || rawQuantity === undefined || rawQuantity === '') {
    return { isValid: false, error: 'A quantidade é obrigatória.', parsedQuantity: 0 };
  }

  const num = typeof rawQuantity === 'number' ? rawQuantity : parseFloat(String(rawQuantity).replace(',', '.'));

  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return { isValid: false, error: 'A quantidade deve ser um número válido.', parsedQuantity: 0 };
  }

  if (num <= 0) {
    return { isValid: false, error: 'A quantidade deve ser estritamente maior que zero.', parsedQuantity: 0 };
  }

  // Prevenção contra overflow / números astronômicos
  if (num > 100_000_000) {
    return { isValid: false, error: 'A quantidade excede o limite máximo permitido por ordem.', parsedQuantity: 0 };
  }

  if (assetType === 'ACAO') {
    if (!Number.isInteger(num)) {
      return {
        isValid: false,
        error: 'Para ações negociadas na B3, a quantidade deve ser um número inteiro de cotas.',
        parsedQuantity: 0,
      };
    }
    return { isValid: true, parsedQuantity: Math.floor(num) };
  }

  // Criptomoedas: limite de 6 casas decimais
  const roundedCripto = roundFinancial(num, 6);
  if (roundedCripto <= 0) {
    return { isValid: false, error: 'A fração mínima para criptomoedas é de 0.000001.', parsedQuantity: 0 };
  }

  return { isValid: true, parsedQuantity: roundedCripto };
}

/**
 * Sanitiza tickers recebidos via URL (query params ou rotas dinâmicas)
 * para mitigar injeção de parâmetros maliciosos ou DOM-XSS.
 */
export function sanitizeTicker(rawTicker: unknown, validTickers: string[]): string {
  if (typeof rawTicker !== 'string' || !rawTicker.trim()) {
    return validTickers[0] || 'PETR4';
  }

  const clean = rawTicker.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const exists = validTickers.find((t) => t.toUpperCase() === clean);
  return exists || validTickers[0] || 'PETR4';
}

/**
 * Sanitiza strings gerais (nome, email) para prevenir injeção de HTML/scripts.
 */
export function sanitizeText(raw: unknown, maxLength: number = 100): string {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Desserialização segura do LocalStorage com fallback robusto contra manipulação / corrupção.
 */
export function safeParseCash(raw: string | null, fallback: number): number {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    const num = typeof parsed === 'number' ? parsed : parseFloat(parsed);
    if (Number.isFinite(num) && num >= 0 && num <= 1_000_000_000) {
      return roundFinancial(num, 2);
    }
  } catch {
    // Retorna fallback seguro se JSON ou valor for corrompido
  }
  return fallback;
}

export function safeParsePositions(raw: string | null, fallback: Position[]): Position[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;

    const validated: Position[] = [];
    for (const item of parsed) {
      if (
        item &&
        typeof item.ticker === 'string' &&
        item.ticker.length > 0 &&
        typeof item.quantity === 'number' &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0 &&
        typeof item.averagePrice === 'number' &&
        Number.isFinite(item.averagePrice) &&
        item.averagePrice >= 0 &&
        typeof item.totalCost === 'number' &&
        Number.isFinite(item.totalCost) &&
        item.totalCost >= 0
      ) {
        validated.push({
          ticker: sanitizeText(item.ticker, 10),
          name: sanitizeText(item.name || item.ticker, 60),
          type: item.type === 'CRIPTO' ? 'CRIPTO' : 'ACAO',
          quantity: item.type === 'CRIPTO' ? roundFinancial(item.quantity, 6) : Math.floor(item.quantity),
          averagePrice: roundFinancial(item.averagePrice, 2),
          currentPrice: roundFinancial(item.currentPrice || item.averagePrice, 2),
          totalCost: roundFinancial(item.totalCost, 2),
          currentValue: roundFinancial(item.currentValue || item.totalCost, 2),
          profitLoss: roundFinancial(item.profitLoss || 0, 2),
          profitLossPercent: roundFinancial(item.profitLossPercent || 0, 2),
        });
      }
    }
    return validated;
  } catch {
    return fallback;
  }
}

export function safeParseOrders(raw: string | null, fallback: Order[]): Order[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.filter(
      (o) =>
        o &&
        typeof o.id === 'string' &&
        typeof o.ticker === 'string' &&
        (o.type === 'COMPRA' || o.type === 'VENDA') &&
        typeof o.quantity === 'number' &&
        o.quantity > 0
    );
  } catch {
    return fallback;
  }
}

export function safeParseUser(raw: string | null, fallback: User): User {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      const validProfiles: InvestorProfile[] = ['CONSERVADOR', 'MODERADO', 'ARROJADO'];
      return {
        id: sanitizeText(parsed.id || fallback.id, 40),
        name: sanitizeText(parsed.name || fallback.name, 80),
        email: sanitizeText(parsed.email || fallback.email, 120),
        investorProfile: validProfiles.includes(parsed.investorProfile)
          ? parsed.investorProfile
          : fallback.investorProfile,
        xp: Number.isFinite(parsed.xp) && parsed.xp >= 0 ? parsed.xp : fallback.xp,
        level: sanitizeText(parsed.level || fallback.level, 60),
        enrolledCourse: sanitizeText(parsed.enrolledCourse || fallback.enrolledCourse, 100),
        joinedAt: sanitizeText(parsed.joinedAt || fallback.joinedAt, 40),
      };
    }
  } catch {
    // fallback
  }
  return fallback;
}
