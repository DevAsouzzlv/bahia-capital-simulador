'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSimulator } from '@/context/SimulatorContext';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { generateHistoricalPoints } from '@/services/marketData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  GraduationCap, 
  Building2,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export function AtivoDetalhesClient({ ticker }: { ticker: string }) {
  const router = useRouter();
  const { assets } = useSimulator();
  const [timeframe, setTimeframe] = useState<'1D' | '1S' | '1M' | '1A'>('1D');

  const asset = assets.find((a) => a.ticker === ticker?.toUpperCase()) || assets[0];
  const isPositive = asset.change24h >= 0;

  const historicalData = React.useMemo(() => {
    return generateHistoricalPoints(asset.price, 24, 0.02);
  }, [asset.price]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/mercado"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Mercado</span>
        </Link>

        <span className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 backdrop-blur-md">
          <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Raio-X Fundamentalista • Bahia Capital</span>
        </span>
      </div>

      {/* Main Asset Header Card - Nexora Style */}
      <div className="p-7 sm:p-9 rounded-[32px] bg-gradient-to-br from-[#101F48] via-[#0C1534] to-[#070C1D] border border-white/[0.12] shadow-glass backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-[24px] bg-[#090E23] border border-white/[0.1] flex items-center justify-center text-4xl flex-shrink-0 shadow-inner">
            {asset.logo}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                {asset.ticker}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/[0.06] text-cyan-300 border border-white/[0.1]">
                {asset.type === 'ACAO' ? 'Ação B3' : 'Criptoativo'}
              </span>
            </div>
            <div className="text-base font-medium text-slate-300 mt-1">{asset.name}</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>{asset.sector}</span>
            </div>
          </div>
        </div>

        {/* Right price and Action CTA */}
        <div className="flex flex-col md:items-end justify-center space-y-3">
          <div>
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Cotação Atual</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-heading font-black text-white font-mono">
                {formatCurrency(asset.price)}
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                isPositive 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                <span>{formatPercent(asset.change24h)}</span>
              </span>
            </div>
          </div>

          <Link
            href={`/negociar?ticker=${asset.ticker}`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all hover:scale-105"
          >
            <Wallet className="h-4 w-4" />
            <span>Abrir Boleta de Compra</span>
          </Link>
        </div>

      </div>

      {/* Technical Chart Section */}
      <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 shadow-glass space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-black text-lg text-white">
              Gráfico de Oscilação de Preço
            </h3>
            <p className="text-xs text-slate-400">
              Histórico intraday sincronizado com cotações de mercado
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-2xl border border-white/[0.08]">
            {(['1D', '1S', '1M', '1A'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-blue'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#00D2FF' : '#FF4757'} stopOpacity={0.45} />
                  <stop offset="95%" stopColor={isPositive ? '#0066FF' : '#FF4757'} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
              <XAxis dataKey="timestamp" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                domain={['dataMin - 1', 'dataMax + 1']}
                tickFormatter={(val) => `R$ ${val.toFixed(0)}`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-2xl bg-[#090E23]/95 border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1 backdrop-blur-xl">
                        <div className="text-slate-400">Horário: {label}</div>
                        <div className="font-bold text-white text-sm font-mono">
                          {formatCurrency(Number(payload[0].value))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#00D2FF' : '#FF4757'}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#assetGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Fundamental Indicators with Glass Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-1.5 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">P/L (Preço / Lucro)</span>
            <span title="Anos para reaver o capital apenas com lucros">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {asset.peRatio ? `${asset.peRatio.toFixed(2)}x` : 'N/A'}
          </div>
          <div className="text-[10px] text-cyan-400 font-bold">
            {asset.peRatio && asset.peRatio < 10 ? 'Abaixo da média setorial' : 'Múltiplo de expansão'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-1.5 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">Dividend Yield (DY)</span>
            <span title="Retorno em proventos nos últimos 12 meses">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {asset.dividendYield ? `${asset.dividendYield.toFixed(2)}%` : 'N/A'}
          </div>
          <div className="text-[10px] text-emerald-400 font-bold">
            {asset.dividendYield && asset.dividendYield > 8 ? 'Alta distribuição de caixa' : 'Retenção para crescimento'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-1.5 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">ROE (Patrimônio)</span>
            <span title="Retorno sobre o patrimônio líquido da empresa">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {asset.roe ? `${asset.roe.toFixed(2)}%` : 'N/A'}
          </div>
          <div className="text-[10px] text-slate-400">Eficiência de capital</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl space-y-1.5 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">Valor de Mercado</span>
            <span title="Valor total de todas as ações somadas">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {asset.marketCap || 'N/A'}
          </div>
          <div className="text-[10px] text-slate-400">Capitalização</div>
        </div>

      </div>

      {/* Didactic Business Model Panel */}
      <div className="p-7 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-base text-white">
              Painel Didático Bahia Capital: Como este ativo gera valor?
            </h3>
            <p className="text-xs text-slate-400">
              Compreenda o negócio por trás do código antes de investir
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {asset.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Tese de Investimento (Pontos Fortes)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Forte barreira de entrada no setor, alta geração de caixa operacional e distribuição frequente de proventos aos acionistas ou valorização orgânica.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span>Pontos de Atenção (Gestão de Risco)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sensibilidade a ciclos econômicos globais, variação cambial do Dólar e volatilidade de curto prazo do mercado internacional.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
