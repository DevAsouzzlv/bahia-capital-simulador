'use client';

import React from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function NotificationToast() {
  const { notification, setNotification } = useSimulator();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <aside 
      aria-label="Notificações do sistema"
      className="fixed bottom-5 right-5 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border ${
          isSuccess
            ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40'
            : isError
            ? 'bg-red-950/90 text-red-100 border-red-500/40'
            : 'bg-blue-950/90 text-blue-100 border-blue-500/40'
        } backdrop-blur-md`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
          {isError && <AlertCircle className="h-5 w-5 text-red-400" />}
          {!isSuccess && !isError && <Info className="h-5 w-5 text-blue-400" />}
        </div>
        <div className="text-sm leading-snug flex-1 font-medium">{notification.message}</div>
        <button
          onClick={() => setNotification(null)}
          className="flex-shrink-0 text-slate-400 hover:text-white p-1"
          aria-label="Fechar notificação"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
