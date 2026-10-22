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
  ArrowUpRight, 
  Plus, 
  ArrowDownLeft,
  RotateCcw,
  Sparkles,
  GraduationCap,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { summary, positions, user, setIsResetModalOpen } = useSimulator();

  const isProfit = summary.totalProfitLoss >= 0;
  const isDayProfit = summary.dayYield >= 0;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Olá, {user.name}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {user.level}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulador de Carteira • Educação Financeira sem risco real
          </p>
        </div>

        {/* Quick actions top pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset R$ 10k</span>
          </button>
          <Link
            href="/negociar"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nova Ordem</span>
          </Link>
        </div>
      </div>

      {/* Hero Portfolio Card - Exact Nexora Aesthetic (Image 1) */}
      <div className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 border border-white/[0.12] bg-gradient-to-br from-[#101F48] via-[#0C1534] to-[#070C1D] shadow-[0_20px_60px_-15px_rgba(0,102,255,0.35)] backdrop-blur-2xl">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
              Patrimônio Total da Carteira (Simulado)
            </div>

            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
              {formatCurrency(summary.total)}
            </div>

            {/* Sub Metric Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                isProfit
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                {isProfit ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                <span>{formatPercent(summary.totalProfitLossPercent)} ({formatCurrency(summary.totalProfitLoss)})</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-slate-200 border border-white/[0.1] backdrop-blur-md">
                <span className="text-cyan-400 font-bold">{formatCurrency(summary.dayYield)}</span>
                <span className="text-slate-400 text-[11px]">hoje</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-slate-200 border border-white/[0.1] backdrop-blur-md">
                <span className="text-slate-400">Caixa Livre:</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(summary.cash)}</span>
              </span>
            </div>
          </div>

          {/* Quick Action Pill Buttons - Nexora Style */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full md:w-auto">
            
            <Link
              href="/negociar"
              className="flex flex-col items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-cyan-400/40 transition-all text-center group"
            >
              <div className="h-9 w-9 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Comprar</span>
            </Link>

            <Link
              href="/custodia"
              className="flex flex-col items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-emerald-400/40 transition-all text-center group"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wallet className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Custódia</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="flex flex-col items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white/[0.06] hover:bg-amber-500/10 border border-white/[0.1] hover:border-amber-500/40 transition-all text-center group"
            >
              <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <RotateCcw className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Resetar</span>
            </button>

          </div>

        </div>

      </div>

      {/* Main Grid: Charts & Top Holdings (Nexora Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <PortfolioLineChart />

          {/* Dica do Mentor - Sleek Frosted Card */}
          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex items-start gap-4 shadow-glass">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-amber-950/40">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Dica do Mentor Bahia Capital
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                &ldquo;Investir com consistência é sobre gerenciar o risco, não acertar o topo. Mantenha caixa suficiente para comprar quando os preços corrigirem.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Top Holdings & Circular Gauge (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Top Holdings Card - Exact Nexora Aesthetic */}
          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-4">
            
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-heading font-black text-lg text-white">
                Ativos em Destaque
              </h3>
              <Link
                href="/custodia"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>Ver Todos</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {positions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08]">
                Nenhum ativo comprado. Visite o mercado para começar!
              </div>
            ) : (
              <div className="space-y-2.5">
                {positions.slice(0, 4).map((pos) => {
                  const isPosGain = pos.profitLoss >= 0;
                  return (
                    <Link
                      key={pos.ticker}
                      href={`/ativo/${pos.ticker}`}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-[#0B1433] border border-white/[0.1] flex items-center justify-center text-sm font-bold text-white shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
                          {pos.type === 'ACAO' ? '📈' : '🪙'}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                            {pos.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {pos.ticker} • {pos.quantity} un
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-white text-sm">
                          {formatCurrency(pos.currentValue)}
                        </div>
                        <div className={`text-[11px] font-bold flex items-center justify-end gap-1 ${
                          isPosGain ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {isPosGain ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span>{formatPercent(pos.profitLossPercent)}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <Link
              href="/mercado"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
            >
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>Explorar Mais Ativos na B3 & Cripto</span>
            </Link>

          </div>

          {/* Allocation Donut Visualizer */}
          <AllocationDonutChart />

        </div>

      </div>

    </div>
  );
}
