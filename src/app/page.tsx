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
  Users
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-fintech-dark via-slate-900 to-fintech-dark">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-emerald-500/10 blur-[110px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Anti-Glitch Badge: Whitespace nowrap, aligned dot */}
              <div className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                <span>Simulador Educacional Oficial • Bahia Capital Consultoria</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                Aprenda a investir na prática{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                  sem arriscar seu dinheiro real.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                O maior obstáculo do investidor iniciante é o medo de perder patrimônio. No simulador da Bahia Capital, você recebe <strong className="text-emerald-400 font-bold">R$ 10.000,00 fictícios</strong> para negociar Ações da B3 e Criptomoedas com cotações reais da internet.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/cadastro"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-900/40 hover:shadow-blue-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="h-5 w-5 text-amber-300 flex-shrink-0" />
                  <span>Iniciar Simulação Gratuita</span>
                  <ArrowRight className="h-5 w-5 flex-shrink-0" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <span>Já sou aluno cadastrado</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-blue-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">AS</div>
                    <div className="h-7 w-7 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">LM</div>
                    <div className="h-7 w-7 rounded-full bg-purple-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">RC</div>
                  </div>
                  <span className="font-semibold text-slate-200">+5.000 alunos treinados</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-800" />
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                  <span>Risco Zero Garantido</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Simulation Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
                
                {/* Header card badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Crédito Educacional Ativo</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">B3 Sandbox v2.4</span>
                </div>

                {/* Balance big display */}
                <div className="space-y-1 mb-6">
                  <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                    Saldo de Treino Inicial
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                    {formatCurrency(10000)}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 pt-1">
                    <TrendingUp className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Disponível imediatamente para compras simuladas</span>
                  </div>
                </div>

                {/* Mini sample portfolio holdings */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Exemplo de Carteira no Simulador
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-sm">
                        🛢️
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">PETR4</div>
                        <div className="text-[10px] text-slate-400">50 ações • B3</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">{formatCurrency(1821)}</div>
                      <div className="text-[10px] font-semibold text-emerald-400">+4,65%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-amber-900/40 border border-amber-500/30 flex items-center justify-center text-sm">
                        ₿
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Bitcoin (BTC)</div>
                        <div className="text-[10px] text-slate-400">0.01 BTC • Cripto</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">{formatCurrency(3624.50)}</div>
                      <div className="text-[10px] font-semibold text-emerald-400">+3,40%</div>
                    </div>
                  </div>
                </div>

                {/* Educational Alert Tip inside card */}
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex items-start gap-2.5">
                  <GraduationCap className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong>Dica Bahia Capital:</strong> O simulador recalcula seu Preço Médio e alerta sobre risco de concentração a cada ordem executada.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars of Learning */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Metodologia Bahia Capital
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Tudo o que você precisa para dominar o mercado
          </h2>
          <p className="text-sm text-slate-400">
            Desenvolvido por analistas e educadores para que você dê seus primeiros passos com segurança técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3 group">
            <div className="h-12 w-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Cotações em Tempo Real</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consuma dados atualizados de Ações da B3 (PETR4, VALE3, WEGE3) e Cripto (BTC, ETH, SOL) para sentir o ritmo real do pregão.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="h-12 w-12 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">R$ 10.000 sem Risco</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Teste ordens de compra e venda sem colocar um único centavo do seu bolso em perigo até adquirir convicção analítica.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 group">
            <div className="h-12 w-12 rounded-xl bg-amber-600/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Gestão de Risco e Alpha</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare seu rendimento contra o IBOVESPA e o CDI, monitorando sua taxa de diversificação através do gráfico Donut.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 group">
            <div className="h-12 w-12 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-white">Reset Educacional</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Errou na estratégia? Com um clique você restaura seus R$ 10.000 para experimentar novos cenários quantas vezes desejar.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Pronto para transformar medo em conhecimento?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Junte-se à comunidade Bahia Capital Consultoria e receba seu saldo inicial de R$ 10.000 imediatamente.
          </p>
          <div>
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-950/50 transition-all hover:scale-105"
            >
              <span>Cadastrar e Liberar R$ 10.000 Fictícios</span>
              <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
