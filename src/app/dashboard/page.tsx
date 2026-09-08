'use client';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  BellAlertIcon,
  ArrowRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  const safetyScore = { label: 'Moderate Risk', color: 'text-amber-400', score: 45 };
  const alertsList = [
    { id: 1, type: 'Critical Alert', message: 'Suspicious allowance detected on contract 0x99a...4b1', time: '10 mins ago', severity: 'high' },
    { id: 2, type: 'Warning', message: 'Unusual outbound frequency on secondary router', time: '25 mins ago', severity: 'mid' }
  ];

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      {/* Hero Header */}
      <div className="bg-[#060a14]/75 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Webacy & DD.xyz Accelerator Engine
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Autonomous Intent & Due Diligence Security Kernel
          </h1>
        </div>
        <p className="text-xs text-slate-400 max-w-xs text-center md:text-right leading-relaxed font-mono">
          SVM Mainnet Active • Zero Vulnerabilities Reported
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden transition hover:border-emerald-500/30">
          <div className="flex justify-between items-center relative z-10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Selected Wallet: <span className="text-white font-mono">0xAb57...04c5</span> <span className="text-emerald-400 font-mono">(whale.eth)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner transition hover:bg-[#0c1220]">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Scans</span>
                <p className="text-2xl font-mono font-black text-white mt-1 tracking-tight">1,234 <span className="text-xs text-emerald-400 font-normal">times</span></p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner transition hover:bg-[#0c1220]">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Detected</span>
                <p className="text-xl font-mono font-black text-amber-400 mt-1">4 Mid <span className="text-slate-600">|</span> 12 High</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ExclamationTriangleIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden transition hover:border-emerald-500/30">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Score</span>
            <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 shadow-sm">MEDIUM RISK</span>
          </div>
          
          <div className="flex flex-col items-center justify-center my-2">
            <div className="h-28 w-28 rounded-full border-4 border-slate-800 border-t-emerald-500 border-r-teal-400 flex items-center justify-center shadow-inner relative bg-[#090d18]/90">
              <div className="text-3xl font-mono font-black text-white">{safetyScore.score}</div>
            </div>
            <span className="text-[10px] text-slate-400 mt-3 uppercase tracking-wider font-mono">Normalized scale (0 - 100)</span>
          </div>

          <p className="text-[11px] text-slate-300 text-center leading-relaxed">
            This wallet shows moderate heuristic exposure. Review risk breakdown below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Risk Breakdown</h3>
                <div className="relative">
                  <QuestionMarkCircleIcon 
                    className="w-4 h-4 text-slate-500 cursor-pointer hover:text-emerald-400 transition"
                    onMouseEnter={() => setActiveTooltip('risk')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  />
                  {activeTooltip === 'risk' && (
                    <div className="absolute left-0 bottom-6 bg-slate-950 border border-slate-700 text-[11px] text-slate-200 p-2.5 rounded-xl shadow-xl w-56 z-20">
                      Calculated via Webacy Exposure Risk API based on historical contract interactions.
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Interpretable analysis of the 78 score based on weighted heuristics</p>
            </div>
          </div>
          <div className="space-y-4 pt-2">
             {/* Progress bars - Simplificados para o exemplo */}
             <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300 font-semibold">Known Flag</span>
                  <span className="text-emerald-400 font-mono font-bold">60%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%]" />
                </div>
              </div>
          </div>
        </div>

        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <BellAlertIcon className="w-4 h-4 text-emerald-400" /> Live Alerts Feed
            </h3>
            <p className="text-xs text-slate-400 mb-4">Real-time web3 transaction intelligence logs.</p>
          </div>

          <div className="space-y-3">
            {alertsList.map((alert) => (
              <div 
                key={alert.id} 
                className={`bg-[#090d18]/80 backdrop-blur-md border p-4 rounded-2xl space-y-2 shadow-inner transition hover:translate-x-1 cursor-pointer ${alert.severity === 'high' ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800/80'}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] px-2.5 py-0.5 rounded-md font-bold border ${alert.severity === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{alert.type}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{alert.time}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-snug">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}