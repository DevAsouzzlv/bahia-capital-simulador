'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSimulator } from '@/context/SimulatorContext';
import { InvestorProfile } from '@/types';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  User as UserIcon, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  Zap 
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function RegisterPage() {
  const router = useRouter();
  const { updateUserProfile, setNotification } = useSimulator();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<InvestorProfile>('MODERADO');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateUserProfile({
        name: name || 'Novo Aluno',
        email: email || 'aluno@bahiacapital.com.br',
        investorProfile: profile,
      });

      setNotification({
        type: 'success',
        message: 'Conta criada! R$ 10.000,00 fictícios creditados na sua carteira.',
      });

      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4.5rem)] grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 items-center gap-8">
      
      {/* Left Column: Showcase */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 rounded-[36px] bg-gradient-to-br from-[#101F48] via-[#0C1534] to-[#070C1D] border border-white/[0.12] shadow-glass backdrop-blur-2xl space-y-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-1.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
            <span>Onboarding Bahia Capital Edu</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Liberte seu potencial investidor com segurança técnica.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Ao se cadastrar, você recebe uma carteira simulada com <strong className="text-cyan-400 font-bold">{formatCurrency(10000)}</strong> para praticar as aulas do curso sem risco de perder dinheiro.
          </p>

          {/* Bonus card highlight */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.1] space-y-2 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Bônus Inicial de Treino
              </span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-4xl font-heading font-black text-white font-mono">
              {formatCurrency(10000)}
            </div>
            <p className="text-xs text-slate-300">
              Saldo fictício para operar Ações B3 e Criptomoedas com cotações reais.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Sem cartão de crédito • 100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Missões práticas gamificadas com pontuação XP</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Alertas do mentor em tempo real sobre diversificação</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Bahia Capital Consultoria • Educação Financeira
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="lg:col-span-7 flex items-center justify-center">
        <div className="w-full max-w-lg p-8 sm:p-10 rounded-[36px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-glass space-y-6">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Cadastro do Aluno</span>
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Crie sua Conta e Libere R$ 10.000
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Preencha seus dados para calibrar os alertas pedagógicos da sua carteira.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-cyan-400" />
                <span>Nome Completo</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Arthur Souza"
                className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <span>E-mail</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-cyan-400" />
                <span>Senha de Acesso</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Investor Profile Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Perfil de Risco Inicial</span>
                <span className="text-[11px] text-cyan-400 font-normal">Pode mudar depois</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                <button
                  type="button"
                  onClick={() => setProfile('CONSERVADOR')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    profile === 'CONSERVADOR'
                      ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400'
                      : 'bg-[#090E23] border-white/[0.08] text-slate-300 hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black mb-1 text-cyan-400">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Conservador</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Foco em preservação e maior reserva de caixa.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setProfile('MODERADO')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    profile === 'MODERADO'
                      ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400'
                      : 'bg-[#090E23] border-white/[0.08] text-slate-300 hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black mb-1 text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Moderado</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Equilíbrio entre ações, dividendos e um toque cripto.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setProfile('ARROJADO')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    profile === 'ARROJADO'
                      ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400'
                      : 'bg-[#090E23] border-white/[0.08] text-slate-300 hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black mb-1 text-amber-400">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Arrojado</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Maior exposição à volatilidade e criptomoedas.
                  </p>
                </button>

              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-glow-emerald transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Liberando R$ 10.000...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Criar Conta e Liberar R$ 10.000 Fictícios</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Já possui uma conta de aluno?{' '}
            <Link href="/login" className="font-bold text-cyan-400 hover:underline">
              Fazer Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
