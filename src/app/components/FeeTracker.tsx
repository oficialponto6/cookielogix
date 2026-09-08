'use client';
import { BoltIcon } from '@heroicons/react/24/outline';

export function FeeTracker() {
  return (
    <div className="hidden sm:flex items-center gap-2 bg-[#080c16]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800/80 text-[11px] font-mono text-slate-300 shadow-inner">
      <BoltIcon className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      <span>SVM Fee: <strong className="text-emerald-400">0.000005 SOL</strong> (~$0.0001)</span>
    </div>
  );
}