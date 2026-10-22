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
  HelpCircle
} from 'lucide-react';

export function AtivoDetalhesClient({ ticker }: { ticker: string }) {
  const router = useRouter();
  const { assets } = useSimulator();
  const [timeframe, setTimeframe] = useState<'1D' | '1S' | '1M' | '1A'>('1D');

  const asset = assets.find((a) => a.ticker === ticker?.toUpperCase()) || assets[0];
  const isPositive = asset.change24h >= 0;

  // Generate historical points for the chart
  const historicalData = React.useMemo(() => {
    return generateHistoricalPoints(asset.price, 24, 0.02);
  }, [asset.price]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/mercado"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o Mercado</span>
        </Link>

        <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Raio-X Educacional Bahia Capital</span>
        </span>
      </div>

      {/* Main Asset Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
            {asset.logo}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {asset.ticker}
              </h1>
              <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {asset.type === 'ACAO' ? 'Ação B3' : 'Criptoativo'}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-300 mt-0.5">{asset.name}</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>{asset.sector}</span>
            </div>
          </div>
        </div>

        {/* Right price and Action CTA */}
        <div className="flex flex-col md:items-end justify-center space-y-3">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Cotação Atual</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-black text-white">
                {formatCurrency(asset.price)}
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isPositive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{formatPercent(asset.change24h)}</span>
              </span>
            </div>
          </div>

          <Link
            href={`/negociar?ticker=${asset.ticker}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
          >
            <Wallet className="h-4 w-4" />
            <span>Abrir Boleta de Compra ({asset.ticker})</span>
          </Link>
        </div>

      </div>

      {/* Technical Chart Section */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Comportamento do Preço no Pregão
            </h3>
            <p className="text-xs text-slate-400">
              Oscilação simulada com base nas variações reais registradas
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
            {(['1D', '1S', '1M', '1A'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
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
                  <stop offset="5%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
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
                      <div className="rounded-xl bg-slate-900/95 border border-slate-700 p-2.5 shadow-xl text-xs space-y-1">
                        <div className="text-slate-400">Horário: {label}</div>
                        <div className="font-bold text-white text-sm">
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
                stroke={isPositive ? '#10B981' : '#EF4444'}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#assetGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Fundamental Indicators with Tooltips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>P/L (Preço / Lucro)</span>
            <span title="Quantos anos levaria para reaver o capital apenas com os lucros da empresa">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-xl font-bold text-white">
            {asset.peRatio ? `${asset.peRatio.toFixed(2)}x` : 'N/A'}
          </div>
          <div className="text-[10px] text-blue-400">
            {asset.peRatio && asset.peRatio < 10 ? 'Abaixo da média histórica' : 'Múltiplo de crescimento'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Dividend Yield (DY)</span>
            <span title="Retorno em proventos pagos aos acionistas nos últimos 12 meses">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-xl font-bold text-emerald-400">
            {asset.dividendYield ? `${asset.dividendYield.toFixed(2)}%` : 'N/A'}
          </div>
          <div className="text-[10px] text-emerald-400">
            {asset.dividendYield && asset.dividendYield > 8 ? 'Excelente pagadora de dividendos' : 'Retenção para expansão'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>ROE (Rent. s/ Patrimônio)</span>
            <span title="Capacidade da empresa de gerar lucro com seus próprios recursos">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-xl font-bold text-white">
            {asset.roe ? `${asset.roe.toFixed(2)}%` : 'N/A'}
          </div>
          <div className="text-[10px] text-slate-400">Rentabilidade de capital</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Valor de Mercado</span>
            <span title="Valor somado de todas as ações em circulação">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
            </span>
          </div>
          <div className="text-xl font-bold text-white">
            {asset.marketCap || 'N/A'}
          </div>
          <div className="text-[10px] text-slate-400">Cap. Total</div>
        </div>

      </div>

      {/* Didactic Business Model Panel */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Painel Didático Bahia Capital: Como este ativo gera valor?
            </h3>
            <p className="text-xs text-slate-400">
              Entenda os fundamentos antes de abrir sua ordem no simulador
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {asset.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Pontos Fortes (Tese de Investimento)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Forte barreira de entrada no setor, alta geração de caixa operacional e distribuição frequente de proventos aos acionistas ou valorização orgânica.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
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
