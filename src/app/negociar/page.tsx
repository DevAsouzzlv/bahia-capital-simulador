'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSimulator } from '@/context/SimulatorContext';
import { OrderType } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { 
  ArrowLeft, 
  Wallet, 
  CheckCircle2, 
  AlertTriangle, 
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

  const totalPortfolio = summary.total > 0 ? summary.total : 10000;
  const portfolioImpactPercent = (totalOrderValue / totalPortfolio) * 100;
  const isHighRisk = portfolioImpactPercent > 25 && orderType === 'COMPRA';

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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <span className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
          <span>Terminal de Negociação • Taxa Zero</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Trading Form (7 cols) */}
        <div className="md:col-span-7 rounded-[32px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl p-7 shadow-glass space-y-6">
          
          <div>
            <h1 className="font-heading font-black text-2xl text-white tracking-tight">
              Boleta de Negociação
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Execute ordens simuladas com cálculo em tempo real
            </p>
          </div>

          {/* Buy / Sell Tabs - Nexora Segmented */}
          <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => { setOrderType('COMPRA'); setErrorMsg(null); }}
              className={`py-3 rounded-xl text-xs font-bold transition-all ${
                orderType === 'COMPRA'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-glow-emerald'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              COMPRAR (Verde)
            </button>
            <button
              type="button"
              onClick={() => { setOrderType('VENDA'); setErrorMsg(null); }}
              className={`py-3 rounded-xl text-xs font-bold transition-all ${
                orderType === 'VENDA'
                  ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              VENDER (Vermelho)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Asset Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Ativo Selecionado
              </label>
              <select
                value={selectedTicker}
                onChange={(e) => { setSelectedTicker(e.target.value); setErrorMsg(null); }}
                className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-3 text-sm font-bold text-white focus:border-cyan-400 focus:outline-none"
              >
                {assets.map((a) => (
                  <option key={a.ticker} value={a.ticker}>
                    {a.ticker} - {a.name} ({formatCurrency(a.price)})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Preview */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs">
              <span className="text-slate-400">Cotação Atual de Pregão:</span>
              <span className="font-bold text-white text-sm font-mono">{formatCurrency(asset.price)}</span>
            </div>

            {/* Quantity Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Quantidade
                </label>
                <span className="text-[11px] text-slate-400">
                  {orderType === 'COMPRA'
                    ? `Caixa Livre: ${formatCurrency(summary.cash)}`
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
                className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.1] px-4 py-3 text-base font-bold text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            {/* Percentage Quick Selector */}
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handlePercentClick(pct)}
                  className="py-2 rounded-xl text-xs font-bold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Total Order Summary Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Valor Operacional Bruto:</span>
                <span className="text-white font-mono">{formatCurrency(totalOrderValue)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Corretagem Simulador:</span>
                <span className="text-emerald-400 font-bold">R$ 0,00 (Isento)</span>
              </div>
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-sm">
                <span className="font-bold text-slate-200">Total a Liquidar:</span>
                <span className={`font-black font-mono text-base ${orderType === 'COMPRA' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                  {formatCurrency(totalOrderValue)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 px-4 rounded-2xl text-sm font-bold text-white shadow-lg transition-all ${
                orderType === 'COMPRA'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-glow-emerald'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 shadow-md'
              }`}
            >
              Confirmar Ordem de {orderType === 'COMPRA' ? 'Compra' : 'Venda'}
            </button>

          </form>

        </div>

        {/* Right Column: Educational Risk Simulator (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                <GraduationCap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm text-white">
                Simulador de Concentração
              </h3>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Peso na Carteira:</span>
                <span className={`font-bold font-mono ${isHighRisk ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {portfolioImpactPercent.toFixed(1)}%
                </span>
              </div>

              <div className="h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    portfolioImpactPercent > 40
                      ? 'bg-rose-500'
                      : portfolioImpactPercent > 20
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(portfolioImpactPercent, 100)}%` }}
                />
              </div>
            </div>

            {isHighRisk ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span>Alerta de Concentração</span>
                </div>
                <p className="leading-relaxed">
                  Esta ordem alocará mais de 25% do seu patrimônio em um único ativo. Recomendamos não concentrar para evitar oscilações severas.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  <span>Alocação Segura</span>
                </div>
                <p className="leading-relaxed">
                  Ordem dentro dos limites recomendados de diversificação para o perfil do investidor iniciante.
                </p>
              </div>
            )}

            <div className="text-[11px] text-slate-400 border-t border-white/[0.08] pt-3 space-y-1">
              <div>• Cotação executada: <strong>Cotação Real ao Vivo</strong></div>
              <div>• Liquidação: <strong>Instantânea (Sandbox)</strong></div>
              <div>• Corretagem: <strong>R$ 0,00 Gratuita</strong></div>
            </div>

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
