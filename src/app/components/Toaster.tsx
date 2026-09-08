'use client';
import { useEffect } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface ToastMessage {
  id: number;
  type: 'success' | 'warning' | 'error';
  message: string;
}

interface ToasterProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

export function Toaster({ toasts, removeToast }: ToasterProps) {
  return (
    <div className="fixed top-24 right-8 z-50 space-y-3 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }: { toast: ToastMessage; removeToast: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl backdrop-blur-3xl border shadow-2xl animate-fade-in ${
      toast.type === 'success' ? 'bg-[#050810]/90 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10' :
      toast.type === 'warning' ? 'bg-[#050810]/90 border-amber-500/40 text-amber-300 shadow-amber-500/10' :
      'bg-[#050810]/90 border-red-500/40 text-red-300 shadow-red-500/10'
    }`}>
      <div className="flex items-center gap-3">
        {toast.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0" />}
        {toast.type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 shrink-0" />}
        {toast.type === 'error' && <ExclamationTriangleIcon className="w-5 h-5 text-red-400 shrink-0" />}
        <p className="text-xs font-semibold tracking-wide text-white">{toast.message}</p>
      </div>
      <button 
        onClick={() => removeToast(toast.id)}
        className="text-slate-400 hover:text-white transition p-1 rounded-lg"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}