'use client';

import React, { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { InvestorProfile } from '@/types';
import { 
  User, 
  ShieldCheck, 
  Activity, 
  RotateCcw, 
  AlertTriangle, 
  Save
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
      <div className="pb-2 border-b border-white/[0.08]">
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
          Perfil & Configurações
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Ajustes de conta, calibragem de risco e ferramentas pedagógicas de reset.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Profile Form (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          
          <form onSubmit={handleSave} className="rounded-[32px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl p-7 shadow-glass space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-base text-white">Dados do Aluno</h3>
                <p className="text-xs text-slate-400">Identificação para emissão do certificado educacional</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">E-mail Cadastrado</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Turma / Formação</label>
              <input
                type="text"
                disabled
                value={user.enrolledCourse}
                className="w-full rounded-2xl bg-black/40 border border-white/[0.06] px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Investor Profile Calibration */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <label className="text-xs font-bold text-slate-300">
                Calibragem do Perfil de Risco (Suitability)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['CONSERVADOR', 'MODERADO', 'ARROJADO'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProfile(p)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      profile === p
                        ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="text-xs font-black capitalize mb-1">
                      {p.toLowerCase()}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {p === 'CONSERVADOR' && 'Foco em liquidez e menor risco'}
                      {p === 'MODERADO' && 'Equilíbrio padrão XP / Bahia Capital'}
                      {p === 'ARROJADO' && 'Maior exposição em criptomoedas'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 font-bold">
                {savedSuccess && 'Alterações salvas com sucesso!'}
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all"
              >
                <Save className="h-4 w-4" />
                <span>Salvar Configurações</span>
              </button>
            </div>

          </form>

          {/* Reset Pedagógico Section */}
          <div className="p-7 rounded-[32px] bg-gradient-to-r from-amber-950/40 via-[#0D1533] to-amber-950/30 border-2 border-amber-500/40 shadow-glass space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-white">
                    Área de Reset Pedagógico
                  </h3>
                  <p className="text-xs text-amber-300/80">Restaure o capital para testar um novo cenário</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Sem Penalidade</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Deseja recomeçar a simulação do zero com um caixa limpo? Clique abaixo para restaurar imediatamente o seu saldo para <strong className="text-emerald-400 font-bold">R$ 10.000,00 originais</strong>.
            </p>

            <div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-lg shadow-amber-950/50 transition-all hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Zerar Carteira e Restaurar R$ 10.000,00</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: API Feeds Status (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          
          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">
                Status das Conexões
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">B3 Market Feed</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Cotações oficiais B3</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">CoinGecko API</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Pares Cripto BRL</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Latência</span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">18 ms</span>
                </div>
                <div className="text-[11px] text-slate-400">Servidores Cloudflare Edge</div>
              </div>

            </div>
          </div>

          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass text-xs space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Ambiente Homologado</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Material pedagógico exclusivo da formação de investidores Bahia Capital Consultoria.
            </p>
            <div className="pt-2 border-t border-white/[0.08] text-[11px] text-slate-500">
              Versão: <strong className="text-slate-300">2.5.0 (Nexora Luxury Edition)</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
