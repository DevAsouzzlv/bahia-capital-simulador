'use client';

import React from 'react';
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

  // Group by category
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
      color: '#10B981', // Verde
    },
    {
      name: 'Ações B3',
      value: stocksTotal,
      percentage: (stocksTotal / total) * 100,
      color: '#3B82F6', // Azul
    },
    {
      name: 'Criptomoedas',
      value: cryptoTotal,
      percentage: (cryptoTotal / total) * 100,
      color: '#F59E0B', // Âmbar
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading font-bold text-base text-white">
            Alocação Patrimonial
          </h3>
          <span className="text-[11px] text-slate-400">Total: {formatCurrency(total)}</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Divisão equilibrada entre liquidez e ativos de risco
        </p>
      </div>

      <div className="h-52 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-xl bg-slate-900/95 border border-slate-700 p-2.5 shadow-xl text-xs space-y-1">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </div>
                      <div className="text-slate-300">
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
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0F172A" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Caixa Livre</span>
          <span className="text-sm font-bold text-emerald-400">
            {((cashTotal / total) * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="mt-4 space-y-2 pt-3 border-t border-slate-800">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{formatCurrency(item.value)}</span>
              <span className="font-bold text-white min-w-[42px] text-right">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
