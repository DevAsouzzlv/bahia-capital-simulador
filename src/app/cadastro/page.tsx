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
        message: 'Conta criada com sucesso! Bônus pedagógico de R$ 10.000,00 creditado na sua carteira.',
      });

      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-12 bg-fintech-dark">
      
      {/* Left Column: Pedagogical Onboarding Value */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/60 border-r border-slate-800">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span>Onboarding Bahia Capital Edu</span>
          </div>

          <h2 className="font-heading font-black text-3xl text-white leading-tight">
            Liberte seu potencial investidor com segurança pedagógica.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Ao se cadastrar, você recebe uma carteira simulada com <strong className="text-emerald-400 font-bold">{formatCurrency(10000)}</strong> para praticar as aulas do curso sem risco de perder dinheiro.
          </p>

          {/* Bonus card highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-800/80 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-blue-300 tracking-wider">
                Bônus de Cadastro do Aluno
              </span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-3xl font-heading font-black text-white">
              {formatCurrency(10000)}
            </div>
            <p className="text-xs text-slate-300">
              Saldo fictício para comprar Ações da B3 e Criptomoedas com cotações reais.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Sem cobrança de cartão de crédito • 100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Acesso a missões gamificadas e glossário descomplicado</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Feedback automático do mentor sobre diversificação de risco</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Bahia Capital Consultoria Financeira • Educação e Simulação
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-lg space-y-6">
          
          <div className="text-left space-y-2">
            <span className="inline-flex items-center gap-2 whitespace-nowrap px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Cadastro do Aluno</span>
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Crie sua Conta e Libere R$ 10.000 Fictícios
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Preencha seus dados e escolha seu perfil de risco para calibrar os alertas pedagógicos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>Nome Completo</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Arthur Souza"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>E-mail</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>Senha de Acesso</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Investor Profile Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Qual o seu Perfil de Investidor Inicial?</span>
                <span className="text-[11px] text-blue-400 font-normal">Pode ser alterado depois</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* Conservador */}
                <button
                  type="button"
                  onClick={() => setProfile('CONSERVADOR')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    profile === 'CONSERVADOR'
                      ? 'bg-blue-950/70 border-blue-500 text-white ring-1 ring-blue-500 shadow-md'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-1 text-blue-400">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Conservador</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Foco em preservação de capital e maior reserva de caixa.
                  </p>
                </button>

                {/* Moderado */}
                <button
                  type="button"
                  onClick={() => setProfile('MODERADO')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    profile === 'MODERADO'
                      ? 'bg-blue-950/70 border-blue-500 text-white ring-1 ring-blue-500 shadow-md'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-1 text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Moderado</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Equilíbrio entre ações de dividendos, caixa e um toque cripto.
                  </p>
                </button>

                {/* Arrojado */}
                <button
                  type="button"
                  onClick={() => setProfile('ARROJADO')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    profile === 'ARROJADO'
                      ? 'bg-blue-950/70 border-blue-500 text-white ring-1 ring-blue-500 shadow-md'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-1 text-amber-400">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Arrojado</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Maior apetite por volatilidade em criptoativos e small caps.
                  </p>
                </button>

              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Criando conta e liberando R$ 10.000...</span>
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
            <Link href="/login" className="font-semibold text-blue-400 hover:underline">
              Fazer Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
