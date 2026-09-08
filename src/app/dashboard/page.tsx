'use client';
import { useState } from 'react';
import { MagnifyingGlassIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, BellAlertIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full animate-fade-in">
      
      {/* Banner Superior com Pulse LED */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="absolute top-4 right-6 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">RPC Telemetry Active</span>
        </div>

        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            🛡️ Webacy & DD.xyz Accelerator Engine
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Autonomous Intent & Due Diligence Security Kernel
          </h1>
        </div>
        <p className="text-xs text-slate-400 max-w-xs text-center md:text-right leading-relaxed font-mono">
          SVM Mainnet Active • Zero Vulnerabilities Reported
        </p>
      </div>

      {/* Grid Superior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Selected Wallet: <span className="text-white font-mono">0xAb57...04c5</span> <span className="text-emerald-400 font-mono">(whale.eth)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#090d18]/80 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Scans</span>
                <p className="text-2xl font-mono font-black text-white mt-1">1,234 <span className="text-xs text-emerald-400 font-normal">times</span></p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-[#090d18]/80 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner">
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

        {/* Card de Score com Live Pulse */}
        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl flex flex-col justify-between shadow-2xl relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Score</span>
            </div>
            <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">MEDIUM RISK</span>
          </div>
          
          <div className="flex flex-col items-center justify-center my-2">
            <div className="h-28 w-28 rounded-full border-4 border-slate-800 border-t-emerald-500 border-r-teal-400 flex items-center justify-center shadow-inner relative bg-[#090d18]/90">
              <div className="text-3xl font-mono font-black text-white">45</div>
            </div>
            <span className="text-[10px] text-slate-400 mt-3 uppercase tracking-wider font-mono">Normalized scale (0 - 100)</span>
          </div>

          <p className="text-[11px] text-slate-300 text-center leading-relaxed">
            This wallet shows moderate heuristic exposure. Review risk breakdown below.
          </p>
        </div>
      </div>

      {/* Grid Inferior (Risk Breakdown com Tooltips Interativos & Live Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Risk Breakdown (Interactive Diagnostics)</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Hover over each pillar to inspect Webacy heuristic micro-data</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400">Live Heuristics</span>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            
            {/* Pilar 1: Known Flag */}
            <div 
              className="space-y-1.5 relative group cursor-pointer bg-[#090d18]/40 p-3 rounded-2xl border border-slate-800/40 hover:border-emerald-500/30 transition"
              onMouseEnter={() => setActiveTooltip('flag')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  Known Flag <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-slate-500" />
                </span>
                <span className="text-emerald-400 font-mono font-bold">60%</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30" />
                ))}
                {[6, 7, 8].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                ))}
              </div>
              {activeTooltip === 'flag' && (
                <div className="absolute left-0 -top-12 bg-slate-950 border border-emerald-500/40 text-[11px] text-slate-200 p-2.5 rounded-xl shadow-2xl z-20 whitespace-nowrap animate-fade-in">
                  🛡️ <strong className="text-emerald-400">Known Flag (60%):</strong> 0 OFAC sanctions detected, 2 minor spam protocol flags.
                </div>
              )}
            </div>

            {/* Pilar 2: Behavior Analysis */}
            <div 
              className="space-y-1.5 relative group cursor-pointer bg-[#090d18]/40 p-3 rounded-2xl border border-slate-800/40 hover:border-emerald-500/30 transition"
              onMouseEnter={() => setActiveTooltip('behavior')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  Behavior Analysis <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-slate-500" />
                </span>
                <span className="text-emerald-400 font-mono font-bold">20%</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {[1, 2].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30" />
                ))}
                {[3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                ))}
              </div>
              {activeTooltip === 'behavior' && (
                <div className="absolute left-0 -top-12 bg-slate-950 border border-emerald-500/40 text-[11px] text-slate-200 p-2.5 rounded-xl shadow-2xl z-20 whitespace-nowrap animate-fade-in">
                  ⚡ <strong className="text-emerald-400">Behavior Analysis (20%):</strong> Outbound frequency normal, zero drainer-like signature broadcasts.
                </div>
              )}
            </div>

            {/* Pilar 3: Counterparty Risk */}
            <div 
              className="space-y-1.5 relative group cursor-pointer bg-[#090d18]/40 p-3 rounded-2xl border border-slate-800/40 hover:border-emerald-500/30 transition"
              onMouseEnter={() => setActiveTooltip('counterparty')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  Counterparty Risk <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-slate-500" />
                </span>
                <span className="text-emerald-400 font-mono font-bold">15%</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {[1].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 shadow-md shadow-emerald-500/30" />
                ))}
                {[2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                ))}
              </div>
              {activeTooltip === 'counterparty' && (
                <div className="absolute left-0 -top-12 bg-slate-950 border border-emerald-500/40 text-[11px] text-slate-200 p-2.5 rounded-xl shadow-2xl z-20 whitespace-nowrap animate-fade-in">
                  🌐 <strong className="text-emerald-400">Counterparty Risk (15%):</strong> Interacted with verified DEX protocols (Cookieswap).
                </div>
              )}
            </div>

            {/* Pilar 4: Contract Integrity */}
            <div 
              className="space-y-1.5 relative group cursor-pointer bg-[#090d18]/40 p-3 rounded-2xl border border-slate-800/40 hover:border-emerald-500/30 transition"
              onMouseEnter={() => setActiveTooltip('integrity')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  Contract Integrity <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-slate-500" />
                </span>
                <span className="text-emerald-400 font-mono font-bold">5%</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                <div className="h-3 rounded-full bg-emerald-500/50 border border-emerald-500/30" />
                {[2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                ))}
              </div>
              {activeTooltip === 'integrity' && (
                <div className="absolute left-0 -top-12 bg-slate-950 border border-emerald-500/40 text-[11px] text-slate-200 p-2.5 rounded-xl shadow-2xl z-20 whitespace-nowrap animate-fade-in">
                  🔒 <strong className="text-emerald-400">Contract Integrity (5%):</strong> Mint authority revoked, LP locked securely on SVM.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Live Alerts Feed */}
        <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BellAlertIcon className="w-4 h-4 text-emerald-400" /> Live Alerts Feed
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Real-time web3 transaction intelligence logs.</p>
          </div>

          <div className="space-y-3">
            <div className="bg-[#090d18]/80 border border-red-500/30 bg-red-500/5 p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] px-2.5 py-0.5 rounded-md font-bold border bg-red-500/10 text-red-400 border-red-500/20">Critical Alert</span>
                <span className="text-[10px] text-slate-500 font-mono">10 mins ago</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-snug">Suspicious allowance detected on contract 0x99a...4b1</p>
            </div>

            <div className="bg-[#090d18]/80 border border-slate-800/80 p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] px-2.5 py-0.5 rounded-md font-bold border bg-amber-500/10 text-amber-400 border-amber-500/20">Warning</span>
                <span className="text-[10px] text-slate-500 font-mono">25 mins ago</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-snug">Unusual outbound frequency on secondary router</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}