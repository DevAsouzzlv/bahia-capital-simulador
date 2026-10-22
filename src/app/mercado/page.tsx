'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSimulator } from '@/context/SimulatorContext';
import { Asset } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ArrowUpRight, 
  ExternalLink 
} from 'lucide-react';

export default function MercadoPage() {
  const { assets, refreshPrices } = useSimulator();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'TODAS' | 'ACAO' | 'CRIPTO' | 'ALTAS' | 'BAIXAS'>('TODAS');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshPrices();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.sector.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'ACAO') return asset.type === 'ACAO';
      if (activeFilter === 'CRIPTO') return asset.type === 'CRIPTO';
      if (activeFilter === 'ALTAS') return asset.change24h > 0;
      if (activeFilter === 'BAIXAS') return asset.change24h < 0;

      return true;
    });
  }, [assets, searchTerm, activeFilter]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Real-time Indices Marquee - Glowing Frosted Bar */}
      <div className="w-full overflow-x-auto py-3 px-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex items-center justify-between gap-6 text-xs text-slate-300 shadow-glass">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-[11px] uppercase tracking-wider flex-shrink-0">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
          <span>Feeds ao Vivo:</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar font-mono">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">IBOVESPA</span>
            <span className="text-slate-300">128.450 pts</span>
            <span className="text-emerald-400 font-bold">+0,85%</span>
          </div>

          <div className="h-3 w-[1px] bg-white/[0.1] flex-shrink-0" />

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">S&P 500</span>
            <span className="text-slate-300">5.820 pts</span>
            <span className="text-emerald-400 font-bold">+0,42%</span>
          </div>

          <div className="h-3 w-[1px] bg-white/[0.1] flex-shrink-0" />

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">USD/BRL</span>
            <span className="text-slate-300">R$ 5,18</span>
            <span className="text-rose-400 font-bold">-0,30%</span>
          </div>

          <div className="h-3 w-[1px] bg-white/[0.1] flex-shrink-0" />

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">CDI</span>
            <span className="text-slate-300">10,75% a.a.</span>
            <span className="text-cyan-400 font-bold">Copom</span>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors flex-shrink-0 text-[11px] font-bold"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
            Explorar Mercado & Cotações
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Preços ao vivo de Ações da B3 e Criptomoedas em Reais (BRL).
          </p>
        </div>

        {/* Universal Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ticker, nome ou setor..."
            className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.1] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none backdrop-blur-xl"
          />
        </div>
      </div>

      {/* Filter Tabs - Nexora / FitRise Pill Selection */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'TODAS', label: 'Todos os Ativos' },
          { id: 'ACAO', label: 'Ações B3' },
          { id: 'CRIPTO', label: 'Criptomoedas' },
          { id: 'ALTAS', label: 'Maiores Altas' },
          { id: 'BAIXAS', label: 'Maiores Baixas' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-blue'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08] hover:bg-white/[0.06]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assets Table in Glass Card */}
      <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-4 pl-5">Ativo</th>
                <th className="py-4 text-left hidden sm:table-cell">Setor</th>
                <th className="py-4 text-right">Preço Atual (R$)</th>
                <th className="py-4 text-right">Variação 24h</th>
                <th className="py-4 text-right hidden md:table-cell">Mín / Máx</th>
                <th className="py-4 text-right hidden lg:table-cell">Volume</th>
                <th className="py-4 text-right pr-5">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filteredAssets.map((asset) => {
                const isPositive = asset.change24h >= 0;
                return (
                  <tr key={asset.ticker} className="hover:bg-white/[0.04] transition-colors">
                    
                    {/* Ativo */}
                    <td className="py-4 pl-5">
                      <Link href={`/ativo/${asset.ticker}`} className="flex items-center gap-3.5 group">
                        <div className="h-10 w-10 rounded-2xl bg-[#0B1433] border border-white/[0.1] flex items-center justify-center text-lg flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                          {asset.logo}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                            {asset.ticker}
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                          </div>
                          <div className="text-[11px] text-slate-400">{asset.name}</div>
                        </div>
                      </Link>
                    </td>

                    {/* Setor */}
                    <td className="py-4 text-left hidden sm:table-cell text-slate-400">
                      <div className="max-w-[180px] truncate" title={asset.sector}>
                        {asset.sector}
                      </div>
                      <span className="inline-block mt-0.5 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-cyan-300 border border-white/[0.08]">
                        {asset.type === 'ACAO' ? 'Ação B3' : 'Cripto'}
                      </span>
                    </td>

                    {/* Preço Atual */}
                    <td className="py-4 text-right font-mono font-bold text-white text-sm">
                      {formatCurrency(asset.price)}
                    </td>

                    {/* Variação 24h */}
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        isPositive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{formatPercent(asset.change24h)}</span>
                      </span>
                    </td>

                    {/* Mín / Máx */}
                    <td className="py-4 text-right hidden md:table-cell text-slate-400 text-[11px] font-mono">
                      <div>Máx: {formatCurrency(asset.high24h)}</div>
                      <div>Mín: {formatCurrency(asset.low24h)}</div>
                    </td>

                    {/* Volume */}
                    <td className="py-4 text-right hidden lg:table-cell font-mono text-slate-300">
                      {asset.volume}
                    </td>

                    {/* Ação */}
                    <td className="py-4 text-right pr-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/ativo/${asset.ticker}`}
                          className="hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
                        >
                          Raio-X
                        </Link>
                        <Link
                          href={`/negociar?ticker=${asset.ticker}`}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all hover:scale-105"
                        >
                          <span>Negociar</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
