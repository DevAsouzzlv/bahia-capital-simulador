'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSimulator } from '@/context/SimulatorContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function LoginPage() {
  const router = useRouter();
  const { setNotification } = useSimulator();
  const [email, setEmail] = useState('arthur.souza@bahiacapital.com.br');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Login realizado com sucesso! Bem-vindo de volta ao Simulador Bahia Capital.',
      });
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4.5rem)] grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 items-center gap-8">
      
      {/* Left Column: Pedagogical Showcase (Nexora/FitRise Style) */}
      <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-10 rounded-[36px] bg-gradient-to-br from-[#101F48] via-[#0C1534] to-[#070C1D] border border-white/[0.12] shadow-glass backdrop-blur-2xl space-y-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-1.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
            <span>Área Exclusiva do Aluno</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Seu laboratório prático para conquistar segurança financeira.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Aqui o erro não custa o seu patrimônio. Pratique compra e venda de ativos com acompanhamento pedagógico da equipe Bahia Capital.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Saldo fictício inicial de <strong className="text-white font-mono">{formatCurrency(10000)}</strong> creditado</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Cotações oficiais ao vivo de Ações da B3 e Criptomoedas</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Reset ilimitado para testar novas estratégias de carteira</span>
            </div>
          </div>
        </div>

        {/* Student Testimonial */}
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 space-y-2">
          <p className="italic text-slate-200 leading-relaxed">
            &ldquo;Simular por 2 semanas no ambiente da Bahia Capital me deu a segurança necessária para começar a investir na vida real sem medo.&rdquo;
          </p>
          <div className="flex items-center gap-2 pt-1 font-semibold text-white">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-[10px]">
              MS
            </div>
            <span>Mariana Silva • Aluna Turma 14</span>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="lg:col-span-6 flex items-center justify-center">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-[36px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-glass space-y-6">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Acesso Seguro</span>
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Acessar Simulador
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Digite suas credenciais de aluno para entrar na sua carteira.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <span>E-mail do Aluno</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Senha</span>
                </label>
                <Link href="#" className="text-xs text-cyan-400 hover:underline">
                  Esqueceu?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl bg-[#090E23] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Acessando...</span>
              ) : (
                <>
                  <span>Entrar no Simulador</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Button */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] text-center space-y-2">
            <p className="text-xs text-slate-400">
              Acesso rápido para avaliação com perfil demo:
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail('aluno.demo@bahiacapital.com.br');
                setTimeout(() => router.push('/dashboard'), 200);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Acessar como Aluno Demo</span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            Ainda não tem conta de aluno?{' '}
            <Link href="/cadastro" className="font-bold text-cyan-400 hover:underline">
              Cadastre-se e libere R$ 10.000
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
