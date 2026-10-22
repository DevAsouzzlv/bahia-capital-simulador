'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface DataPoint {
  time: string;
  carteira: number;
  ibov: number;
  cdi: number;
}

const DATA_TIMEFRAMES: Record<string, DataPoint[]> = {
  '1D': [
    { time: '10:00', carteira: 10000, ibov: 10000, cdi: 10000 },
    { time: '11:00', carteira: 10080, ibov: 10040, cdi: 10002 },
    { time: '12:00', carteira: 10140, ibov: 9980, cdi: 10004 },
    { time: '13:00', carteira: 10210, ibov: 10030, cdi: 10006 },
    { time: '14:00', carteira: 10190, ibov: 10090, cdi: 10008 },
    { time: '15:00', carteira: 10320, ibov: 10120, cdi: 10010 },
    { time: '16:00', carteira: 10410, ibov: 10160, cdi: 10012 },
    { time: '17:00', carteira: 10450, ibov: 10180, cdi: 10014 },
  ],
  '1S': [
    { time: 'Seg', carteira: 10000, ibov: 10000, cdi: 10000 },
    { time: 'Ter', carteira: 10120, ibov: 10050, cdi: 10008 },
    { time: 'Qua', carteira: 10250, ibov: 9950, cdi: 10016 },
    { time: 'Qui', carteira: 10180, ibov: 10080, cdi: 10024 },
    { time: 'Sex', carteira: 10450, ibov: 10180, cdi: 10032 },
  ],
  '1M': [
    { time: 'Sem 1', carteira: 10000, ibov: 10000, cdi: 10000 },
    { time: 'Sem 2', carteira: 10180, ibov: 9920, cdi: 10025 },
    { time: 'Sem 3', carteira: 10310, ibov: 10040, cdi: 10050 },
    { time: 'Sem 4', carteira: 10450, ibov: 10180, cdi: 10075 },
  ],
  '6M': [
    { time: 'Mai', carteira: 10000, ibov: 10000, cdi: 10000 },
    { time: 'Jun', carteira: 10210, ibov: 9800, cdi: 10080 },
    { time: 'Jul', carteira: 10550, ibov: 10150, cdi: 10160 },
    { time: 'Ago', carteira: 10380, ibov: 10020, cdi: 10240 },
    { time: 'Set', carteira: 10720, ibov: 10350, cdi: 10320 },
    { time: 'Out', carteira: 11050, ibov: 10480, cdi: 10400 },
  ],
  '1A': [
    { time: 'Q4 25', carteira: 10000, ibov: 10000, cdi: 10000 },
    { time: 'Q1 26', carteira: 10600, ibov: 10200, cdi: 10260 },
    { time: 'Q2 26', carteira: 11150, ibov: 10450, cdi: 10520 },
    { time: 'Q3 26', carteira: 11800, ibov: 10800, cdi: 10790 },
    { time: 'Q4 26', carteira: 12450, ibov: 11150, cdi: 11060 },
  ],
};

export function PortfolioLineChart() {
  const [timeframe, setTimeframe] = useState<'1D' | '1S' | '1M' | '6M' | '1A'>('1M');
  const data = DATA_TIMEFRAMES[timeframe];

  return (
    <div className="w-full rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 shadow-glass space-y-6">
      {/* Header with Title and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-black text-lg text-white">
              Evolução da Carteira
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Alpha: +2,70%
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Comparativo com os principais benchmarks do mercado (IBOV & CDI)
          </p>
        </div>

        {/* Timeframe Buttons - FitRise/Nexora Pill Group */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-2xl border border-white/[0.08] self-start sm:self-auto">
          {(['1D', '1S', '1M', '6M', '1A'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCarteira" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D2FF" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#0066FF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(val) => `R$ ${(val / 1000).toFixed(1)}k`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-2xl bg-[#090E23]/95 border border-white/[0.1] p-3 shadow-2xl text-xs space-y-1.5 backdrop-blur-xl">
                      <div className="font-bold text-slate-300 border-b border-white/[0.08] pb-1">
                        Período: {label}
                      </div>
                      <div className="flex items-center justify-between gap-4 text-cyan-400 font-bold">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-cyan-400" />
                          Sua Carteira:
                        </span>
                        <span>{formatCurrency(Number(payload[0]?.value || 0))}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-amber-400">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          IBOVESPA:
                        </span>
                        <span>{formatCurrency(Number(payload[1]?.value || 0))}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-slate-400" />
                          CDI 100%:
                        </span>
                        <span>{formatCurrency(Number(payload[2]?.value || 0))}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
            />
            <Area
              name="Carteira Simulador"
              type="monotone"
              dataKey="carteira"
              stroke="#00D2FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCarteira)"
            />
            <Area
              name="IBOVESPA"
              type="monotone"
              dataKey="ibov"
              stroke="#F59E0B"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={0}
            />
            <Area
              name="CDI"
              type="monotone"
              dataKey="cdi"
              stroke="#94A3B8"
              strokeWidth={1.2}
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
