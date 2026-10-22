'use client';

import React from 'react';
import Link from 'next/link';
import { useSimulator } from '@/context/SimulatorContext';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  Wallet,
  ArrowRight
} from 'lucide-react';

export default function CustodiaPage() {
  const { positions, summary } = useSimulator();

  const totalInvested = summary.invested;
  const totalPortfolio = summary.total > 0 ? summary.total : 10000;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Minha Custódia & Posições
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0 animate-pulse" />
              {positions.length} Ativos em Carteira
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Acompanhe preço médio, lucros não realizados e peso percentual de cada ativo.
          </p>
        </div>

        <Link
          href="/negociar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Comprar Ativo</span>
        </Link>
      </div>

      {/* Custody Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total em Ativos
          </span>
          <div className="text-2xl font-heading font-black text-white font-mono">
            {formatCurrency(totalInvested)}
          </div>
          <p className="text-[11px] text-slate-400">
            {((totalInvested / totalPortfolio) * 100).toFixed(1)}% do patrimônio alocado
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Reserva em Caixa Livre
          </span>
          <div className="text-2xl font-heading font-black text-emerald-400 font-mono">
            {formatCurrency(summary.cash)}
          </div>
          <p className="text-[11px] text-slate-400">
            Disponível para novas oportunidades
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Resultado Não Realizado
          </span>
          <div className={`text-2xl font-heading font-black font-mono ${summary.totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(summary.totalProfitLoss)}
          </div>
          <p className="text-[11px] text-slate-400 font-semibold">
            {formatPercent(summary.totalProfitLossPercent)} de rendimento total
          </p>
        </div>

      </div>

      {/* Custody Table in Glass Card */}
      <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass overflow-hidden">
        {positions.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-white/[0.05] flex items-center justify-center text-slate-400 mx-auto">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Nenhum ativo em custódia no momento</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Use seus R$ 10.000,00 de crédito pedagógico para fazer sua primeira compra simulada!
            </p>
            <Link
              href="/mercado"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-glow-blue"
            >
              <span>Explorar Mercado</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-4 pl-5">Ativo</th>
                  <th className="py-4 text-right">Qtd</th>
                  <th className="py-4 text-right">Preço Médio</th>
                  <th className="py-4 text-right">Cotação Atual</th>
                  <th className="py-4 text-right">Total Investido</th>
                  <th className="py-4 text-right">Valor Atual</th>
                  <th className="py-4 text-right">Lucro/Prej.</th>
                  <th className="py-4 text-right">% Carteira</th>
                  <th className="py-4 text-right pr-5">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {positions.map((pos) => {
                  const isProfit = pos.profitLoss >= 0;
                  const weight = (pos.currentValue / totalPortfolio) * 100;

                  return (
                    <tr key={pos.ticker} className="hover:bg-white/[0.04] transition-colors">
                      
                      {/* Ativo */}
                      <td className="py-4 pl-5">
                        <Link href={`/ativo/${pos.ticker}`} className="flex items-center gap-3 group">
                          <div className="h-10 w-10 rounded-2xl bg-[#0B1433] border border-white/[0.1] flex items-center justify-center text-xs font-bold text-white group-hover:scale-105 transition-transform">
                            {pos.type === 'ACAO' ? '📈' : '🪙'}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                              {pos.ticker}
                            </div>
                            <div className="text-[10px] text-slate-400">{pos.name}</div>
                          </div>
                        </Link>
                      </td>

                      {/* Quantidade */}
                      <td className="py-4 text-right font-mono font-medium text-slate-200">
                        {pos.quantity}
                      </td>

                      {/* Preço Médio */}
                      <td className="py-4 text-right text-slate-400 font-mono">
                        {formatCurrency(pos.averagePrice)}
                      </td>

                      {/* Cotação Atual */}
                      <td className="py-4 text-right font-mono font-bold text-white">
                        {formatCurrency(pos.currentPrice)}
                      </td>

                      {/* Total Investido */}
                      <td className="py-4 text-right text-slate-400 font-mono">
                        {formatCurrency(pos.totalCost)}
                      </td>

                      {/* Valor Atual */}
                      <td className="py-4 text-right font-mono font-bold text-white">
                        {formatCurrency(pos.currentValue)}
                      </td>

                      {/* Lucro/Prejuízo */}
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${
                          isProfit
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}>
                          {isProfit ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span>{isProfit ? '+' : ''}{formatCurrency(pos.profitLoss)} ({formatPercent(pos.profitLossPercent)})</span>
                        </span>
                      </td>

                      {/* % Carteira */}
                      <td className="py-4 text-right font-mono font-bold">
                        <span className={weight > 25 ? 'text-amber-400' : 'text-slate-300'}>
                          {weight.toFixed(1)}%
                        </span>
                      </td>

                      {/* Ações Rápidas */}
                      <td className="py-4 text-right pr-5">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/negociar?ticker=${pos.ticker}`}
                            title="Comprar mais"
                            className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/negociar?ticker=${pos.ticker}`}
                            title="Vender"
                            className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Link>
                        </div>
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
