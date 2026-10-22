'use client';

import React from 'react';
import Link from 'next/link';
import { useSimulator } from '@/context/SimulatorContext';
import { PortfolioLineChart } from '@/components/charts/PortfolioLineChart';
import { AllocationDonutChart } from '@/components/charts/AllocationDonutChart';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  DollarSign, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function DashboardPage() {
  const { summary, positions, user, setIsResetModalOpen } = useSimulator();

  const isProfit = summary.totalProfitLoss >= 0;
  const isDayProfit = summary.dayYield >= 0;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Top Welcome & Notification Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Painel do Investidor
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              {user.level}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Olá, <strong className="text-slate-200">{user.name}</strong>. Acompanhe a rentabilidade e alocação da sua carteira de treinamento.
          </p>
        </div>

        {/* Action quick links */}
        <div className="flex items-center gap-3">
          <Link
            href="/mercado"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors"
          >
            <span>Ver Mercado</span>
          </Link>
          <Link
            href="/negociar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-900/40 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nova Ordem</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Patrimônio Total */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Patrimônio Total</span>
            <div className="h-8 w-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-black text-white">
            {formatCurrency(summary.total)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Capital Base:</span>
            <span className="font-semibold text-slate-300">R$ 10.000,00</span>
          </div>
        </div>

        {/* Card 2: Lucro/Prejuízo Total */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Resultado Geral</span>
            <div className={`h-8 w-8 rounded-lg ${isProfit ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'} flex items-center justify-center flex-shrink-0`}>
              {isProfit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
          </div>
          <div className={`text-2xl font-heading font-black ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(summary.totalProfitLoss)}
          </div>
          <div className="text-[11px] font-semibold flex items-center gap-1.5">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] ${
              isProfit ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {formatPercent(summary.totalProfitLossPercent)}
            </span>
            <span className="text-slate-400 font-normal">desde o início</span>
          </div>
        </div>

        {/* Card 3: Saldo em Caixa */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Caixa Disponível</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-black text-emerald-400">
            {formatCurrency(summary.cash)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>{((summary.cash / summary.total) * 100).toFixed(0)}% da carteira em liquidez</span>
          </div>
        </div>

        {/* Card 4: Rendimento do Dia */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Variação do Dia</span>
            <div className={`h-8 w-8 rounded-lg ${isDayProfit ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'} flex items-center justify-center flex-shrink-0`}>
              {isDayProfit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
          </div>
          <div className={`text-2xl font-heading font-black ${isDayProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(summary.dayYield)}
          </div>
          <div className="text-[11px] font-semibold flex items-center gap-1.5">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] ${
              isDayProfit ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {formatPercent(summary.dayYieldPercent)}
            </span>
            <span className="text-slate-400 font-normal">estimativa 24h</span>
          </div>
        </div>

      </div>

      {/* Main Charts Section (Line Chart 8 cols, Donut 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <PortfolioLineChart />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <AllocationDonutChart />
        </div>
      </div>

      {/* Card Pedagógico: Dica do Mentor Bahia Capital */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Dica do Mentor Bahia Capital
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300">
                Gestão de Carteira
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              &ldquo;Alocar mais de 30% em um único ativo eleva drasticamente a volatilidade da sua carteira. Mantenha sempre uma reserva de caixa para aproveitar correções do mercado.&rdquo;
            </p>
          </div>
        </div>

        <Link
          href="/aprender"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-300 bg-blue-900/40 hover:bg-blue-800/50 border border-blue-700/50 transition-colors whitespace-nowrap self-end sm:self-auto flex-shrink-0"
        >
          <span>Acessar Academia</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tabela Resumida das Posições em Custódia */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Posições em Custódia ({positions.length})
            </h3>
            <p className="text-xs text-slate-400">
              Ativos que compõem sua carteira de treinamento no momento
            </p>
          </div>

          <Link
            href="/custodia"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
          >
            <span>Ver Custódia Completa</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {positions.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-slate-800/40 rounded-xl border border-dashed border-slate-700">
            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 mx-auto">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-300 font-medium">Você ainda não possui ativos em custódia.</p>
            <p className="text-xs text-slate-400">Use seus R$ 10.000,00 de caixa para fazer sua primeira compra simulada!</p>
            <Link
              href="/mercado"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
            >
              <span>Explorar Ativos no Mercado</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Ativo</th>
                  <th className="pb-3 text-right">Qtd</th>
                  <th className="pb-3 text-right">Preço Médio</th>
                  <th className="pb-3 text-right">Cotação Atual</th>
                  <th className="pb-3 text-right">Valor Total</th>
                  <th className="pb-3 text-right">Lucro/Prej.</th>
                  <th className="pb-3 text-right pr-2">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {positions.map((pos) => {
                  const isPosProfit = pos.profitLoss >= 0;
                  return (
                    <tr key={pos.ticker} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 pl-2">
                        <Link href={`/ativo/${pos.ticker}`} className="flex items-center gap-2.5 group">
                          <div className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white">
                            {pos.type === 'ACAO' ? '📈' : '🪙'}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                              {pos.ticker}
                            </div>
                            <div className="text-[10px] text-slate-400">{pos.name}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 text-right font-medium text-slate-200">
                        {pos.quantity}
                      </td>
                      <td className="py-3 text-right text-slate-400">
                        {formatCurrency(pos.averagePrice)}
                      </td>
                      <td className="py-3 text-right font-semibold text-white">
                        {formatCurrency(pos.currentPrice)}
                      </td>
                      <td className="py-3 text-right font-bold text-white">
                        {formatCurrency(pos.currentValue)}
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                          isPosProfit 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {isPosProfit ? '+' : ''}{formatCurrency(pos.profitLoss)} ({formatPercent(pos.profitLossPercent)})
                        </span>
                      </td>
                      <td className="py-3 text-right pr-2">
                        <Link
                          href={`/negociar?ticker=${pos.ticker}`}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white transition-colors"
                        >
                          Negociar
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
