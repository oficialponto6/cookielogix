'use client';
import { useState } from 'react';

export default function WatchlistPage() {
  const [watchlistItems, setWatchlistItems] = useState<string[]>(['0x742d35...9c4f8a', '0x8f3a21...4b7e9d']);
  const [newWatchAddress, setNewWatchAddress] = useState<string>('');

  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWatchAddress) return;
    setWatchlistItems([newWatchAddress, ...watchlistItems]);
    setNewWatchAddress('');
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h3 className="text-lg font-black text-white">Target Watchlist</h3>
          <p className="text-xs text-slate-400 mt-1">Monitored high-risk addresses and smart contracts.</p>
        </div>

        <form onSubmit={handleAddToWatchlist} className="flex gap-3">
          <input
            type="text"
            value={newWatchAddress}
            onChange={(e) => setNewWatchAddress(e.target.value)}
            placeholder="Enter address to watch (e.g. 0x...)"
            className="flex-1 bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg"
          >
            Add to Watchlist
          </button>
        </form>

        <div className="space-y-3 pt-2">
          {watchlistItems.map((addr, index) => (
            <div key={index} className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl flex justify-between items-center shadow-inner font-mono">
              <span className="text-xs text-white">{addr}</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Monitored</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}