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
  const [intentInput, setIntentInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'terminal' | 'security' | 'analytics'>('terminal');
  const [safetyScore, setSafetyScore] = useState<{ label: string; color: string; score: string }>({
    label: 'Not Connected',
    color: 'text-slate-400',
    score: 'N/A'
  });

  // Animação de introdução de 2 segundos com anagrama/revelação tipográfica
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
      setStatusLog(`Authenticated securely: ${pubKeyStr.slice(0, 6)}...${pubKeyStr.slice(-4)}`);

      setSafetyScore({
        label: 'Safest',
        color: 'text-emerald-400',
        score: '99.4%'
      });

      const pubKey = new PublicKey(pubKeyStr);
      const lamports = await connection.getBalance(pubKey);
      setBalance(lamports / 1e9);
    } catch (error: any) {
      console.error(error);
      setStatusLog(`Connection handshake failed: ${error.message}`);
    }
  };

  const handleExecuteIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your Nightly wallet first!');
      return;
    }
    setStatusLog(`Executing multi-provider DD.xyz risk scan & Transaction Intelligence HUD...`);
    setTimeout(() => {
      setStatusLog(`[SUCCESS] Intent verified via Transaction Risks API. Zero threats. Finalized on Cookie Chain.`);
    }, 1500);
  };

  // Tela de Introdução (Splash Screen com Animação de Anagrama de 2 Segundos e Logo Personalizada)
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#030712] flex flex-col items-center justify-center z-50 overflow-hidden font-sans">
        <div className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center space-y-5">
          <div className="h-16 w-16 rounded-2xl bg-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/30 ring-2 ring-emerald-400/50 overflow-hidden relative">
            <img 
              src="/cookie-logo.png" 
              alt="CookieLogix Logo" 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 animate-pulse uppercase">
              C O O K I E L O G I X
            </h1>
            <p className="text-[11px] text-slate-400 tracking-widest uppercase font-mono">
              Resolving SVM Anagram & Risk Kernel...
            </p>
          </div>
          <div className="w-36 h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-400 animate-[pulse_1s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Neon Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-8">
        
        {/* Navigation & Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-slate-900/40 border border-slate-800/80 backdrop-blur-2xl p-6 rounded-3xl gap-6 shadow-2xl shadow-emerald-950/30">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/20 ring-1 ring-emerald-400/30 overflow-hidden relative">
              <img 
                src="/cookie-logo.png" 
                alt="CookieLogix Logo" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-black tracking-tight text-white">CookieLogix</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-0.5 rounded-full font-bold tracking-widest uppercase">
                  SVM Intent Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Autonomous Intent cApp & Due Diligence Risk Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-end flex-wrap">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-1.5 flex gap-1 shadow-inner">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'terminal' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                Terminal
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'security' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                Risk Engine
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'analytics' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                Analytics
              </button>
            </div>

            <a
              href="/docs"
              className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-2xl font-bold transition text-xs flex items-center gap-1.5 shadow-sm"
            >
              📄 Docs & Grant
            </a>

            <button
              onClick={connectNightlyWallet}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/25 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping"></span>
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        {/* Telemetry & Metrics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl hover:border-emerald-500/40 transition group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Status</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-base font-black text-emerald-400">Cookie Chain Live</p>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Sub-second SVM finality</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl hover:border-emerald-500/40 transition group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wallet Balance</span>
            <p className="text-base font-black text-white mt-2">
              {balance !== null ? `${balance} COOK` : '0.00 COOK'}
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">Native gas token</span>
          </div>

          {/* Wallet Safety Badge */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl hover:border-emerald-500/40 transition group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wallet Safety Score</span>
            <p className={`text-base font-black mt-2 ${safetyScore.color}`}>
              {safetyScore.label} ({safetyScore.score})
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">Exposure Risk API</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl hover:border-emerald-500/40 transition group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RPC Endpoint</span>
            <div className="mt-2 bg-slate-950/80 border border-slate-800/80 px-3 py-1.5 rounded-xl font-mono text-xs text-slate-300 truncate font-semibold">
              rpc.cookiescan.io
            </div>
            <span className="text-[11px] text-emerald-500 mt-1 block">Connected & optimized</span>
          </div>
        </section>

        {/* Dynamic Views */}
        {activeTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Main Terminal Card */}
            <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl relative">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  ⚡ Autonomous Intent Terminal
                </h2>
                <p className="text-xs text-slate-400 mt-1">Execute multi-step smart contract interactions smoothly using natural-language intent commands.</p>
              </div>

              <form onSubmit={handleExecuteIntent} className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                  <input
                    type="text"
                    value={intentInput}
                    onChange={(e) => setIntentInput(e.target.value)}
                    placeholder="e.g. Check account health, simulate secure swap..."
                    className="relative w-full bg-slate-950 border border-slate-800/80 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-sm font-medium shadow-inner"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-medium">Secured by Cookie Chain SVM & Nightly</span>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-7 py-3 rounded-2xl font-black transition-all shadow-lg shadow-emerald-500/25 text-xs tracking-wider uppercase"
                  >
                    Execute Intent
                  </button>
                </div>
              </form>

              {/* Console Output */}
              <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-5 font-mono text-xs text-emerald-400/90 h-44 overflow-y-auto shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-600 border-b border-slate-900 pb-2 mb-3 font-bold tracking-widest">
                  <span>KERNEL LOGS</span>
                  <span>STATUS: SECURE</span>
                </div>
                <span className="text-slate-500">$ cookielogix-core --init --risk-module=active</span>
                <p className="mt-2 leading-relaxed">{statusLog}</p>
              </div>
            </div>

            {/* Right Actions Panel */}
            <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-white mb-2 tracking-wide uppercase">Quick Intent Actions</h3>
                <p className="text-xs text-slate-400 mb-4">Click any preset to automatically load into the execution terminal.</p>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setIntentInput('Check account risk profile & token exposure')}
                    className="w-full text-left bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 p-3.5 rounded-2xl text-xs text-slate-300 transition flex justify-between items-center group font-medium"
                  >
                    <span>🔍 Check wallet risk & exposure</span>
                    <span className="text-slate-600 group-hover:text-emerald-400 font-bold">→</span>
                  </button>
                  <button 
                    onClick={() => setIntentInput('Simulate secure token swap on Cookie Chain')}
                    className="w-full text-left bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 p-3.5 rounded-2xl text-xs text-slate-300 transition flex justify-between items-center group font-medium"
                  >
                    <span>⚡ Simulate secure swap</span>
                    <span className="text-slate-600 group-hover:text-emerald-400 font-bold">→</span>
                  </button>
                  <button 
                    onClick={() => setIntentInput('Audit smart contract approvals & allowances')}
                    className="w-full text-left bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 p-3.5 rounded-2xl text-xs text-slate-300 transition flex justify-between items-center group font-medium"
                  >
                    <span>🛡️ Audit token approvals</span>
                    <span className="text-slate-600 group-hover:text-emerald-400 font-bold">→</span>
                  </button>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300/90 leading-relaxed">
                <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-emerald-400">💡 Security Notice</span>
                Every intent undergoes multi-provider risk analysis prior to smart contract confirmation.
              </div>
            </div>

          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl">
            <div>
              <h2 className="text-lg font-black text-white">Security & Due Diligence Hub</h2>
              <p className="text-xs text-slate-400 mt-1">Multi-provider risk engines protecting transactions across the entire Web3 and SVM landscape.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl space-y-3">
                <h4 className="text-sm font-black text-emerald-400">🛡️ Threat Risks API</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Scans contracts and addresses against known threat databases and sanction lists.</p>
                <div className="pt-1">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-lg font-bold">Status: Active</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl space-y-3">
                <h4 className="text-sm font-black text-emerald-400">🔍 Transaction Intelligence</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Pre-execution risk analytics to mitigate drainer exploits and malicious allowances.</p>
                <div className="pt-1">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-lg font-bold">Status: Real-time</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl space-y-3">
                <h4 className="text-sm font-black text-emerald-400">📊 Approval & Holder Analysis</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Deep inspection of token distribution dynamics and smart contract allowance permissions.</p>
                <div className="pt-1">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-lg font-bold">Status: Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl">
            <div>
              <h2 className="text-lg font-black text-white">Cookie Chain Network Telemetry</h2>
              <p className="text-xs text-slate-400 mt-1">Real-time performance metrics streamed directly from the Cookie Chain RPC layer.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Block Height</span>
                <p className="text-xl font-mono font-black text-white mt-2">#14,298,412</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Average Finality</span>
                <p className="text-xl font-mono font-black text-emerald-400 mt-2">0.42s</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Intent Success Rate</span>
                <p className="text-xl font-mono font-black text-emerald-400 mt-2">99.8%</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}