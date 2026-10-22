import React from 'react';
import Link from 'next/link';
import { ShieldCheck, GraduationCap, Award, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                BC
              </div>
              <span className="font-heading font-bold text-white text-sm">
                Bahia Capital Consultoria
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Plataforma pedagógica desenvolvida para novos investidores vencerem o medo do mercado financeiro brasileiro e global com prática sem risco.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Plataforma 100% Educacional</span>
            </div>
          </div>

          {/* Column 2: Navegação Rápida */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Simulador
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard de Rentabilidade
                </Link>
              </li>
              <li>
                <Link href="/mercado" className="hover:text-white transition-colors">
                  Cotações B3 & Cripto ao Vivo
                </Link>
              </li>
              <li>
                <Link href="/custodia" className="hover:text-white transition-colors">
                  Minha Carteira & Posições
                </Link>
              </li>
              <li>
                <Link href="/negociar" className="hover:text-white transition-colors">
                  Boleta de Negociação
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Educação */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Educação & Metodologia
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/aprender" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                  <span>Academia do Investidor</span>
                </Link>
              </li>
              <li>
                <Link href="/aprender#missoes" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  <span>Missões Gamificadas</span>
                </Link>
              </li>
              <li>
                <Link href="/aprender#glossario" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Glossário Descomplicado</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Disclaimer Legal & Regulatório */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-semibold text-slate-200 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              Aviso Legal Pedagógico
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Este simulador utiliza capital fictício para fins de treinamento e estudo. As cotações refletem dados reais de mercado para conferir fidelidade prática aos alunos. Não constitui recomendação de investimento.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Bahia Capital Consultoria. Todos os direitos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-400">Termos de Uso</Link>
            <Link href="/" className="hover:text-slate-400">Privacidade</Link>
            <Link href="/configuracoes" className="hover:text-slate-400">Status da API</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
