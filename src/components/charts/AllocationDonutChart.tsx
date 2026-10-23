'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { useSimulator } from '@/context/SimulatorContext';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export function AllocationDonutChart() {
  const { summary, positions } = useSimulator();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stocksTotal = positions
    .filter((p) => p.type === 'ACAO')
    .reduce((acc, p) => acc + p.currentValue, 0);

  const cryptoTotal = positions
    .filter((p) => p.type === 'CRIPTO')
    .reduce((acc, p) => acc + p.currentValue, 0);

  const cashTotal = summary.cash;
  const total = summary.total > 0 ? summary.total : 10000;

  const data = [
    {
      name: 'Reserva em Caixa',
      value: cashTotal,
      percentage: (cashTotal / total) * 100,
      color: '#10B981', // Verde esmeralda
    },
    {
      name: 'Ações B3',
      value: stocksTotal,
      percentage: (stocksTotal / total) * 100,
      color: '#00D2FF', // Ciano elétrico
    },
    {
      name: 'Criptomoedas',
      value: cryptoTotal,
      percentage: (cryptoTotal / total) * 100,
      color: '#3B82F6', // Azul real
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-5 sm:p-6 shadow-glass flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="font-heading font-black text-base sm:text-lg text-white">
            Divisão de Alocação
          </h3>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {formatCurrency(total)}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Proporção entre reserva líquida e ativos de risco
        </p>
      </div>

      {/* Ring Gauge - Nexora Segmented Style */}
      <div className="h-52 w-full relative flex items-center justify-center">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-2xl bg-[#090E23]/95 border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1 backdrop-blur-xl">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </div>
                        <div className="text-slate-300 font-mono">
                          {formatCurrency(item.value)} ({formatPercent(item.percentage, false)})
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="transparent"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
            Carregando gráfico...
          </div>
        )}

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</span>
          <span className="text-lg sm:text-xl font-heading font-black text-white tracking-tight">
            R$ {(total / 1000).toFixed(1)}k
          </span>
          <span className="text-[10px] font-bold text-emerald-400">
            {((cashTotal / total) * 100).toFixed(0)}% livre
          </span>
        </div>
      </div>

      {/* Legend list pills */}
      <div className="space-y-2 pt-2 border-t border-white/[0.08]">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-200 font-semibold truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-2 font-mono flex-shrink-0">
              <span className="text-slate-400 text-[11px] hidden xs:inline">{formatCurrency(item.value)}</span>
              <span className="font-bold text-white min-w-[44px] text-right">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
