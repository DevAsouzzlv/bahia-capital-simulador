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
  AlertTriangle, 
  ShieldCheck, 
  Wallet,
  ArrowRight
} from 'lucide-react';

export default function CustodiaPage() {
  const { positions, summary, assets } = useSimulator();

  const totalInvested = summary.invested;
  const totalPortfolio = summary.total > 0 ? summary.total : 10000;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Minha Custódia & Posições
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              {positions.length} Ativos em Carteira
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gerencie seu preço médio, monitore lucros não realizados e controle sua diversificação.
          </p>
        </div>

        <Link
          href="/negociar"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-900/30 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Comprar Novo Ativo</span>
        </Link>
      </div>

      {/* Custody Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Alocado em Ativos
          </span>
          <div className="text-2xl font-heading font-black text-white">
            {formatCurrency(totalInvested)}
          </div>
          <p className="text-[11px] text-slate-400">
            {((totalInvested / totalPortfolio) * 100).toFixed(1)}% do patrimônio investido
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Reserva em Caixa (Líquida)
          </span>
          <div className="text-2xl font-heading font-black text-emerald-400">
            {formatCurrency(summary.cash)}
          </div>
          <p className="text-[11px] text-slate-400">
            Disponível para novas oportunidades de compra
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Lucro / Prejuízo não Realizado
          </span>
          <div className={`text-2xl font-heading font-black ${summary.totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(summary.totalProfitLoss)}
          </div>
          <p className="text-[11px] text-slate-400 font-semibold">
            {formatPercent(summary.totalProfitLossPercent)} de rendimento acumulado
          </p>
        </div>

      </div>

      {/* Concentration Risk Alert Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <PieChart className="h-4 w-4 text-blue-400" />
            <span>Distribuição de Concentração Patrimonial</span>
          </span>
          <span className="text-slate-400 text-[11px]">Meta Educacional: Máx. 25% por ativo</span>
        </div>

        {/* Multi-segment bar */}
        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
          {positions.map((pos, idx) => {
            const share = (pos.currentValue / totalPortfolio) * 100;
            const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-teal-500'];
            return (
              <div
                key={pos.ticker}
                className={`h-full ${colors[idx % colors.length]}`}
                style={{ width: `${share}%` }}
                title={`${pos.ticker}: ${share.toFixed(1)}%`}
              />
            );
          })}
          <div
            className="h-full bg-slate-700"
            style={{ width: `${(summary.cash / totalPortfolio) * 100}%` }}
            title={`Caixa Livre: ${((summary.cash / totalPortfolio) * 100).toFixed(1)}%`}
          />
        </div>
      </div>

      {/* Custody Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        {positions.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Nenhum ativo em custódia no momento</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Você ainda não executou nenhuma ordem de compra ou zerou todas as suas posições.
            </p>
            <Link
              href="/mercado"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md"
            >
              <span>Ir para o Mercado</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3.5 pl-4">Ativo em Custódia</th>
                  <th className="py-3.5 text-right">Quantidade</th>
                  <th className="py-3.5 text-right">Preço Médio Pago</th>
                  <th className="py-3.5 text-right">Cotação Atual</th>
                  <th className="py-3.5 text-right">Total Investido</th>
                  <th className="py-3.5 text-right">Valor Atual</th>
                  <th className="py-3.5 text-right">Lucro/Prej.</th>
                  <th className="py-3.5 text-right">% Carteira</th>
                  <th className="py-3.5 text-right pr-4">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {positions.map((pos) => {
                  const isProfit = pos.profitLoss >= 0;
                  const weight = (pos.currentValue / totalPortfolio) * 100;
                  const isOverweighted = weight > 25;

                  return (
                    <tr key={pos.ticker} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Ativo */}
                      <td className="py-3.5 pl-4">
                        <Link href={`/ativo/${pos.ticker}`} className="flex items-center gap-2.5 group">
                          <div className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white group-hover:scale-105 transition-transform">
                            {pos.type === 'ACAO' ? '📈' : '🪙'}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                              {pos.ticker}
                            </div>
                            <div className="text-[10px] text-slate-400">{pos.name}</div>
                          </div>
                        </Link>
                      </td>

                      {/* Quantidade */}
                      <td className="py-3.5 text-right font-medium text-slate-200">
                        {pos.quantity}
                      </td>

                      {/* Preço Médio */}
                      <td className="py-3.5 text-right text-slate-400">
                        {formatCurrency(pos.averagePrice)}
                      </td>

                      {/* Cotação Atual */}
                      <td className="py-3.5 text-right font-semibold text-white">
                        {formatCurrency(pos.currentPrice)}
                      </td>

                      {/* Total Investido */}
                      <td className="py-3.5 text-right text-slate-400 font-mono">
                        {formatCurrency(pos.totalCost)}
                      </td>

                      {/* Valor Atual */}
                      <td className="py-3.5 text-right font-bold text-white font-mono">
                        {formatCurrency(pos.currentValue)}
                      </td>

                      {/* Lucro/Prejuízo */}
                      <td className="py-3.5 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          isProfit
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {isProfit ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span>{isProfit ? '+' : ''}{formatCurrency(pos.profitLoss)} ({formatPercent(pos.profitLossPercent)})</span>
                        </span>
                      </td>

                      {/* % Carteira */}
                      <td className="py-3.5 text-right font-semibold">
                        <span className={isOverweighted ? 'text-amber-400' : 'text-slate-300'}>
                          {weight.toFixed(1)}%
                        </span>
                      </td>

                      {/* Ações Rápidas */}
                      <td className="py-3.5 text-right pr-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/negociar?ticker=${pos.ticker}`}
                            title="Comprar mais ações"
                            className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/negociar?ticker=${pos.ticker}`}
                            title="Vender ações"
                            className="p-1.5 rounded-lg bg-red-950/60 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors"
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
