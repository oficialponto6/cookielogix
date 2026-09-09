'use client';
import { useState } from 'react';
import { Cog6ToothIcon, ShieldCheckIcon, ServerIcon, BoltIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [priorityFee, setPriorityFee] = useState<'normal' | 'turbo' | 'aggressive'>('turbo');
  const [autoFirewall, setAutoFirewall] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12 space-y-6">
      
      {/* Header / Banner de Configurações */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            <Cog6ToothIcon className="w-3.5 h-3.5" /> Kernel Preferences
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1.5">
            Kernel Settings & Parameters
          </h1>
        </div>
        <div className="text-right font-mono text-xs text-slate-400 space-y-0.5">
          <div>Engine: Webacy & DD.xyz</div>
          <div className="text-emerald-400 font-bold">Status: Synchronized</div>
        </div>
      </div>

      {/* Container Principal */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Network & Security Configurations</h3>
          <p className="text-xs text-slate-400 mt-0.5">Configure RPC endpoints, priority fee thresholds, and automated firewall rules.</p>
        </div>

        {/* Bloco 1: RPC Endpoint */}
        <div className="space-y-4 bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-inner">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ServerIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Cookie Chain RPC Endpoint</p>
                <span className="text-[11px] text-slate-400 font-mono">https://rpc.cookiescan.io</span>
              </div>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-4 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Connected
            </span>
          </div>
        </div>

        {/* Bloco 2: Priority Fee Presets */}
        <div className="space-y-4 bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-inner">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <BoltIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">SVM Priority Fee Level</p>
              <span className="text-[11px] text-slate-400">Select micro-lamport prioritization for rapid transaction finality.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'normal', label: 'Normal (0.00001 SOL)' },
              { id: 'turbo', label: 'Turbo (0.00005 SOL)' },
              { id: 'aggressive', label: 'Aggressive (0.0001 SOL)' }
            ].map((fee) => (
              <button
                key={fee.id}
                type="button"
                onClick={() => setPriorityFee(fee.id as any)}
                className={`p-3.5 rounded-xl text-xs font-bold transition text-left cursor-pointer border ${priorityFee === fee.id ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10' : 'bg-[#060a14] text-slate-400 border-slate-800 hover:text-white'}`}
              >
                {fee.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bloco 3: Automated Firewall Toggle */}
        <div className="space-y-4 bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-inner flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Autonomous Firewall Protection</p>
              <span className="text-[11px] text-slate-400">Automatically intercept malicious drainer signatures before signing.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAutoFirewall(!autoFirewall)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${autoFirewall ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
          >
            {autoFirewall ? 'Enabled (Active)' : 'Disabled'}
          </button>
        </div>

        {/* Botão de Salvar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 animate-fade-in">
              <CheckCircleIcon className="w-4 h-4" /> Preferences saved successfully!
            </span>
          )}
          <button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-6 py-3 rounded-2xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider cursor-pointer"
          >
            Save Kernel Preferences
          </button>
        </div>

      </div>
    </div>
  );
}