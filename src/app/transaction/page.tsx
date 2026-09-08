'use client';
import { useState } from 'react';
import { BoltIcon } from '@heroicons/react/24/outline';
import { Terminal } from '../components/Terminal'; // Certifique-se que o caminho está correto

export default function TransactionPage() {
  const [intentInput, setIntentInput] = useState('');
  const [statusLogType, setStatusLogType] = useState('ready');

  const handleExecuteIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentInput) return;
    setStatusLogType('executing');
    
    setTimeout(() => {
      setStatusLogType('success_exec');
    }, 2000);
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h3 className="text-lg font-black text-white">Autonomous Intent & Transaction Execution</h3>
          <p className="text-xs text-slate-400 mt-1">Simulate and execute intent-based transactions securely on SVM.</p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Intent Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Swap 10 COOK securely with slippage protection',
              'Audit account allowances & revoke risky approvals',
              'Simulate high-yield staking via Cookie Chain SVM',
              'Transfer 50 COOK to whale.eth with pre-execution scan'
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setIntentInput(suggestion)}
                className="bg-[#090d18]/80 backdrop-blur-md hover:bg-[#0f1524] border border-slate-800/80 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-medium transition shadow-sm flex items-center gap-1.5"
              >
                <BoltIcon className="w-3.5 h-3.5 text-emerald-400" /> {suggestion}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleExecuteIntent} className="space-y-4 pt-2">
          <input 
            type="text" 
            value={intentInput}
            onChange={(e) => setIntentInput(e.target.value)}
            placeholder="Enter intent command or select a suggestion above..." 
            className="w-full bg-[#02050b]/90 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono shadow-inner"
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider"
          >
            Simulate & Execute Intent
          </button>
        </form>

        <Terminal statusLogType={statusLogType} />
      </div>
    </div>
  );
}