'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSimulator } from '@/context/SimulatorContext';
import { OrderType, Asset } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { 
  ArrowLeft, 
  Wallet, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  RotateCcw,
  GraduationCap
} from 'lucide-react';

function BoletaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTicker = searchParams.get('ticker')?.toUpperCase() || 'PETR4';

  const { assets, summary, positions, buyAsset, sellAsset } = useSimulator();
  const [selectedTicker, setSelectedTicker] = useState<string>(initialTicker);
  const [orderType, setOrderType] = useState<OrderType>('COMPRA');
  const [quantity, setQuantity] = useState<string>('10');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('ticker')?.toUpperCase();
    if (t) setSelectedTicker(t);
  }, [searchParams]);

  const asset = assets.find((a) => a.ticker === selectedTicker) || assets[0];
  const position = positions.find((p) => p.ticker === asset.ticker);
  const numericQty = parseFloat(quantity) || 0;
  const totalOrderValue = numericQty * asset.price;

  // Portfolio impact calculation
  const totalPortfolio = summary.total > 0 ? summary.total : 10000;
  const portfolioImpactPercent = (totalOrderValue / totalPortfolio) * 100;
  const isHighRisk = portfolioImpactPercent > 25 && orderType === 'COMPRA';

  // Percentage shortcuts
  const handlePercentClick = (percent: number) => {
    if (orderType === 'COMPRA') {
      const availableFunds = summary.cash * (percent / 100);
      const calculatedQty = asset.type === 'ACAO' 
        ? Math.floor(availableFunds / asset.price)
        : Number((availableFunds / asset.price).toFixed(4));
      setQuantity(calculatedQty.toString());
    } else {
      if (!position || position.quantity <= 0) {
        setQuantity('0');
        return;
      }
      const calculatedQty = asset.type === 'ACAO'
        ? Math.floor(position.quantity * (percent / 100))
        : Number((position.quantity * (percent / 100)).toFixed(4));
      setQuantity(calculatedQty.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (numericQty <= 0) {
      setErrorMsg('Informe uma quantidade válida superior a zero.');
      return;
    }

    if (orderType === 'COMPRA') {
      const res = buyAsset(asset.ticker, numericQty);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        router.push('/custodia');
      }
    } else {
      const res = sellAsset(asset.ticker, numericQty);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        router.push('/custodia');
      }
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
          <span>Boleta Simulada • Corretagem Zero</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Trading Form */}
        <div className="md:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl space-y-6">
          
          <div>
            <h1 className="font-heading font-black text-2xl text-white">
              Terminal de Negociação
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Execute compras e vendas com cálculo automático de risco
            </p>
          </div>

          {/* Buy / Sell Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setOrderType('COMPRA'); setErrorMsg(null); }}
              className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                orderType === 'COMPRA'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              COMPRAR (Verde)
            </button>
            <button
              type="button"
              onClick={() => { setOrderType('VENDA'); setErrorMsg(null); }}
              className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                orderType === 'VENDA'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              VENDER (Vermelho)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Asset Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Selecione o Ativo
              </label>
              <select
                value={selectedTicker}
                onChange={(e) => { setSelectedTicker(e.target.value); setErrorMsg(null); }}
                className="w-full rounded-xl bg-slate-800/90 border border-slate-700 px-4 py-2.5 text-sm font-bold text-white focus:border-blue-500 focus:outline-none"
              >
                {assets.map((a) => (
                  <option key={a.ticker} value={a.ticker}>
                    {a.ticker} - {a.name} ({formatCurrency(a.price)})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Preview */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
              <div className="text-slate-400">Cotação Atual de Mercado:</div>
              <div className="font-bold text-white text-sm">{formatCurrency(asset.price)}</div>
            </div>

            {/* Quantity Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Quantidade
                </label>
                <span className="text-[11px] text-slate-400">
                  {orderType === 'COMPRA'
                    ? `Disponível em Caixa: ${formatCurrency(summary.cash)}`
                    : `Em Custódia: ${position?.quantity || 0} ${asset.ticker}`}
                </span>
              </div>
              <input
                type="number"
                step={asset.type === 'ACAO' ? '1' : '0.0001'}
                min="0"
                required
                value={quantity}
                onChange={(e) => { setQuantity(e.target.value); setErrorMsg(null); }}
                className="w-full rounded-xl bg-slate-800/90 border border-slate-700 px-4 py-2.5 text-base font-bold text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Percentage Quick Selector */}
            <div className="flex items-center gap-2">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handlePercentClick(pct)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Total Order Summary Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Valor Bruto da Ordem:</span>
                <span className="text-white font-medium">{formatCurrency(totalOrderValue)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Taxa de Corretagem B3 (Simulador):</span>
                <span className="text-emerald-400 font-semibold">R$ 0,00 (Gratuito)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm">
                <span className="font-bold text-slate-200">Total a Liquidar:</span>
                <span className={`font-black ${orderType === 'COMPRA' ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {formatCurrency(totalOrderValue)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
                orderType === 'COMPRA'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40'
                  : 'bg-red-600 hover:bg-red-500 shadow-red-950/40'
              }`}
            >
              Confirmar Ordem Simulada de {orderType === 'COMPRA' ? 'Compra' : 'Venda'}
            </button>

          </form>

        </div>

        {/* Right Column: Educational Risk Simulator */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Risk Impact Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <GraduationCap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm text-white">
                Simulador de Risco Bahia Capital
              </h3>
            </div>

            {/* Allocation Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Concentração desta Ordem:</span>
                <span className={`font-bold ${isHighRisk ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {portfolioImpactPercent.toFixed(1)}% do Patrimônio
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    portfolioImpactPercent > 40
                      ? 'bg-red-500'
                      : portfolioImpactPercent > 20
                      ? 'bg-amber-400'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(portfolioImpactPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Mentor Alert based on risk */}
            {isHighRisk ? (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span>Atenção à Concentração</span>
                </div>
                <p className="leading-relaxed">
                  Esta ordem alocará mais de 25% da sua carteira em um único ativo. Na consultoria recomendamos não ultrapassar 15% a 20% para manter uma blindagem patrimonial saudável.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  <span>Alocação Prudente</span>
                </div>
                <p className="leading-relaxed">
                  Ordem dentro dos limites recomendados de diversificação para o perfil do investidor iniciante.
                </p>
              </div>
            )}

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 space-y-1">
              <div>• Cotação executada: <strong>Cotação de Mercado ao Vivo</strong></div>
              <div>• Liquidação: <strong>Instantânea (Ambiente Sandbox)</strong></div>
              <div>• Corretagem e Emolumentos: <strong>Isentos para Alunos</strong></div>
            </div>

          </div>

          {/* Quick asset mini snapshot */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <span>{asset.logo}</span>
              <span>{asset.name} ({asset.ticker})</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {asset.description}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function NegociarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Carregando boleta...</div>}>
      <BoletaContent />
    </Suspense>
  );
}
