'use client';
import { useState } from 'react';
import { StarIcon, TrashIcon, ArrowTopRightOnSquareIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function WatchlistPage() {
  const [watchlistItems, setWatchlistItems] = useState<Array<{ id: string; address: string; status: string; risk: 'safe' | 'warning' | 'danger' }>>([
    { id: '1', address: 'D34a75VHxHQHDixEdmh52SYzoaqJnQnys64GxjX3ZXKL', status: 'Live Sentinel', risk: 'safe' },
    { id: '2', address: '0x742d35...9c4f8a', status: 'Monitored', risk: 'safe' },
    { id: '3', address: '0x8f3a21...4b7e9d', status: 'High Risk Contract', risk: 'danger' }
  ]);
  const [newWatchAddress, setNewWatchAddress] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newWatchAddress.trim();
    if (!trimmed) return;

    // Validação básica sênior: endereço SVM/EVm precisa ter tamanho mínimo de segurança
    if (trimmed.length < 10) {
      setErrorMsg('Invalid address format. Must be a valid SVM/EVM public key.');
      return;
    }

    setErrorMsg(null);
    const newItem = {
      id: Date.now().toString(),
      address: trimmed,
      status: 'Live Sentinel',
      risk: trimmed.toLowerCase().includes('risk') ? ('danger' as const) : ('safe' as const)
    };

    setWatchlistItems([newItem, ...watchlistItems]);
    setNewWatchAddress('');
  };

  const handleRemoveItem = (id: string) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12 space-y-6">
      
      {/* Header / Banner da Watchlist */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            <StarIcon className="w-3.5 h-3.5" /> SVM Threat Intelligence
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1.5">
            Target Watchlist
          </h1>
        </div>
        <div className="text-right font-mono text-xs text-slate-400 space-y-0.5">
          <div>Active Sentinels: {watchlistItems.length}</div>
          <div className="text-emerald-400 font-bold">RPC: rpc.cookiescan.io</div>
        </div>
      </div>

      {/* Container Principal */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Monitored Addresses & Smart Contracts</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time tracking of high-risk entities across the Cookie Chain ecosystem.</p>
        </div>

        {/* Formulário de Adição */}
        <form onSubmit={handleAddToWatchlist} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newWatchAddress}
              onChange={(e) => { setNewWatchAddress(e.target.value); setErrorMsg(null); }}
              placeholder="Enter SVM address or contract hash (e.g. D34a75...)"
              className="flex-1 bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl px-5 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono shadow-inner placeholder:text-slate-600"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-6 py-3 rounded-2xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider cursor-pointer shrink-0"
            >
              Add to Watchlist
            </button>
          </div>
          {errorMsg && <p className="text-[11px] text-red-400 font-mono pl-2">{errorMsg}</p>}
        </form>

        {/* Lista de Alvos Monitorados */}
        <div className="space-y-3 pt-2">
          {watchlistItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No addresses currently under surveillance.
            </div>
          ) : (
            watchlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner hover:border-emerald-500/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <StarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-white tracking-wider block">{item.address}</span>
                    <span className="text-[10px] text-slate-400 font-mono">SVM Network • rpc.cookiescan.io</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`text-[10px] px-3 py-1 rounded-xl font-bold border uppercase tracking-wider ${item.risk === 'danger' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                    {item.status}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://cookiescan.io/address/${item.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on Explorer"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition cursor-pointer"
                    >
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove Target"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition cursor-pointer"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé Informativo */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300/90 leading-relaxed flex items-center gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block mb-0.5">Automated Risk Telemetry</span>
            Watchlist addresses are continuously scanned for unusual allowance changes and counterparty interactions via the Cookie Chain RPC.
          </div>
        </div>

      </div>
    </div>
  );
}