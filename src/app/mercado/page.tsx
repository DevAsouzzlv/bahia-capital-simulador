'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSimulator } from '@/context/SimulatorContext';
import { Asset, AssetType } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Layers, 
  ArrowUpRight, 
  Filter, 
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
      // Search term
      const matchesSearch =
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.sector.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Filter category
      if (activeFilter === 'ACAO') return asset.type === 'ACAO';
      if (activeFilter === 'CRIPTO') return asset.type === 'CRIPTO';
      if (activeFilter === 'ALTAS') return asset.change24h > 0;
      if (activeFilter === 'BAIXAS') return asset.change24h < 0;

      return true;
    });
  }, [assets, searchTerm, activeFilter]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Real-time Indices Marquee */}
      <div className="w-full overflow-x-auto py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-6 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex-shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span>Feeds ao Vivo:</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">IBOVESPA</span>
            <span className="text-slate-300">128.450 pts</span>
            <span className="text-emerald-400 font-semibold">+0,85%</span>
          </div>

          <div className="h-3 w-[1px] bg-slate-800 flex-shrink-0" />

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">S&P 500</span>
            <span className="text-slate-300">5.820 pts</span>
            <span className="text-emerald-400 font-semibold">+0,42%</span>
          </div>

          <div className="h-3 w-[1px] bg-slate-800 flex-shrink-0" />

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">DÓLAR (USD/BRL)</span>
            <span className="text-slate-300">R$ 5,18</span>
            <span className="text-red-400 font-semibold">-0,30%</span>
          </div>

          <div className="h-3 w-[1px] bg-slate-800 flex-shrink-0" />

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-white">TAXA SELIC / CDI</span>
            <span className="text-slate-300">10,75% a.a.</span>
            <span className="text-blue-400 font-semibold">Meta Copom</span>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex-shrink-0 text-[11px]"
        >
          <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Explorar Mercado & Cotações
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Preços atualizados em Reais (BRL) para você planejar suas compras simuladas.
          </p>
        </div>

        {/* Universal Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ticker, nome ou setor (ex: PETR4, BTC)..."
            className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assets Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3.5 pl-4">Ativo</th>
                <th className="py-3.5 text-left hidden sm:table-cell">Setor / Tipo</th>
                <th className="py-3.5 text-right">Preço Atual (R$)</th>
                <th className="py-3.5 text-right">Variação 24h</th>
                <th className="py-3.5 text-right hidden md:table-cell">Mín / Máx 24h</th>
                <th className="py-3.5 text-right hidden lg:table-cell">Volume</th>
                <th className="py-3.5 text-right pr-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAssets.map((asset) => {
                const isPositive = asset.change24h >= 0;
                return (
                  <tr key={asset.ticker} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Ativo (Logo + Ticker + Name) */}
                    <td className="py-3.5 pl-4">
                      <Link href={`/ativo/${asset.ticker}`} className="flex items-center gap-3 group">
                        <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-base flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          {asset.logo}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                            {asset.ticker}
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                          </div>
                          <div className="text-[11px] text-slate-400">{asset.name}</div>
                        </div>
                      </Link>
                    </td>

                    {/* Setor */}
                    <td className="py-3.5 text-left hidden sm:table-cell text-slate-400">
                      <div className="max-w-[180px] truncate" title={asset.sector}>
                        {asset.sector}
                      </div>
                      <span className="inline-block mt-0.5 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {asset.type === 'ACAO' ? 'Ação B3' : 'Cripto'}
                      </span>
                    </td>

                    {/* Preço Atual */}
                    <td className="py-3.5 text-right font-bold text-white text-sm">
                      {formatCurrency(asset.price)}
                    </td>

                    {/* Variação 24h */}
                    <td className="py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        isPositive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{formatPercent(asset.change24h)}</span>
                      </span>
                    </td>

                    {/* Mín / Máx */}
                    <td className="py-3.5 text-right hidden md:table-cell text-slate-400 text-[11px]">
                      <div>Máx: {formatCurrency(asset.high24h)}</div>
                      <div>Mín: {formatCurrency(asset.low24h)}</div>
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 text-right hidden lg:table-cell font-mono text-slate-300">
                      {asset.volume}
                    </td>

                    {/* Ação: Negociar ou Ver Raio-X */}
                    <td className="py-3.5 text-right pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/ativo/${asset.ticker}`}
                          className="hidden sm:inline-flex px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                        >
                          Raio-X
                        </Link>
                        <Link
                          href={`/negociar?ticker=${asset.ticker}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-900/30 transition-all hover:scale-105"
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
