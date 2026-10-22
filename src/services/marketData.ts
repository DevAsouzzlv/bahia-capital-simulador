import { Asset } from '@/types';

export const INITIAL_ASSETS: Asset[] = [
  {
    ticker: 'PETR4',
    name: 'Petrobras PN',
    type: 'ACAO',
    price: 36.42,
    change24h: 1.85,
    high24h: 36.85,
    low24h: 35.90,
    volume: 'R$ 1,45 Bi',
    logo: '🛢️',
    peRatio: 4.25,
    dividendYield: 14.80,
    roe: 28.50,
    marketCap: 'R$ 474 Bi',
    description: 'Maior empresa de energia e exploração de petróleo e gás natural do Brasil, operando no pré-sal com alta geração de caixa e pagamento consistente de dividendos.',
    sector: 'Petróleo, Gás e Biocombustíveis',
    sparkline: [35.2, 35.4, 35.1, 35.8, 36.1, 36.0, 36.42],
  },
  {
    ticker: 'VALE3',
    name: 'Vale ON',
    type: 'ACAO',
    price: 61.80,
    change24h: -0.75,
    high24h: 62.40,
    low24h: 61.20,
    volume: 'R$ 1,12 Bi',
    logo: '⛏️',
    peRatio: 5.80,
    dividendYield: 9.40,
    roe: 19.20,
    marketCap: 'R$ 280 Bi',
    description: 'Uma das maiores mineradoras do mundo, líder global na produção de minério de ferro e pelotas, além de níquel e cobre para transição energética.',
    sector: 'Materiais Básicos / Mineração',
    sparkline: [63.0, 62.8, 62.1, 62.5, 61.9, 61.5, 61.80],
  },
  {
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    type: 'ACAO',
    price: 34.50,
    change24h: 0.95,
    high24h: 34.75,
    low24h: 34.15,
    volume: 'R$ 780 Mi',
    logo: '🏦',
    peRatio: 8.60,
    dividendYield: 7.20,
    roe: 21.40,
    marketCap: 'R$ 315 Bi',
    description: 'Maior banco privado da América Latina, reconhecido pela solidez, governança corporativa, eficiência digital e previsibilidade de resultados bancários.',
    sector: 'Financeiro / Intermediários Financeiros',
    sparkline: [33.9, 34.1, 34.0, 34.3, 34.4, 34.2, 34.50],
  },
  {
    ticker: 'WEGE3',
    name: 'WEG ON',
    type: 'ACAO',
    price: 52.30,
    change24h: 2.35,
    high24h: 52.90,
    low24h: 51.10,
    volume: 'R$ 490 Mi',
    logo: '⚡',
    peRatio: 29.40,
    dividendYield: 2.10,
    roe: 31.80,
    marketCap: 'R$ 219 Bi',
    description: 'Multinacional brasileira de bens de capital elétricos e automação industrial, referência global em sustentabilidade e crescimento de longo prazo.',
    sector: 'Bens Industriais / Máquinas e Equipamentos',
    sparkline: [50.1, 50.8, 51.2, 51.0, 51.8, 52.1, 52.30],
  },
  {
    ticker: 'BBAS3',
    name: 'Banco do Brasil ON',
    type: 'ACAO',
    price: 27.90,
    change24h: 1.15,
    high24h: 28.20,
    low24h: 27.50,
    volume: 'R$ 620 Mi',
    logo: '🏛️',
    peRatio: 4.10,
    dividendYield: 10.50,
    roe: 21.90,
    marketCap: 'R$ 159 Bi',
    description: 'Mais antiga instituição bancária do país, líder indiscutível no crédito do agronegócio e histórico consistente de altos dividendos.',
    sector: 'Financeiro / Bancos',
    sparkline: [27.1, 27.4, 27.2, 27.6, 27.8, 27.7, 27.90],
  },
  {
    ticker: 'BBDC4',
    name: 'Bradesco PN',
    type: 'ACAO',
    price: 13.85,
    change24h: -1.20,
    high24h: 14.10,
    low24h: 13.70,
    volume: 'R$ 410 Mi',
    logo: '🏧',
    peRatio: 9.10,
    dividendYield: 6.80,
    roe: 11.50,
    marketCap: 'R$ 145 Bi',
    description: 'Segundo maior banco privado nacional, com forte presença no segmento de seguros (Bradesco Seguros) e capilaridade em todo território brasileiro.',
    sector: 'Financeiro / Bancos',
    sparkline: [14.3, 14.1, 14.0, 13.9, 14.0, 13.8, 13.85],
  },
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    type: 'CRIPTO',
    price: 362450.00,
    change24h: 3.40,
    high24h: 369800.00,
    low24h: 351200.00,
    volume: 'R$ 185 Bi',
    logo: '₿',
    marketCap: 'R$ 7,1 Tri',
    description: 'A primeira e mais segura moeda digital descentralizada do mundo, pioneira na tecnologia blockchain e utilizada como reserva de valor digital (ouro digital).',
    sector: 'Criptomoedas / Reserva de Valor',
    sparkline: [348000, 351000, 349500, 355000, 358000, 360000, 362450],
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'CRIPTO',
    price: 17280.00,
    change24h: 2.10,
    high24h: 17650.00,
    low24h: 16890.00,
    volume: 'R$ 92 Bi',
    logo: 'Ξ',
    marketCap: 'R$ 2,0 Tri',
    description: 'Plataforma descentralizada líder mundial para contratos inteligentes e aplicações financeiras descentralizadas (DeFi) e tokenização.',
    sector: 'Criptomoedas / Smart Contracts',
    sparkline: [16700, 16900, 16850, 17100, 17050, 17200, 17280],
  },
  {
    ticker: 'SOL',
    name: 'Solana',
    type: 'CRIPTO',
    price: 940.50,
    change24h: 5.80,
    high24h: 965.00,
    low24h: 885.00,
    volume: 'R$ 28 Bi',
    logo: '◎',
    marketCap: 'R$ 440 Bi',
    description: 'Blockchain de alto rendimento projetada para adoção em massa, conhecida por altíssima velocidade de transações por segundo e custos infinitesimais.',
    sector: 'Criptomoedas / Layer 1',
    sparkline: [870, 885, 905, 895, 920, 935, 940.50],
  },
  {
    ticker: 'ADA',
    name: 'Cardano',
    type: 'CRIPTO',
    price: 3.85,
    change24h: -1.65,
    high24h: 3.98,
    low24h: 3.79,
    volume: 'R$ 4.5 Bi',
    logo: '₳',
    marketCap: 'R$ 138 Bi',
    description: 'Plataforma blockchain baseada em consenso proof-of-stake e metodologia científica de revisão por pares acadêmicos.',
    sector: 'Criptomoedas / Smart Contracts',
    sparkline: [4.0, 3.95, 3.9, 3.88, 3.92, 3.84, 3.85],
  },
];

export async function fetchLiveMarketData(): Promise<Asset[]> {
  try {
    // Attempt public endpoints with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const btcRes = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano&vs_currencies=brl&include_24hr_change=true',
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (btcRes.ok) {
      const data = await btcRes.json();
      return INITIAL_ASSETS.map((asset) => {
        if (asset.ticker === 'BTC' && data.bitcoin) {
          return {
            ...asset,
            price: data.bitcoin.brl,
            change24h: Number(data.bitcoin.brl_24h_change?.toFixed(2) || asset.change24h),
          };
        }
        if (asset.ticker === 'ETH' && data.ethereum) {
          return {
            ...asset,
            price: data.ethereum.brl,
            change24h: Number(data.ethereum.brl_24h_change?.toFixed(2) || asset.change24h),
          };
        }
        if (asset.ticker === 'SOL' && data.solana) {
          return {
            ...asset,
            price: data.solana.brl,
            change24h: Number(data.solana.brl_24h_change?.toFixed(2) || asset.change24h),
          };
        }
        if (asset.ticker === 'ADA' && data.cardano) {
          return {
            ...asset,
            price: data.cardano.brl,
            change24h: Number(data.cardano.brl_24h_change?.toFixed(2) || asset.change24h),
          };
        }
        return asset;
      });
    }
  } catch {
    // In case of rate limit, timeout or offline, gracefully return current initial state with dynamic subtle fluctuation
  }

  return INITIAL_ASSETS;
}

export function generateHistoricalPoints(basePrice: number, pointsCount: number = 24, volatility: number = 0.02) {
  const points = [];
  let current = basePrice * (1 - volatility * 2);
  const now = new Date();

  for (let i = pointsCount - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600 * 1000);
    const variation = (Math.random() - 0.48) * volatility * basePrice;
    current = Math.max(current + variation, basePrice * 0.7);
    points.push({
      timestamp: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      price: Number(current.toFixed(2)),
      ibov: Number((128000 + (Math.random() - 0.45) * 1500).toFixed(0)),
      cdi: Number((10000 + (pointsCount - i) * 3.5).toFixed(2)),
    });
  }

  // Ensure last point matches current price
  if (points.length > 0) {
    points[points.length - 1].price = basePrice;
  }
  return points;
}
