'use client';

import React, { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { InvestorProfile } from '@/types';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Activity, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Sparkles,
  Save,
  GraduationCap
} from 'lucide-react';

export default function ConfiguracoesPage() {
  const { user, updateUserProfile, setIsResetModalOpen, setNotification } = useSimulator();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profile, setProfile] = useState<InvestorProfile>(user.investorProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      investorProfile: profile,
    });
    setSavedSuccess(true);
    setNotification({
      type: 'success',
      message: 'Dados cadastrais e perfil de investidor atualizados com sucesso!',
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
      
      {/* Page Title */}
      <div className="pb-2 border-b border-slate-800">
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
          Perfil do Aluno & Ajustes do Simulador
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gerencie suas preferências de aprendizado, perfil de investidor e ferramentas de reset.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Profile Form (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          
          <form onSubmit={handleSave} className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Dados do Aluno</h3>
                <p className="text-xs text-slate-400">Identificação para emissão do certificado de conclusão</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">E-mail Cadastrado</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Turma / Formação Matriculada</label>
              <input
                type="text"
                disabled
                value={user.enrolledCourse}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Investor Profile Calibration */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300">
                Calibragem do Perfil de Risco (Suitability Educacional)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['CONSERVADOR', 'MODERADO', 'ARROJADO'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProfile(p)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      profile === p
                        ? 'bg-blue-950/70 border-blue-500 text-white ring-1 ring-blue-500'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold capitalize mb-0.5">
                      {p.toLowerCase()}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {p === 'CONSERVADOR' && 'Maior peso em caixa e ações defensivas'}
                      {p === 'MODERADO' && 'Equilíbrio padrão XP / Bahia Capital'}
                      {p === 'ARROJADO' && 'Permite maior exposição em Criptoativos'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 font-medium">
                {savedSuccess && 'Alterações salvas com sucesso!'}
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all"
              >
                <Save className="h-4 w-4" />
                <span>Salvar Configurações</span>
              </button>
            </div>

          </form>

          {/* Reset Pedagógico Section (Special Highlight) */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Área de Reset Pedagógico
                  </h3>
                  <p className="text-xs text-amber-300/80">Recurso livre de risco para recomeçar o treinamento</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Sem Penalidade</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cometeu erros operacionais ou deseja testar uma estratégia radicalmente diferente com um caixa limpo? Clique no botão abaixo para restaurar imediatamente o seu saldo para os <strong className="text-emerald-400 font-bold">R$ 10.000,00 originais</strong>.
            </p>

            <div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-950/50 transition-all hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Zerar Carteira e Reiniciar com R$ 10.000,00</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: API Feeds Status & App Info (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          
          {/* API Feeds Status */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">
                Status das Conexões de Mercado
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">B3 Market Feed</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Cotações oficiais de Ações e ETFs</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">CoinGecko Cripto API</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Pares BRL (Bitcoin, Ethereum, Solana)</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Latência do Simulador</span>
                  <span className="text-[11px] font-mono text-emerald-400">24 ms</span>
                </div>
                <div className="text-[11px] text-slate-400">Servidores locais de alta performance</div>
              </div>

            </div>
          </div>

          {/* Educational Accreditation Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl text-xs space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span>Ambiente Homologado</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Este simulador é parte integrante do material pedagógico dos cursos de formação de investidores da Bahia Capital Consultoria.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              Versão do Software: <strong>2.4.0 (Build 2026-10)</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
