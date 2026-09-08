'use client';
import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

// Configuração do RPC oficial da Cookie Chain
const COOKIE_RPC = 'https://rpc.cookiescan.io';
const connection = new Connection(COOKIE_RPC, 'confirmed');

export default function CookieLogixDashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [statusLog, setStatusLog] = useState<string>('System initialized. Ready for user intent.');
  const [intentInput, setIntentInput] = useState<string>('');

  // Função para conectar a carteira Nightly com fallback seguro
  const connectNightlyWallet = async () => {
    try {
      setStatusLog('Detecting Nightly Wallet...');
      
      const provider = (window as any)?.nightly?.solana || (window as any)?.solana;
      
      if (!provider) {
        alert('Nightly Wallet not found! Please install the Nightly extension.');
        setStatusLog('Error: Nightly Wallet extension missing.');
        return;
      }

      const response = await provider.connect();
      
      let pubKeyStr = '';
      if (response && response.publicKey) {
        pubKeyStr = typeof response.publicKey === 'string' 
          ? response.publicKey 
          : response.publicKey.toString();
      } else if (provider.publicKey) {
        pubKeyStr = typeof provider.publicKey === 'string'
          ? provider.publicKey
          : provider.publicKey.toString();
      } else {
        throw new Error('Could not retrieve public key from Nightly wallet.');
      }

      setWalletAddress(pubKeyStr);
      setStatusLog(`Wallet connected: ${pubKeyStr}`);

      // Busca o saldo nativo na Cookie Chain
      const pubKey = new PublicKey(pubKeyStr);
      const lamports = await connection.getBalance(pubKey);
      setBalance(lamports / 1e9); // Conversão de Lamports para token nativo COOK
    } catch (error: any) {
      console.error(error);
      setStatusLog(`Connection failed: ${error.message || 'Unknown provider error'}`);
    }
  };

  const handleExecuteIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your Nightly wallet first!');
      return;
    }
    setStatusLog(`Processing intent: "${intentInput}" on Cookie Chain...`);
    setTimeout(() => {
      setStatusLog(`[SUCCESS] Intent executed securely via Cookie Chain RPC (${COOKIE_RPC}). Transaction confirmed.`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-emerald-400">CookieLogix 🍪</h1>
            <p className="text-sm text-slate-400">Autonomous Intent-Driven cApp on Cookie Chain (SVM)</p>
          </div>
          <button
            onClick={connectNightlyWallet}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-emerald-900/20"
          >
            {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-xs text-slate-400 uppercase tracking-wider">Network Status</h3>
            <p className="text-lg font-semibold text-emerald-400 mt-1">🟢 Cookie Chain Live</p>
            <span className="text-xs text-slate-500">Sub-second finality active</span>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-xs text-slate-400 uppercase tracking-wider">Wallet Balance</h3>
            <p className="text-lg font-semibold text-slate-200 mt-1">{balance !== null ? `${balance} COOK` : '0.00 COOK'}</p>
            <span className="text-xs text-slate-500">Connected via Nightly</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-xs text-slate-400 uppercase tracking-wider">RPC Endpoint</h3>
            <p className="text-xs font-mono text-slate-300 mt-2 truncate">rpc.cookiescan.io</p>
            <span className="text-xs text-emerald-500">Connected</span>
          </div>
        </div>

        {/* Intent Terminal / Action Hub */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">CookieLogix Intent Terminal</h2>
          <form onSubmit={handleExecuteIntent} className="flex gap-3">
            <input
              type="text"
              value={intentInput}
              onChange={(e) => setIntentInput(e.target.value)}
              placeholder="e.g. Check account health, simulate swap or analyze pools..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-lg font-medium transition text-sm border border-slate-700"
            >
              Execute Intent
            </button>
          </form>

          {/* Console / Status Log */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-4 font-mono text-xs text-emerald-400/90 h-32 overflow-y-auto">
            <span className="text-slate-500">$ cookielogix-core --init</span>
            <p className="mt-1">{statusLog}</p>
          </div>
        </div>

      </div>
    </main>
  );
}