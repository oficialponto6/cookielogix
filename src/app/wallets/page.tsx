'use client';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext'; // <- Importando o contexto

export default function WalletsPage() {
  const { walletAddress, balance, connectWallet } = useWallet();

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black text-white">Connected Wallets & Assets</h3>
            <p className="text-xs text-slate-400 mt-1">Manage multiple SVM & EVM identities under CookieLogix Due Diligence.</p>
          </div>
          <button 
            onClick={connectWallet}
            className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg"
          >
            {walletAddress ? 'Reconnect Nightly' : 'Connect New Wallet'}
          </button>
        </div>

        <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex justify-between items-center shadow-inner">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BriefcaseIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-white">
                {walletAddress ? walletAddress : 'Not connected'}
              </p>
              <span className="text-[11px] text-slate-400">
                {balance !== null ? `Balance: ${balance} SOL` : 'Nightly / Solana SVM Provider'}
              </span>
            </div>
          </div>
          <span className={`text-xs px-4 py-1.5 rounded-xl font-bold ${walletAddress ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
            {walletAddress ? 'Active' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
}