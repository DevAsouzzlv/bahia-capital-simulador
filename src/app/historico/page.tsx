'use client';

import React, { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { Order, OrderType } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { 
  History, 
  Download, 
  FileText, 
  X, 
  CheckCircle2, 
  Filter, 
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
    link.setAttribute('download', `extrato_simulador_bahia_capital_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Histórico & Extrato de Ordens
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              {orders.length} Operações Registradas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Registro detalhado de todas as compras e vendas simuladas executadas na plataforma.
          </p>
        </div>

        {/* Action Button: Export CSV */}
        <button
          onClick={exportCSV}
          disabled={orders.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50 self-start sm:self-auto"
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === ft
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {ft === 'TODAS' ? 'Todas as Operações' : ft === 'COMPRA' ? 'Apenas Compras' : 'Apenas Vendas'}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Nenhuma operação encontrada para o filtro selecionado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3.5 pl-4">Data / Hora</th>
                  <th className="py-3.5">Ativo</th>
                  <th className="py-3.5">Tipo de Ordem</th>
                  <th className="py-3.5 text-right">Qtd</th>
                  <th className="py-3.5 text-right">Preço Unitário</th>
                  <th className="py-3.5 text-right">Valor Total</th>
                  <th className="py-3.5 text-center">Corretagem</th>
                  <th className="py-3.5 text-center">Status</th>
                  <th className="py-3.5 text-right pr-4">Nota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.map((ord) => {
                  const isBuy = ord.type === 'COMPRA';
                  return (
                    <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Data / Hora */}
                      <td className="py-3.5 pl-4 text-slate-400 font-mono text-[11px]">
                        {formatDate(ord.executedAt)}
                      </td>

                      {/* Ativo */}
                      <td className="py-3.5 font-bold text-white">
                        <div className="flex items-center gap-1.5">
                          <span>{ord.ticker}</span>
                          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                            ({ord.name})
                          </span>
                        </div>
                      </td>

                      {/* Tipo */}
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isBuy
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {isBuy ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                          <span>{ord.type}</span>
                        </span>
                      </td>

                      {/* Quantidade */}
                      <td className="py-3.5 text-right text-slate-200 font-medium">
                        {ord.quantity}
                      </td>

                      {/* Preço Unitário */}
                      <td className="py-3.5 text-right text-slate-300 font-mono">
                        {formatCurrency(ord.unitPrice)}
                      </td>

                      {/* Valor Total */}
                      <td className="py-3.5 text-right font-bold text-white font-mono">
                        {formatCurrency(ord.totalValue)}
                      </td>

                      {/* Corretagem */}
                      <td className="py-3.5 text-center">
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          R$ 0,00
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Executada</span>
                        </span>
                      </td>

                      {/* Nota de Corretagem Modal Trigger */}
                      <td className="py-3.5 text-right pr-4">
                        <button
                          onClick={() => setSelectedOrderForNote(ord)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Ver Nota de Corretagem Pedagógica"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-white space-y-4">
            
            <button
              onClick={() => setSelectedOrderForNote(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  Documento Didático Fiscal
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  Nota de Corretagem Simulada #{selectedOrderForNote.id.replace('ord_', '')}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-slate-400">Data de Execução:</div>
                <div className="font-medium text-white">{formatDate(selectedOrderForNote.executedAt)}</div>
              </div>
              <div>
                <div className="text-slate-400">Mercado / Liquidação:</div>
                <div className="font-medium text-white">B3 Brasil Bolsa Balcão (D+2 Simulado)</div>
              </div>
              <div>
                <div className="text-slate-400">Ativo Negociado:</div>
                <div className="font-bold text-blue-400">{selectedOrderForNote.ticker} - {selectedOrderForNote.name}</div>
              </div>
              <div>
                <div className="text-slate-400">Natureza da Operação:</div>
                <div className={`font-bold ${selectedOrderForNote.type === 'COMPRA' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedOrderForNote.type} ({selectedOrderForNote.quantity} unidades)
                </div>
              </div>
            </div>

            {/* Financial breakdown */}
            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-300">
                <span>Valor Operacional dos Títulos:</span>
                <span className="font-mono">{formatCurrency(selectedOrderForNote.totalValue)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxa de Liquidação B3 (Educativo):</span>
                <span className="text-emerald-400">R$ 0,00 (Isento no Simulador)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Emolumentos de Pregão:</span>
                <span className="text-emerald-400">R$ 0,00</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxa de Corretagem Bahia Capital:</span>
                <span className="text-emerald-400 font-bold">R$ 0,00 (100% Gratuito)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>I.R.R.F. Day Trade / Swing Trade:</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-slate-800 pt-2">
                <span>Total Líquido da Nota:</span>
                <span className="text-emerald-400 font-mono">{formatCurrency(selectedOrderForNote.totalValue)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex items-start gap-2">
              <GraduationCap className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Aprendizado:</strong> No mercado real, toda operação gera uma nota de corretagem com as taxas da B3 e emolumentos. Guarde sempre esses registros para sua declaração anual de Imposto de Renda.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrderForNote(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Fechar Nota
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
