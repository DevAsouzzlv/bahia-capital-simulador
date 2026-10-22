'use client';

import React, { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { Order } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { 
  Download, 
  FileText, 
  X, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownLeft,
  GraduationCap
} from 'lucide-react';

export default function HistoricoPage() {
  const { orders } = useSimulator();
  const [filterType, setFilterType] = useState<'TODAS' | 'COMPRA' | 'VENDA'>('TODAS');
  const [selectedOrderForNote, setSelectedOrderForNote] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (filterType === 'COMPRA') return order.type === 'COMPRA';
    if (filterType === 'VENDA') return order.type === 'VENDA';
    return true;
  });

  const exportCSV = () => {
    const headers = 'ID,Ticker,Nome,Tipo,Quantidade,Preco_Unitario,Total,Data,Status\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.ticker}","${o.name}","${o.type}",${o.quantity},${o.unitPrice},${o.totalValue},"${o.executedAt}","${o.status}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `extrato_bahia_capital_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Histórico & Extrato
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0 animate-pulse" />
              {orders.length} Ordens Executadas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Registro fiscal e contábil das operações simuladas para fins educativos.
          </p>
        </div>

        <button
          onClick={exportCSV}
          disabled={orders.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Exportar Extrato (CSV)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['TODAS', 'COMPRA', 'VENDA'] as const).map((ft) => (
          <button
            key={ft}
            type="button"
            onClick={() => setFilterType(ft)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              filterType === ft
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-blue'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08]'
            }`}
          >
            {ft === 'TODAS' ? 'Todas' : ft === 'COMPRA' ? 'Compras' : 'Vendas'}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Nenhuma operação encontrada para o filtro selecionado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-4 pl-5">Data / Hora</th>
                  <th className="py-4">Ativo</th>
                  <th className="py-4">Tipo</th>
                  <th className="py-4 text-right">Qtd</th>
                  <th className="py-4 text-right">Preço Unitário</th>
                  <th className="py-4 text-right">Total</th>
                  <th className="py-4 text-center">Corretagem</th>
                  <th className="py-4 text-center">Status</th>
                  <th className="py-4 text-right pr-5">Nota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredOrders.map((ord) => {
                  const isBuy = ord.type === 'COMPRA';
                  return (
                    <tr key={ord.id} className="hover:bg-white/[0.04] transition-colors">
                      
                      <td className="py-4 pl-5 text-slate-400 font-mono text-[11px]">
                        {formatDate(ord.executedAt)}
                      </td>

                      <td className="py-4 font-bold text-white">
                        <div className="flex items-center gap-1.5">
                          <span>{ord.ticker}</span>
                          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                            ({ord.name})
                          </span>
                        </div>
                      </td>

                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                          isBuy
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}>
                          {isBuy ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                          <span>{ord.type}</span>
                        </span>
                      </td>

                      <td className="py-4 text-right text-slate-200 font-mono font-medium">
                        {ord.quantity}
                      </td>

                      <td className="py-4 text-right text-slate-300 font-mono">
                        {formatCurrency(ord.unitPrice)}
                      </td>

                      <td className="py-4 text-right font-bold text-white font-mono">
                        {formatCurrency(ord.totalValue)}
                      </td>

                      <td className="py-4 text-center">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          R$ 0,00
                        </span>
                      </td>

                      <td className="py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Executada</span>
                        </span>
                      </td>

                      <td className="py-4 text-right pr-5">
                        <button
                          onClick={() => setSelectedOrderForNote(ord)}
                          className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
                          title="Ver Nota de Corretagem"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Nota de Corretagem Pedagógica */}
      {selectedOrderForNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-[32px] bg-[#090E23] border border-white/[0.12] p-7 shadow-2xl text-white space-y-4">
            
            <button
              onClick={() => setSelectedOrderForNote(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="h-10 w-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  Documento Didático Fiscal
                </span>
                <h3 className="font-heading font-black text-lg text-white">
                  Nota de Corretagem #{selectedOrderForNote.id.replace('ord_', '')}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-black/30 p-4 rounded-2xl border border-white/[0.06]">
              <div>
                <div className="text-slate-400">Data de Execução:</div>
                <div className="font-medium text-white">{formatDate(selectedOrderForNote.executedAt)}</div>
              </div>
              <div>
                <div className="text-slate-400">Mercado:</div>
                <div className="font-medium text-white">B3 Sandbox (D+2)</div>
              </div>
              <div>
                <div className="text-slate-400">Ativo:</div>
                <div className="font-bold text-cyan-400">{selectedOrderForNote.ticker} - {selectedOrderForNote.name}</div>
              </div>
              <div>
                <div className="text-slate-400">Operação:</div>
                <div className={`font-bold ${selectedOrderForNote.type === 'COMPRA' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedOrderForNote.type} ({selectedOrderForNote.quantity} un)
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-white/[0.08] pt-3">
              <div className="flex justify-between text-slate-300">
                <span>Valor Operacional dos Títulos:</span>
                <span className="font-mono">{formatCurrency(selectedOrderForNote.totalValue)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxa de Liquidação B3 (Simulador):</span>
                <span className="text-emerald-400">R$ 0,00 (Isento)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxa de Corretagem Bahia Capital:</span>
                <span className="text-emerald-400 font-bold">R$ 0,00 (Gratuito)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-white/[0.08] pt-2">
                <span>Total Líquido:</span>
                <span className="text-emerald-400 font-mono text-base">{formatCurrency(selectedOrderForNote.totalValue)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/30 text-xs text-cyan-200 flex items-start gap-2.5">
              <GraduationCap className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Aprendizado:</strong> Toda corretora emite essa nota para comprovar compra ou venda na B3 para apuração de IR.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrderForNote(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-xl"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
