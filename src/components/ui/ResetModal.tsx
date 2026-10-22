'use client';

import React from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { RotateCcw, AlertTriangle, X, CheckCircle2 } from 'lucide-react';

export function ResetModal() {
  const { isResetModalOpen, setIsResetModalOpen, resetPortfolio } = useSimulator();

  if (!isResetModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={() => setIsResetModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
            <RotateCcw className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold mb-1">
              <AlertTriangle className="h-3 w-3 flex-shrink-0" />
              Recurso Educacional
            </span>
            <h3 id="modal-title" className="text-lg font-bold text-white">
              Reiniciar Carteira Simulada?
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Esta ação apagará todas as suas ordens simuladas atuais e restabelecerá o saldo de caixa inicial para <strong className="text-emerald-400 font-semibold">R$ 10.000,00</strong>.
        </p>

        <div className="rounded-xl bg-slate-800/80 border border-slate-700/70 p-3.5 mb-6 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Seu saldo volta exatamente para R$ 10.000,00</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Seu progresso na Academia e suas missões serão mantidos</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500 ml-1.5 mr-0.5 flex-shrink-0" />
            <span>Ideal para testar novas estratégias sem vício de posições antigas</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={resetPortfolio}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-lg shadow-amber-900/30 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Confirmar Reset (R$ 10.000)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
