'use client';
import { useState } from 'react';
import { PlusIcon, ShieldCheckIcon, BellAlertIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function AlertsPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'mid'>('all');
  const [alertsList, setAlertsList] = useState([
    { id: 1, type: 'Critical Alert', message: 'Suspicious allowance detected on contract 0x99a...4b1', time: '10 mins ago', severity: 'high', address: '0x99a4b1723e4590128c71' },
    { id: 2, type: 'Warning', message: 'Unusual outbound frequency on secondary router', time: '25 mins ago', severity: 'mid', address: '0x8f3a21b47e9d10293847' },
    { id: 3, type: 'Critical Alert', message: 'Unauthorized drainer signature attempt blocked on SVM', time: '1 hour ago', severity: 'high', address: '0x5c4d3e2f1a9b08765432' }
  ]);

  const handleAddAlert = () => {
    const newAlert = {
      id: Date.now(),
      type: 'Warning',
      message: 'New high-risk transaction monitored on Cookie Chain SVM.',
      time: 'Just now',
      severity: 'mid' as const,
      address: '0x4f5a6b7c8d9e01234567'
    };
    setAlertsList([newAlert, ...alertsList]);
  };

  const filteredAlerts = alertsList.filter(alert => {
    if (filter === 'high') return alert.severity === 'high';
    if (filter === 'mid') return alert.severity === 'mid';
    return true;
  });

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12 space-y-6">
      
      {/* Header / Banner de Alertas */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            <BellAlertIcon className="w-3.5 h-3.5" /> Real-Time Threat Telemetry
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1.5">
            Security & Threat Alerts
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAddAlert}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" /> Simulate New Alert
          </button>
        </div>
      </div>

      {/* Container Principal de Alertas */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        
        {/* Barra de Filtros e Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter Severity:</span>
            {(['all', 'high', 'mid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${filter === f ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#090d18] text-slate-400 border border-slate-800 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Streaming via Webacy & DD.xyz APIs</span>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No alerts found for this filter criteria.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner hover:border-emerald-500/40 transition group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold border uppercase tracking-wider ${alert.severity === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {alert.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Target: {alert.address}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">{alert.message}</p>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé Informativo */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300/90 leading-relaxed flex items-center gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block mb-0.5">Autonomous Threat Listener</span>
            Alerts are automatically triggered when the SVM firewall intercepts malicious interactions or abnormal transaction frequencies on <code className="font-mono text-emerald-200">rpc.cookiescan.io</code>.
          </div>
        </div>

      </div>
    </div>
  );
}