import React from 'react';
import Link from 'next/link';
import { ShieldCheck, GraduationCap, Award, HelpCircle, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#040711]/90 backdrop-blur-xl text-slate-400 text-xs py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow-blue flex-shrink-0">
                <div className="h-full w-full bg-[#090E23] rounded-[11px] flex items-center justify-center">
                  <span className="font-heading font-black text-xs text-transparent bg-clip-text bg-gradient-to-tr from-white to-cyan-300">
                    BC
                  </span>
                </div>
              </div>
              <span className="font-heading font-black text-white text-sm tracking-tight">
                Bahia Capital Consultoria
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-normal">
              Plataforma pedagógica desenvolvida para novos investidores vencerem o medo do mercado financeiro brasileiro e global através de simulação prática.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[11px] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Ambiente 100% Educacional</span>
            </div>
          </div>

          {/* Column 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white uppercase text-[11px] tracking-wider">
              Simulador de Carteira
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Dashboard de Rentabilidade
                </Link>
              </li>
              <li>
                <Link href="/mercado" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Cotações B3 & Cripto ao Vivo
                </Link>
              </li>
              <li>
                <Link href="/custodia" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Minha Custódia & Posições
                </Link>
              </li>
              <li>
                <Link href="/negociar" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Boleta de Negociação
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Educação */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white uppercase text-[11px] tracking-wider">
              Educação & Metodologia
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/aprender" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Academia do Investidor</span>
                </Link>
              </li>
              <li>
                <Link href="/aprender#missoes" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  <span>Missões Gamificadas (XP)</span>
                </Link>
              </li>
              <li>
                <Link href="/aprender#glossario" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Glossário Descomplicado</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Disclaimer Legal & Regulatório */}
          <div className="space-y-2.5 bg-white/[0.03] p-5 rounded-2xl border border-white/[0.08] backdrop-blur-xl">
            <h4 className="font-semibold text-slate-200 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              Aviso Legal Pedagógico
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
              Este simulador utiliza capital fictício para fins de treinamento e estudo. As cotações refletem dados reais de mercado para conferir fidelidade prática aos alunos. Não constitui recomendação de investimento.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Bahia Capital Consultoria. Todos os direitos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-400">Termos de Uso</Link>
            <Link href="/" className="hover:text-slate-400">Privacidade</Link>
            <Link href="/configuracoes" className="hover:text-slate-400">Status das APIs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
