'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSimulator } from '@/context/SimulatorContext';
import { formatCurrency } from '@/utils/formatters';
import { 
  TrendingUp, 
  PieChart, 
  Layers, 
  History, 
  GraduationCap, 
  Settings, 
  ShieldCheck, 
  Wallet,
  Menu,
  X,
  RotateCcw
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { summary, user, setIsResetModalOpen } = useSimulator();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { href: '/mercado', label: 'Mercado', icon: Layers },
    { href: '/custodia', label: 'Minha Custódia', icon: PieChart },
    { href: '/negociar', label: 'Boleta', icon: Wallet },
    { href: '/historico', label: 'Extrato', icon: History },
    { href: '/aprender', label: 'Academia', icon: GraduationCap },
  ];

  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/cadastro';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-fintech-border/80 bg-fintech-dark/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Educational Tag */}
        <div className="flex items-center gap-3">
          <Link href={isPublicPage ? '/' : '/dashboard'} className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 shadow-md shadow-blue-900/30 border border-blue-400/30 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="font-heading font-black text-xl text-white tracking-wider">BC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                Bahia Capital
                <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/60">
                  Edu
                </span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 -mt-0.5">
                Simulador de Investimentos
              </span>
            </div>
          </Link>

          {/* Persistent Simulation Badge - Anti-Glitch Fix: Never breaks words, perfect dot alignment */}
          <div className="hidden lg:flex items-center">
            <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span>Ambiente Simulado • Sem Risco Real</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!isPublicPage && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Balance Chip & Profile Actions */}
        <div className="flex items-center gap-3">
          {!isPublicPage ? (
            <>
              {/* Financial Balance Chip - Glitch-Free & WCAG AA compliant */}
              <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-inner">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Patrimônio Total
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight">
                    {formatCurrency(summary.total)}
                  </span>
                </div>
                <div className="h-7 w-[1px] bg-slate-700" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                    Caixa Livre
                  </span>
                  <span className="text-sm font-bold text-emerald-400 tracking-tight">
                    {formatCurrency(summary.cash)}
                  </span>
                </div>
              </div>

              {/* Quick Reset Button */}
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                title="Zerar carteira e reiniciar com R$ 10.000"
                className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-colors"
                aria-label="Reiniciar simulação"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* User Avatar & Settings Link */}
              <Link
                href="/configuracoes"
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-blue-500/30 flex-shrink-0">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-900/30 transition-all hover:shadow-blue-700/50"
              >
                <span>Criar Conta Gratuita</span>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          {!isPublicPage && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {!isPublicPage && mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-fintech-dark/98 px-4 py-3 space-y-2">
          {/* Mobile Balance display */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <div>
              <div className="text-xs text-slate-400">Patrimônio Total</div>
              <div className="text-base font-bold text-white">{formatCurrency(summary.total)}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-emerald-400">Disponível</div>
              <div className="text-base font-bold text-emerald-400">{formatCurrency(summary.cash)}</div>
            </div>
          </div>

          <div className="py-1">
            <span className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span>Ambiente Simulado • Sem Risco Real</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <Link
              href="/configuracoes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <Settings className="h-4 w-4" />
              <span>Configurações & Perfil</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResetModalOpen(true);
              }}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset R$ 10.000</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
