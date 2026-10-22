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
  CheckCircle2,
  GraduationCap
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
    <div className="flex-1 min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-12 bg-fintech-dark">
      
      {/* Left Column: Pedagogical Showcase (Split Screen) */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/60 border-r border-slate-800">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
            <span>Área Exclusiva do Aluno</span>
          </div>

          <h2 className="font-heading font-black text-3xl text-white leading-tight">
            Seu laboratório prático para conquistar segurança financeira.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Aqui o erro não custa o seu salário. Pratique compra e venda de ativos com acompanhamento pedagógico da equipe Bahia Capital.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Saldo fictício inicial de <strong>{formatCurrency(10000)}</strong> creditado na conta</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Acompanhamento de preços ao vivo de Ações da B3 e Criptomoedas</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Ferramenta de reset ilimitado para reiniciar a simulação quando desejar</span>
            </div>
          </div>
        </div>

        {/* Student Testimonial */}
        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-2">
          <p className="italic text-slate-200 leading-relaxed">
            &ldquo;Eu tinha pânico só de ouvir falar em comprar ações. Simular por 2 semanas no ambiente da Bahia Capital me deu a clareza que nenhum livro técnico conseguiu passar.&rdquo;
          </p>
          <div className="flex items-center gap-2 pt-1 font-semibold text-white">
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px]">
              MS
            </div>
            <span>Mariana Silva • Aluna Turma 14</span>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-left space-y-2">
            <span className="inline-flex items-center gap-2 whitespace-nowrap px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Acesso Seguro</span>
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Entrar no Simulador
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Digite suas credenciais de aluno para acessar sua carteira de treino.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>E-mail do Aluno</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Senha</span>
                </label>
                <Link href="#" className="text-xs text-blue-400 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Acessando...</span>
              ) : (
                <>
                  <span>Entrar e Abrir Carteira</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
            <p className="text-xs text-slate-400">
              Acesso rápido para avaliação com perfil de demonstração:
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail('aluno.demo@bahiacapital.com.br');
                setTimeout(() => router.push('/dashboard'), 200);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Acessar Instantaneamente como Aluno Demo</span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            Ainda não tem conta de aluno?{' '}
            <Link href="/cadastro" className="font-semibold text-blue-400 hover:underline">
              Cadastre-se e libere R$ 10.000 fictícios
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
