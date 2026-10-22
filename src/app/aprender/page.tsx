'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSimulator } from '@/context/SimulatorContext';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Search, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

const GLOSSARY_TERMS = [
  {
    term: 'Dividend Yield (DY)',
    category: 'Ações B3',
    definition: 'Indicador que mede a rentabilidade dos dividendos pagos por uma empresa em relação ao preço atual de suas ações.',
    tip: 'Se uma ação custa R$ 30,00 e pagou R$ 3,00 de dividendos no último ano, seu Dividend Yield é de 10% ao ano.',
  },
  {
    term: 'P/L (Preço sobre Lucro)',
    category: 'Ações B3',
    definition: 'Múltiplo que indica quantos anos o investidor levaria para reaver o capital investido se a empresa mantiver o mesmo lucro líquido.',
    tip: 'Um P/L mais baixo pode sinalizar que a ação está barata ou com desconto em relação aos seus pares.',
  },
  {
    term: 'Reserva de Oportunidade (Caixa)',
    category: 'Geral',
    definition: 'Montante financeiro mantido em liquidez imediata para aproveitar momentos em que bons ativos caem de preço.',
    tip: 'No simulador, manter de 20% a 30% em caixa protege sua carteira contra quedas e permite novas compras.',
  },
  {
    term: 'Preço Médio (PM)',
    category: 'Geral',
    definition: 'A média ponderada dos preços pagos em todas as compras de um mesmo ativo ao longo do tempo.',
    tip: 'Comprar ativos sólidos quando caem reduz seu preço médio e acelera a rentabilidade na recuperação.',
  },
  {
    term: 'Halving do Bitcoin',
    category: 'Criptomoedas',
    definition: 'Evento quadrienal programado no protocolo do Bitcoin que corta pela metade a emissão de novas moedas mineradas.',
    tip: 'Historicamente reduz a oferta de novas moedas e tende a criar ciclos de valorização no médio prazo.',
  },
  {
    term: 'Stop Loss Simulado',
    category: 'Gestão de Risco',
    definition: 'Ordem programada para limitar uma perda máxima aceitável caso o mercado se movimente contra a sua tese.',
    tip: 'Fundamental para não deixar que um erro pequeno destrua uma parte relevante do seu capital.',
  },
];

export default function AcademiaPage() {
  const { user, missions } = useSimulator();
  const [glossarySearch, setGlossarySearch] = useState('');

  const completedCount = missions.filter((m) => m.completed).length;
  const progressPercent = (completedCount / missions.length) * 100;

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.category.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Header with Gamified Progress Bar - Nexora Style */}
      <div className="p-7 sm:p-9 rounded-[32px] bg-gradient-to-br from-[#101F48] via-[#0C1534] to-[#070C1D] border border-white/[0.12] shadow-glass backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-[24px] bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-950/50 flex-shrink-0">
            <Award className="h-10 w-10 text-amber-200" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Academia Bahia Capital
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/[0.06] text-cyan-300 border border-white/[0.1]">
                Gamificação Ativa
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              {user.level}
            </h1>
            <p className="text-xs text-slate-300">
              Você possui <strong className="text-amber-400 font-bold font-mono">{user.xp} XP</strong> acumulados através de operações simuladas.
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="w-full md:w-80 space-y-2 bg-white/[0.04] p-5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400 font-medium">Missões Práticas:</span>
            <span className="font-bold text-emerald-400">{completedCount}/{missions.length} completas</span>
          </div>
          <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 text-right">
            Próximo nível com 500 XP: <strong className="text-white">Investidor Estrategista</strong>
          </div>
        </div>

      </div>

      {/* Learning Tracks Section */}
      <div className="space-y-4">
        <div>
          <h2 className="font-heading font-black text-xl text-white flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-cyan-400" />
            <span>Trilhas Práticas de Aprendizado</span>
          </h2>
          <p className="text-xs text-slate-400">
            Missões graduais para perder o medo e ganhar confiança técnica no pregão
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-xl transition-all space-y-4 flex flex-col justify-between shadow-glass">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Módulo 1 • B3
              </span>
              <h3 className="font-heading font-black text-lg text-white">
                Primeiros Passos na Bolsa
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aprenda a anatomia dos tickers (PETR4, VALE3, WEGE3), lote padrão e realize sua primeira compra sem risco.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>3/3 Concluídas</span>
              </span>
              <Link
                href="/negociar?ticker=PETR4"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Praticar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-7 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 backdrop-blur-xl transition-all space-y-4 flex flex-col justify-between shadow-glass">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Módulo 2 • Criptoativos
              </span>
              <h3 className="font-heading font-black text-lg text-white">
                Cripto sem Mistério e Risco
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entenda a volatilidade do Bitcoin e Ethereum, frações de Satoshi e como controlar posições reduzidas.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Em Andamento</span>
              </span>
              <Link
                href="/negociar?ticker=BTC"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Praticar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-7 rounded-[28px] bg-white/[0.03] border border-white/[0.08] hover:border-emerald-400/40 backdrop-blur-xl transition-all space-y-4 flex flex-col justify-between shadow-glass">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Módulo 3 • Estratégia
              </span>
              <h3 className="font-heading font-black text-lg text-white">
                Carteira Blindada Anti-Crise
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aprenda a fórmula da diversificação entre ações de dividendos, caixa tático e proteção patrimonial.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Recomendado</span>
              <Link
                href="/custodia"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Acessar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Gamified Missions Checklist */}
      <div id="missoes" className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-7 shadow-glass space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-black text-lg text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              <span>Checklist de Missões do Aluno</span>
            </h2>
            <p className="text-xs text-slate-400">
              Cumpra objetivos na plataforma para destravar conquistas e subir de nível
            </p>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/25">
            +600 XP Disponíveis
          </span>
        </div>

        <div className="space-y-3">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                mission.completed
                  ? 'bg-black/30 border-white/[0.05] text-slate-400'
                  : 'bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {mission.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-500 flex-shrink-0" />
                )}
                <div>
                  <div className={`text-sm font-bold ${mission.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {mission.title}
                  </div>
                  <div className="text-xs text-slate-400">{mission.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold font-mono">
                  <Sparkles className="h-3 w-3" />
                  <span>+{mission.xpReward} XP</span>
                </span>
                {mission.completed ? (
                  <span className="text-xs font-bold text-emerald-400 hidden sm:inline">Concluída</span>
                ) : (
                  <Link
                    href="/mercado"
                    className="text-xs font-bold text-cyan-400 hover:underline hidden sm:inline"
                  >
                    Executar
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Glossary */}
      <div id="glossario" className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-7 shadow-glass space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-black text-lg text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              <span>Glossário Descomplicado</span>
            </h2>
            <p className="text-xs text-slate-400">
              Termos do mercado traduzidos em linguagem simples para iniciantes
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Buscar termo (P/L, Yield, Halving)..."
              className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.1] pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredGlossary.map((item) => (
            <div
              key={item.term}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-cyan-400/40 transition-colors shadow-glass"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">{item.term}</h4>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] text-cyan-300 border border-white/[0.08]">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.definition}
              </p>
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/30 text-[11px] text-cyan-200">
                <strong>Exemplo Prático:</strong> {item.tip}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
