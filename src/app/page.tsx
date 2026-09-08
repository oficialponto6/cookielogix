'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const [bootStep, setBootStep] = useState(0);
  const router = useRouter();

  const bootLogs = [
    "Establishing secure socket to rpc.cookiescan.io...",
    "Loading Webacy & DD.xyz threat intelligence heuristics...",
    "Verifying Solana Virtual Machine (SVM) state proofs...",
    "Kernel synchronized successfully. Entering Dashboard..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBootStep((prev) => {
        if (prev < bootLogs.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            router.push('/dashboard');
          }, 800);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-[#02050b] flex flex-col items-center justify-center z-50 overflow-hidden font-sans px-4">
      <div className="absolute inset-0 bg-[url('/cookielogix-bg.jpg')] bg-cover bg-center opacity-40 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full space-y-8 text-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
          <div className="relative h-48 w-48 flex items-center justify-center p-2">
            <img 
              src="/cookie-logo.png" 
              alt="CookieLogix Logo" 
              className="h-full w-full object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-bold text-emerald-400 tracking-[0.25em] uppercase">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Autonomous SVM Security
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-emerald-400 uppercase">
            CookieLogix
          </h1>
          <p className="text-xs text-slate-400 font-mono tracking-wide">
            Next-Gen Web3 Intent & Due Diligence Engine
          </p>
        </div>

        <div className="w-full bg-[#060a14]/90 backdrop-blur-2xl border border-slate-800/80 p-5 rounded-2xl text-left font-mono text-[11px] space-y-2 shadow-2xl relative overflow-hidden">
          <div className="space-y-1.5 pt-1">
            {bootLogs.slice(0, bootStep + 1).map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span className={idx === bootStep && idx < bootLogs.length - 1 ? 'text-slate-200 animate-pulse' : 'text-slate-400'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}