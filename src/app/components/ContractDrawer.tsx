'use client';
import { ShieldCheckIcon, ExclamationTriangleIcon, XMarkIcon, CpuChipIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface ContractDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: {
    address: string;
    name: string;
    riskScore: number;
    mintAuthority: boolean;
    freezeAuthority: boolean;
    lpLocked: boolean;
  } | null;
}

export function ContractDrawer({ isOpen, onClose, contractData }: ContractDrawerProps) {
  if (!isOpen || !contractData) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#050810]/95 backdrop-blur-3xl border-l border-slate-800/80 p-8 flex flex-col justify-between shadow-2xl relative overflow-y-auto">
        
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <CpuChipIcon className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Contract X-Ray</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 transition"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Address</span>
            <p className="text-xs font-mono text-emerald-400 bg-[#080c16] p-3 rounded-xl border border-slate-800 break-all">
              {contractData.address}
            </p>
          </div>

          <div className="bg-[#080c16]/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400">Heuristic Risk Score</span>
              <span className={`text-xs font-black px-3 py-1 rounded-xl border ${contractData.riskScore > 50 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                {contractData.riskScore > 50 ? 'HIGH RISK' : 'SECURE'}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div 
                className={`h-full ${contractData.riskScore > 50 ? 'bg-red-500' : 'bg-emerald-400'}`} 
                style={{ width: `${contractData.riskScore}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security Parameters</h4>
            
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080c16] border border-slate-800 text-xs">
              <span className="text-slate-300">Mint Authority</span>
              <span className={contractData.mintAuthority ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {contractData.mintAuthority ? 'Enabled (Risky)' : 'Disabled (Safe)'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080c16] border border-slate-800 text-xs">
              <span className="text-slate-300">Freeze Authority</span>
              <span className={contractData.freezeAuthority ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {contractData.freezeAuthority ? 'Active' : 'Revoked'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080c16] border border-slate-800 text-xs">
              <span className="text-slate-300">Liquidity Pool Locked</span>
              <span className={contractData.lpLocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {contractData.lpLocked ? '100% Locked' : 'Unlocked'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 py-3 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}