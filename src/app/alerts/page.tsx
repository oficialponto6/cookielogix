'use client';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AlertsPage() {
  const [alertsList, setAlertsList] = useState([
    { id: 1, type: 'Critical Alert', message: 'Suspicious allowance detected on contract 0x99a...4b1', time: '10 mins ago', severity: 'high', address: '0x99a4b1723e4590128c71' },
    { id: 2, type: 'Warning', message: 'Unusual outbound frequency on secondary router', time: '25 mins ago', severity: 'mid', address: '0x8f3a21b47e9d10293847' }
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

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black text-white">Security & Threat Alerts</h3>
            <p className="text-xs text-slate-400 mt-1">Real-time threat telemetry streamed via Webacy & DD.xyz APIs.</p>
          </div>
          <button 
            onClick={handleAddAlert}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition shadow-lg"
          >
            <PlusIcon className="w-4 h-4" /> Simulate New Alert
          </button>
        </div>

        <div className="space-y-4">
          {alertsList.map((alert) => (
            <div 
              key={alert.id} 
              className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex justify-between items-center shadow-inner cursor-pointer hover:border-emerald-500/40 transition"
            >
              <div>
                <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold border ${alert.severity === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{alert.type}</span>
                <p className="text-xs text-slate-200 mt-2 font-medium">{alert.message}</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}