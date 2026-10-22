'use client';

import React, { useState } from 'react';
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
  Wallet,
  Menu,
  X,
  RotateCcw,
  Bell,
  Sparkles
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { summary, user, setIsResetModalOpen } = useSimulator();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { href: '/mercado', label: 'Mercado', icon: Layers },
    { href: '/custodia', label: 'Custódia', icon: PieChart },
    { href: '/negociar', label: 'Negociar', icon: Wallet },
    { href: '/historico', label: 'Extrato', icon: History },
    { href: '/aprender', label: 'Academia', icon: GraduationCap },
  ];

  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/cadastro';

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 backdrop-blur-xl bg-[#060A17]/80 border-b border-white/[0.06]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
        
        {/* Brand Logo - Nexora Inspired */}
        <div className="flex items-center gap-3">
          <Link href={isPublicPage ? '/' : '/dashboard'} className="flex items-center gap-2.5 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow-blue transition-transform group-hover:scale-105 flex-shrink-0">
              <div className="h-full w-full bg-[#090E23] rounded-[15px] flex items-center justify-center">
                <span className="font-heading font-black text-sm tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-white via-cyan-200 to-blue-400">
                  BC
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-base tracking-tight text-white flex items-center gap-1.5 leading-none">
                Bahia Capital
                <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded-full border border-cyan-800/40">
                  Edu
                </span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                Investment Simulator
              </span>
            </div>
          </Link>

          {/* Persistent Simulation Badge - Anti-Glitch Fix */}
          <div className="hidden lg:flex items-center ml-2">
            <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-[11px] font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
              <span>Ambiente Simulado • Sem Risco</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links - Floating Pill Style */}
        {!isPublicPage && (
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-blue'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Balance Chip & Profile Actions */}
        <div className="flex items-center gap-2.5">
          {!isPublicPage ? (
            <>
              {/* Financial Balance Chip */}
              <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                <div className="flex flex-col text-right">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Total Carteira
                  </span>
                  <span className="text-xs font-black text-white font-mono tracking-tight">
                    {formatCurrency(summary.total)}
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-white/[0.1]" />
                <div className="flex flex-col text-right">
                  <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">
                    Disponível
                  </span>
                  <span className="text-xs font-black text-emerald-400 font-mono tracking-tight">
                    {formatCurrency(summary.cash)}
                  </span>
                </div>
              </div>

              {/* Quick Reset Button */}
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                title="Zerar carteira e reiniciar com R$ 10.000"
                className="p-2 rounded-xl text-slate-400 hover:text-amber-400 bg-white/[0.03] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/25 transition-all"
                aria-label="Reiniciar simulação"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* Notification icon */}
              <button
                type="button"
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
                aria-label="Notificações"
              >
                <Bell className="h-4 w-4" />
              </button>

              {/* User Avatar & Settings Link */}
              <Link
                href="/configuracoes"
                className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
              >
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20 flex-shrink-0">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-glow-blue hover:opacity-95 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Iniciar Grátis</span>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          {!isPublicPage && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white bg-white/[0.05] rounded-xl border border-white/[0.08]"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {!isPublicPage && mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-3xl bg-[#090E23]/95 border border-white/[0.1] backdrop-blur-2xl space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Patrimônio</div>
              <div className="text-sm font-black text-white font-mono">{formatCurrency(summary.total)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-400">Caixa Livre</div>
              <div className="text-sm font-black text-emerald-400 font-mono">{formatCurrency(summary.cash)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold rounded-xl ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-glow-blue'
                      : 'text-slate-300 bg-white/[0.03] hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex justify-between items-center text-xs">
            <Link
              href="/configuracoes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Configurações</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResetModalOpen(true);
              }}
              className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
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
