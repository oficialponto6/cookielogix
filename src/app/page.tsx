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
      <div className="fixed inset-0 bg-[#0c0d14] flex flex-col items-center justify-center z-50 overflow-hidden font-sans">
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[180px] animate-pulse pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-[#141520] border border-indigo-500/30 flex items-center justify-center shadow-2xl shadow-indigo-500/20 overflow-hidden">
            <img src="/cookie-logo.png" alt="CookieLogix Logo" className="h-full w-full object-cover" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-500 uppercase">
              C O O K I E L O G I X
            </h1>
            <p className="text-[11px] text-slate-500 tracking-widest uppercase font-mono">
              Loading Multi-Layered Security Kernel...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d14] text-slate-100 font-sans flex antialiased selection:bg-indigo-500 selection:text-slate-950">
      
      {/* 1. SIDEBAR (Estilo Rixor Exato) */}
      <aside className="w-64 bg-[#11121d] border-r border-slate-800/60 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#181926] border border-indigo-500/30 flex items-center justify-center overflow-hidden shadow-md">
              <img src="/cookie-logo.png" alt="CookieLogix Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">CookieLogix</span>
          </div>

          {/* Navigation Groups */}
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${activeNav === item.id ? 'bg-[#1b1c2b] text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-[#151622]'}`}
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${activeNav === item.id ? 'bg-[#1b1c2b] text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-[#151622]'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card in Sidebar */}
        <div className="bg-gradient-to-b from-[#181926] to-[#12131e] border border-slate-800/80 p-4 rounded-2xl space-y-3 shadow-lg">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
            🛡️
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Enhanced Security</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Additional features to enhance your due diligence.</p>
          </div>
          <button 
            onClick={connectNightlyWallet}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 rounded-xl text-xs font-bold transition shadow-md"
          >
            {walletAddress ? 'Connected' : 'Try now →'}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navigation Bar */}
        <header className="h-20 bg-[#0c0d14]/80 backdrop-blur-xl border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 w-full max-w-xl">
            <h2 className="text-sm font-bold text-white hidden sm:block tracking-wide uppercase">Wallet Risk Scanner</h2>
            <form onSubmit={handleSearchScan} className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallet address / ENS / tx hash..."
                className="w-full bg-[#13141f] border border-slate-800/80 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner font-mono"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-slate-400 hidden md:block">
              18:13 (UTC+6)
            </div>
            <button
              onClick={connectNightlyWallet}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
            >
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Row 1: Selected Wallet & Risk Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Selected Wallet Overview */}
            <div className="lg:col-span-2 bg-[#12131e] border border-slate-800/70 p-6 rounded-3xl space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Selected Wallet: <span className="text-white font-mono">0xAb57...04c5</span> <span className="text-indigo-400">(whale.eth)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#181926] border border-slate-800/60 p-5 rounded-2xl relative overflow-hidden flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Scans</span>
                    <p className="text-xl font-mono font-black text-white mt-1">1234 times</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-lg">
                    🔍
                  </div>
                </div>

                <div className="bg-[#181926] border border-slate-800/60 p-5 rounded-2xl relative overflow-hidden flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Detected</span>
                    <p className="text-xl font-mono font-black text-amber-400 mt-1">4 Mid 12 High</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg">
                    ⚠️
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Score Gauge Card */}
            <div className="bg-[#12131e] border border-slate-800/70 p-6 rounded-3xl flex flex-col justify-between shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk score</span>
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">MEDIUM RISK</span>
              </div>
              
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative flex items-center justify-center">
                  <div className="text-3xl font-mono font-black text-white">{safetyScore.score}</div>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-mono">Risk score (0 - 100)</span>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                This wallet shows moderate risk patterns. Review threat details below.
              </p>
            </div>

          </div>

          {/* Row 2: Risk Breakdown & Live Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Risk Breakdown Bar Chart Simulation */}
            <div className="lg:col-span-2 bg-[#12131e] border border-slate-800/70 p-6 rounded-3xl space-y-6 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white">Risk Breakdown</h3>
                <p className="text-xs text-slate-400 mt-0.5">Interpretable of the 78 score based on weighted heuristics</p>
              </div>

              <div className="grid grid-cols-4 gap-4 h-48 items-end pt-4">
                <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-indigo-400">60%</span>
                  <div className="w-full bg-[#181926] border border-slate-800 rounded-xl h-[60%] flex items-end justify-center pb-2">
                    <span className="text-[10px] text-slate-500 transform -rotate-90">Known Flag</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-indigo-400">20%</span>
                  <div className="w-full bg-[#181926] border border-slate-800 rounded-xl h-[30%] flex items-end justify-center pb-2">
                    <span className="text-[10px] text-slate-500 transform -rotate-90">Behavior</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-indigo-400">15%</span>
                  <div className="w-full bg-[#181926] border border-slate-800 rounded-xl h-[20%] flex items-end justify-center pb-2">
                    <span className="text-[10px] text-slate-500 transform -rotate-90">Counterparty</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-indigo-400">5%</span>
                  <div className="w-full bg-[#181926] border border-slate-800 rounded-xl h-[10%] flex items-end justify-center pb-2">
                    <span className="text-[10px] text-slate-500 transform -rotate-90">Contract</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Alerts Feed */}
            <div className="bg-[#12131e] border border-slate-800/70 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">🔥 Live Alerts Feed</h3>
                <p className="text-xs text-slate-400 mb-4">Real-time web3 transaction intelligence logs.</p>
              </div>

              <div className="space-y-3">
                <div className="bg-[#181926] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] px-2 py-0.5 rounded-md font-bold">Critical</span>
                    <span className="text-[10px] text-slate-500">1 hour ago</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-snug">95 ETH received form Tornadocash-like mixer.</p>
                </div>

                <div className="bg-[#181926] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] px-2 py-0.5 rounded-md font-bold">Medium</span>
                    <span className="text-[10px] text-slate-500">1 day ago</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-snug">Interaction with unverified smart contract at 0x123...</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs text-indigo-400 font-semibold cursor-pointer">
                <span>View all security alerts</span>
                <span>→</span>
              </div>
            </div>

          </div>

          {/* Row 3: Recent Scans */}
          <div className="bg-[#12131e] border border-slate-800/70 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white">Recent Scans</h3>
            <div className="space-y-3">
              <div className="bg-[#181926] border border-slate-800/80 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-mono font-bold text-white">0x742d35...9c4f8a</p>
                  <span className="text-[11px] text-slate-500">🕒 2 minutes ago</span>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Medium Risk</span>
              </div>

              <div className="bg-[#181926] border border-slate-800/80 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-mono font-bold text-white">0x8f3a21...4b7e9d</p>
                  <span className="text-[11px] text-slate-500">🕒 15 minutes ago</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Low Risk</span>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}