import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  TrendingUp, 
  Wallet, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  BarChart3, 
  RotateCcw,
  Zap,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-28 px-4 sm:px-6 lg:px-8">
        
        {/* Glow ambient spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/20 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/15 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Glass pill badge */}
              <div className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-1.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 shadow-sm backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                <span>Simulador Educacional Oficial • Bahia Capital</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.12]">
                Aprenda a investir sem o medo de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  perder seu dinheiro.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Receba <strong className="text-cyan-400 font-bold">R$ 10.000,00 fictícios</strong> para negociar Ações da B3 e Criptomoedas com cotações reais da internet. Um laboratório sem risco financeiro com mentoria prática integrada.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/cadastro"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-glow-blue transition-all transform hover:-translate-y-0.5"
                >
                  <Sparkles className="h-5 w-5 text-amber-300 flex-shrink-0" />
                  <span>Liberar R$ 10.000 Grátis</span>
                  <ArrowRight className="h-5 w-5 flex-shrink-0" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] transition-all"
                >
                  <span>Já sou aluno</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-blue-500 border-2 border-[#060A17] flex items-center justify-center text-[10px] font-bold text-white">AS</div>
                    <div className="h-7 w-7 rounded-full bg-cyan-500 border-2 border-[#060A17] flex items-center justify-center text-[10px] font-bold text-white">LM</div>
                    <div className="h-7 w-7 rounded-full bg-emerald-500 border-2 border-[#060A17] flex items-center justify-center text-[10px] font-bold text-white">RC</div>
                  </div>
                  <span className="font-semibold text-slate-200">+5.000 alunos formados</span>
                </div>
                <div className="h-4 w-[1px] bg-white/[0.1]" />
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                  <span>Sandbox Seguro</span>
                </div>
              </div>
            </div>

            {/* Right Column: Nexora-Inspired 3D Portfolio Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[36px] bg-gradient-to-br from-[#101F48] via-[#0C1534] to-[#070C1D] border border-white/[0.15] p-7 sm:p-9 shadow-[0_25px_70px_-15px_rgba(0,102,255,0.4)] backdrop-blur-2xl space-y-6">
                
                {/* Header card badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0 animate-ping" />
                    <span>Crédito de Treino Ativo</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">B3 Sandbox</span>
                </div>

                {/* Balance big display */}
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Saldo Inicial Liberado
                  </div>
                  <div className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
                    {formatCurrency(10000)}
                  </div>
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                    <TrendingUp className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Rendimento acumulado: +4,50% na semana</span>
                  </div>
                </div>

                {/* Sample items */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#0B1433] border border-white/[0.1] flex items-center justify-center text-sm">
                        🛢️
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">PETR4</div>
                        <div className="text-[10px] text-slate-400">Petrobras PN • B3</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white font-mono">{formatCurrency(1821)}</div>
                      <div className="text-[10px] font-bold text-emerald-400">+4,65%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#0B1433] border border-white/[0.1] flex items-center justify-center text-sm">
                        ₿
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Bitcoin (BTC)</div>
                        <div className="text-[10px] text-slate-400">0.01 BTC • Cripto</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white font-mono">{formatCurrency(3624.50)}</div>
                      <div className="text-[10px] font-bold text-emerald-400">+3,40%</div>
                    </div>
                  </div>
                </div>

                {/* Tip */}
                <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong>Metodologia Bahia Capital:</strong> Aprenda a controlar o tamanho de cada posição e diversifique com consciência técnica.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars of Learning - Glassmorphism Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1 text-xs font-semibold rounded-full bg-white/[0.04] text-cyan-300 border border-white/[0.08]">
            Pilares da Formação
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
            Tudo o que você precisa para operar com segurança
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A união perfeita de cotações em tempo real, gestão de carteira e didática acessível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 transition-all space-y-3 group shadow-glass">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Cotações ao Vivo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consuma dados reais de Ações da B3 e Criptomoedas para vivenciar o comportamento autêntico do mercado financeiro.
            </p>
          </div>

          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-emerald-400/40 transition-all space-y-3 group shadow-glass">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">R$ 10.000 sem Risco</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Execute compras e vendas em um ambiente seguro até atingir a consistência necessária para investir dinheiro real.
            </p>
          </div>

          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-blue-400/40 transition-all space-y-3 group shadow-glass">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Gestão de Risco</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meça seu rendimento contra o IBOVESPA e CDI, com alertas pedagógicos contra concentração excessiva de capital.
            </p>
          </div>

          <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 transition-all space-y-3 group shadow-glass">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Reset Ilimitado</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Errou na estratégia? Com apenas 1 clique você restaura seu caixa inicial para R$ 10.000 e começa um novo teste.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-gradient-to-r from-blue-950/40 via-[#090E23] to-cyan-950/40">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Crie sua conta de aluno em menos de 1 minuto e libere R$ 10.000 fictícios agora mesmo.
          </p>
          <div>
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-glow-emerald transition-all hover:scale-105"
            >
              <span>Cadastrar e Liberar R$ 10.000</span>
              <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
