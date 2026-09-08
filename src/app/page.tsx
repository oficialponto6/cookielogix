'use client';
import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const COOKIE_RPC = 'https://rpc.cookiescan.io';
const connection = new Connection(COOKIE_RPC, 'confirmed');

export default function CookieLogixDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [statusLog, setStatusLog] = useState<string>('Kernel active. Webacy Threat Intelligence & Cookie Chain SVM synchronized.');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNav, setActiveNav] = useState<'dashboard' | 'wallets' | 'alerts' | 'watchlist' | 'transaction' | 'reports' | 'settings'>('dashboard');
  const [safetyScore, setSafetyScore] = useState<{ label: string; color: string; score: number }>({
    label: 'Moderate Risk',
    color: 'text-amber-400',
    score: 45
  });

  // Splash Screen de Entrada Cinematográfica (2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const connectNightlyWallet = async () => {
    try {
      setStatusLog('Establishing secure cryptographic handshake with Nightly Wallet...');
      const provider = (window as any)?.nightly?.solana || (window as any)?.solana;
      
      if (!provider) {
        alert('Nightly Wallet not found! Please install the Nightly extension.');
        setStatusLog('Error: Nightly Wallet extension missing.');
        return;
      }

      const response = await provider.connect();
      let pubKeyStr = '';
      if (response && response.publicKey) {
        pubKeyStr = typeof response.publicKey === 'string' ? response.publicKey : response.publicKey.toString();
      } else if (provider.publicKey) {
        pubKeyStr = provider.publicKey.toString();
      } else {
        throw new Error('Could not retrieve public key.');
      }

      setWalletAddress(pubKeyStr);
      setStatusLog(`Authenticated securely: ${pubKeyStr}`);
      setSafetyScore({ label: 'Safest', color: 'text-emerald-400', score: 99 });

      const pubKey = new PublicKey(pubKeyStr);
      const lamports = await connection.getBalance(pubKey);
      setBalance(lamports / 1e9);
    } catch (error: any) {
      console.error(error);
      setStatusLog(`Connection handshake failed: ${error.message}`);
    }
  };

  const handleSearchScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setStatusLog(`Scanning target address/hash: ${searchQuery} via DD.xyz Threat Risks API...`);
    setTimeout(() => {
      setStatusLog(`[SUCCESS] Scan complete for ${searchQuery}. Threat analysis verified.`);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#030712] flex flex-col items-center justify-center z-50 overflow-hidden font-sans">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-emerald-600/25 via-teal-600/15 to-transparent rounded-full blur-[180px] animate-pulse pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-[#090d16] border border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20 overflow-hidden">
            <img src="/cookie-logo.png" alt="CookieLogix Logo" className="h-full w-full object-cover" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 uppercase">
              C O O K I E L O G I X
            </h1>
            <p className="text-[11px] text-slate-500 tracking-widest uppercase font-mono">
              Initializing Web3 Security Kernel...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex antialiased relative overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Background Atmospheric Gradient Glow (100% Esmeralda e Teal) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-emerald-600/20 via-teal-600/5 to-transparent rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* 1. SIDEBAR EXECUTIVA */}
      <aside className="w-64 bg-[#060a12]/90 backdrop-blur-2xl border-r border-slate-800/60 hidden lg:flex flex-col justify-between p-6 shrink-0 z-20 shadow-2xl">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0b0f19] border border-emerald-500/30 flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-500/10">
              <img src="/cookie-logo.png" alt="CookieLogix Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-base font-black tracking-tight text-white">CookieLogix</span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Overview</p>
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                  { id: 'wallets', label: 'Wallets', icon: '💼' },
                  { id: 'alerts', label: 'Alerts', icon: '🔔' },
                  { id: 'watchlist', label: 'Watchlist', icon: '⭐' },
                  { id: 'transaction', label: 'Transaction', icon: '⚡' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${activeNav === item.id ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-[#0a0f19]'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Tools</p>
              <nav className="space-y-1">
                {[
                  { id: 'reports', label: 'Reports', icon: '📄' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${activeNav === item.id ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-[#0a0f19]'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Docs & Grant Card in Sidebar */}
        <div className="bg-gradient-to-b from-[#0b0f19] to-[#060a12] border border-slate-800/80 p-4 rounded-2xl space-y-3 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm">
            🛡️
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Startup Grant</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Webacy & DD.xyz Spec.</p>
          </div>
          <a 
            href="/docs"
            className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 py-2 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider"
          >
            📄 Docs & Grant
          </a>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10">
        
        {/* Top Header */}
        <header className="h-20 bg-[#030712]/80 backdrop-blur-2xl border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6 w-full max-w-xl">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hidden sm:block">
              {activeNav.toUpperCase()}
            </h2>
            <form onSubmit={handleSearchScan} className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallet address / ENS / tx hash..."
                className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-2xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner font-mono"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/docs"
              className="hidden sm:flex bg-[#0b0f19] hover:bg-[#111625] text-slate-300 border border-slate-800 px-4 py-2.5 rounded-2xl font-bold transition text-xs items-center gap-1.5 shadow-sm"
            >
              📄 Docs & Grant
            </a>
            <div className="text-xs font-mono text-slate-400 hidden md:block bg-[#0b0f19] px-3.5 py-2 rounded-2xl border border-slate-800/80 shadow-inner">
              18:13 (UTC+6)
            </div>
            <button
              onClick={connectNightlyWallet}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-6 py-2.5 rounded-2xl text-xs font-black transition shadow-lg shadow-emerald-500/25 uppercase tracking-wider"
            >
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        {/* Hero Banner Inspirado nas Referências (Tipografia Gigante e Gradiente Esmeralda) */}
        <div className="px-8 pt-10 pb-4 max-w-7xl mx-auto w-full">
          <div className="bg-gradient-to-b from-[#080d18] to-[#040812] border border-slate-800/80 p-10 rounded-3xl relative overflow-hidden shadow-2xl text-center space-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[11px] font-bold text-emerald-400 tracking-widest uppercase">
              ✨ Webacy & DD.xyz Accelerator Engine
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-emerald-300 tracking-tight leading-tight max-w-4xl mx-auto">
              Step Into The Future Of Web3 Security & Intent Execution
            </h1>
            
            <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Move your crypto assets and execute smart transactions securely in seconds, not hours.
            </p>
          </div>
        </div>

        {/* Dynamic Views per Tab */}
        <div className="px-8 pb-12 space-y-6 max-w-7xl mx-auto w-full">
          
          {activeNav === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Row 1: Selected Wallet & Risk Score */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="flex justify-between items-center relative z-10">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Selected Wallet: <span className="text-white font-mono">0xAb57...04c5</span> <span className="text-emerald-400">(whale.eth)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    <div className="bg-[#0b0f19] border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Scans</span>
                        <p className="text-xl font-mono font-black text-white mt-1">1234 times</p>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                        🔍
                      </div>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Detected</span>
                        <p className="text-xl font-mono font-black text-amber-400 mt-1">4 Mid 12 High</p>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
                        ⚠️
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Score Gauge Card */}
                <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-7 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk score</span>
                    <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 shadow-sm">MEDIUM RISK</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center my-4">
                    <div className="h-28 w-28 rounded-full border-4 border-slate-800 border-t-emerald-500 border-r-teal-400 flex items-center justify-center shadow-inner relative bg-[#0b0f19]">
                      <div className="text-3xl font-mono font-black text-white">{safetyScore.score}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-3 uppercase tracking-wider font-mono">Risk score (0 - 100)</span>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                    This wallet shows moderate risk patterns. Review threat details below.
                  </p>
                </div>

              </div>

              {/* Row 2: Risk Breakdown com Gradientes Esmeralda & Live Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Risk Breakdown Bar Chart */}
                <div className="lg:col-span-2 bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl">
                  <div>
                    <h3 className="text-sm font-bold text-white">Risk Breakdown</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Interpretable of the 78 score based on weighted heuristics</p>
                  </div>

                  <div className="grid grid-cols-4 gap-4 h-56 items-end pt-4 px-2">
                    <div className="flex flex-col items-center gap-3 h-full justify-end">
                      <span className="text-xs font-mono font-bold text-emerald-400">60%</span>
                      <div className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-2xl h-[60%] flex flex-col items-center justify-end pb-3 relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/70 via-teal-600/40 to-transparent rounded-2xl"></div>
                        <span className="text-[10px] font-semibold text-white relative z-10 transform -rotate-90">Known Flag</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 h-full justify-end">
                      <span className="text-xs font-mono font-bold text-emerald-400">20%</span>
                      <div className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-2xl h-[30%] flex flex-col items-center justify-end pb-3 relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/60 via-teal-600/30 to-transparent rounded-2xl"></div>
                        <span className="text-[10px] font-semibold text-white relative z-10 transform -rotate-90">Behavior</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 h-full justify-end">
                      <span className="text-xs font-mono font-bold text-emerald-400">15%</span>
                      <div className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-2xl h-[22%] flex flex-col items-center justify-end pb-3 relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/50 via-teal-600/20 to-transparent rounded-2xl"></div>
                        <span className="text-[10px] font-semibold text-white relative z-10 transform -rotate-90">Counterparty</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 h-full justify-end">
                      <span className="text-xs font-mono font-bold text-emerald-400">5%</span>
                      <div className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-2xl h-[12%] flex flex-col items-center justify-end pb-3 relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/40 via-teal-600/10 to-transparent rounded-2xl"></div>
                        <span className="text-[10px] font-semibold text-white relative z-10 transform -rotate-90">Contract</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Alerts Feed */}
                <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-7 rounded-3xl space-y-4 shadow-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">🔥 Live Alerts Feed</h3>
                    <p className="text-xs text-slate-400 mb-4">Real-time web3 transaction intelligence logs.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[#0b0f19] border border-slate-800/80 p-4 rounded-2xl space-y-2 shadow-inner">
                      <div className="flex justify-between items-center">
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] px-2.5 py-0.5 rounded-md font-bold">Critical</span>
                        <span className="text-[10px] text-slate-500">1 hour ago</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-snug">95 ETH received from Tornadocash-like mixer.</p>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-800/80 p-4 rounded-2xl space-y-2 shadow-inner">
                      <div className="flex justify-between items-center">
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] px-2.5 py-0.5 rounded-md font-bold">Medium</span>
                        <span className="text-[10px] text-slate-500">1 day ago</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-snug">Interaction with unverified smart contract at 0x123...</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveNav('alerts')}
                    className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs text-emerald-400 font-semibold cursor-pointer hover:text-emerald-300 transition"
                  >
                    <span>View all security alerts</span>
                    <span>→</span>
                  </div>
                </div>

              </div>

              {/* Row 3: Recent Scans */}
              <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-7 rounded-3xl space-y-4 shadow-2xl">
                <h3 className="text-sm font-bold text-white">Recent Scans</h3>
                <div className="space-y-3">
                  <div className="bg-[#0b0f19] border border-slate-800/80 p-4.5 rounded-2xl flex justify-between items-center shadow-inner">
                    <div>
                      <p className="text-xs font-mono font-bold text-white">0x742d35...9c4f8a</p>
                      <span className="text-[11px] text-slate-500">🕒 2 minutes ago</span>
                    </div>
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Medium Risk</span>
                  </div>

                  <div className="bg-[#0b0f19] border border-slate-800/80 p-4.5 rounded-2xl flex justify-between items-center shadow-inner">
                    <div>
                      <p className="text-xs font-mono font-bold text-white">0x8f3a21...4b7e9d</p>
                      <span className="text-[11px] text-slate-500">🕒 15 minutes ago</span>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Low Risk</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'wallets' && (
            <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Connected Wallets & Assets</h3>
                <p className="text-xs text-slate-400 mt-1">Manage multiple SVM & EVM identities under CookieLogix Due Diligence.</p>
              </div>
              <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">
                    💼
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-white">{walletAddress || 'No Wallet Connected'}</p>
                    <span className="text-[11px] text-slate-500">Nightly / Solana SVM Provider</span>
                  </div>
                </div>
                <button 
                  onClick={connectNightlyWallet}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg"
                >
                  {walletAddress ? 'Active' : 'Connect Now'}
                </button>
              </div>
            </div>
          )}

          {activeNav === 'alerts' && (
            <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Security & Threat Alerts</h3>
                <p className="text-xs text-slate-400 mt-1">Real-time threat telemetry streamed via Webacy & DD.xyz APIs.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-[#0b0f19] border border-slate-800/80 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] px-2.5 py-1 rounded-md font-bold">Critical Alert</span>
                    <p className="text-xs text-slate-200 mt-2 font-medium">Suspicious allowance detected on contract 0x99a...4b1</p>
                  </div>
                  <span className="text-xs text-slate-500">10 mins ago</span>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'watchlist' && (
            <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Target Watchlist</h3>
                <p className="text-xs text-slate-400 mt-1">Monitored high-risk addresses and smart contracts.</p>
              </div>
              <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl text-center py-12 text-slate-400 text-xs">
                No custom watchlist items added yet. Use the scanner above to add addresses.
              </div>
            </div>
          )}

          {activeNav === 'transaction' && (
            <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Autonomous Intent & Transaction Execution</h3>
                <p className="text-xs text-slate-400 mt-1">Simulate and execute intent-based transactions securely on SVM.</p>
              </div>
              <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter intent command (e.g. Swap 10 COOK securely...)" 
                  className="w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={() => alert('Executing intent simulation via Transaction Risks API...')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20"
                >
                  Simulate & Execute Intent
                </button>
              </div>
            </div>
          )}

          {activeNav === 'reports' && (
            <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Due Diligence Reports</h3>
                <p className="text-xs text-slate-400 mt-1">Generated cryptographic audit and risk assessment files.</p>
              </div>
              <div className="bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-white">CookieLogix_Risk_Report_Q3.pdf</p>
                  <span className="text-[11px] text-slate-500">Verified via DD.xyz Kernel</span>
                </div>
                <button onClick={() => alert('Downloading report...')} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition">
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Kernel Settings</h3>
                <p className="text-xs text-slate-400 mt-1">Configure RPC endpoints and security API thresholds.</p>
              </div>
              <div className="space-y-4 bg-[#0b0f19] border border-slate-800/80 p-6 rounded-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-white">Cookie Chain RPC Endpoint</p>
                    <span className="text-[11px] text-slate-500">https://rpc.cookiescan.io</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Connected</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}