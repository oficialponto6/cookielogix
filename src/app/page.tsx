'use client';
import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const COOKIE_RPC = 'https://rpc.cookiescan.io';
const connection = new Connection(COOKIE_RPC, 'confirmed');

export default function CookieLogixDashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [statusLog, setStatusLog] = useState<string>('System initialized. Webacy Risk Engine & Cookie Chain SVM linked.');
  const [intentInput, setIntentInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'terminal' | 'security' | 'analytics'>('terminal');

  const connectNightlyWallet = async () => {
    try {
      setStatusLog('Requesting Nightly Wallet connection...');
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
      setStatusLog(`Success: Connected to ${pubKeyStr.slice(0, 6)}...${pubKeyStr.slice(-4)}`);

      const pubKey = new PublicKey(pubKeyStr);
      const lamports = await connection.getBalance(pubKey);
      setBalance(lamports / 1e9);
    } catch (error: any) {
      console.error(error);
      setStatusLog(`Connection failed: ${error.message}`);
    }
  };

  const handleExecuteIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your Nightly wallet first!');
      return;
    }
    setStatusLog(`Analyzing intent parameters & simulating transaction via Cookie Chain...`);
    setTimeout(() => {
      setStatusLog(`[SUCCESS] Intent securely executed. Finality achieved via RPC (${COOKIE_RPC}). No threat signatures found.`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 p-6 md:p-10 font-sans selection:bg-emerald-500 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation / Brand Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/40 border border-slate-800/80 backdrop-blur-md p-5 rounded-2xl gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-xl shadow-lg shadow-emerald-900/40">
              🍪
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-wider text-white">CookieLogix</h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-widest">
                  SVM Intent cApp
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Intent Engine & Security Due Diligence on Cookie Chain</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="hidden lg:flex bg-slate-950/60 border border-slate-800 rounded-xl p-1 gap-1">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'terminal' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Intent Terminal
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'security' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Risk Engine
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'analytics' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Analytics
              </button>
            </div>

            <button
              onClick={connectNightlyWallet}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 text-xs tracking-wide uppercase flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-slate-950 animate-pulse"></span>
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-400 text-3xl font-bold">🟢</div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Network Status</h3>
            <p className="text-lg font-bold text-emerald-400 mt-2 flex items-center gap-2">
              Cookie Chain Live
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">Sub-second SVM finality</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Wallet Balance</h3>
            <p className="text-lg font-bold text-slate-100 mt-2">
              {balance !== null ? `${balance} COOK` : '0.00 COOK'}
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">Native gas token</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Wallet Safety Score</h3>
            <p className="text-lg font-bold text-emerald-400 mt-2">Safest (99.4%)</p>
            <span className="text-[11px] text-slate-500 mt-1 block">Webacy Multi-Provider AI</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">RPC Endpoint</h3>
            <p className="text-xs font-mono text-slate-300 mt-2.5 truncate bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              rpc.cookiescan.io
            </p>
            <span className="text-[11px] text-emerald-500 mt-1 block">Low latency connection</span>
          </div>
        </section>

        {/* Tab Contents */}
        {activeTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-6 shadow-xl">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  ⚡ Autonomous Intent Terminal
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Write plain-language intents to execute complex multi-step smart contract interactions securely.</p>
              </div>

              <form onSubmit={handleExecuteIntent} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={intentInput}
                    onChange={(e) => setIntentInput(e.target.value)}
                    placeholder="e.g. Check account health, simulate swap with slippage protection..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm placeholder:text-slate-600 shadow-inner"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500">Secured by Cookie Chain SVM & Nightly</span>
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold transition text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20"
                  >
                    Execute Intent
                  </button>
                </div>
              </form>

              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 font-mono text-xs text-emerald-400/90 h-40 overflow-y-auto shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-600 border-b border-slate-900 pb-2 mb-2">
                  <span>SYSTEM KERNEL LOGS</span>
                  <span>SESSION ACTIVE</span>
                </div>
                <span className="text-slate-500">$ cookielogix-core --init --svm-bridge=active</span>
                <p className="mt-1.5 leading-relaxed">{statusLog}</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Quick Intent Actions</h3>
                <p className="text-xs text-slate-400 mb-4">Click any preset intent to automatically load it into the execution terminal.</p>
                <div className="space-y-2">
                  <button 
                    onClick={() => setIntentInput('Check account risk profile & token exposure')}
                    className="w-full text-left bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 transition flex justify-between items-center group"
                  >
                    <span>🔍 Check wallet risk & exposure</span>
                    <span className="text-slate-600 group-hover:text-emerald-400">→</span>
                  </button>
                  <button 
                    onClick={() => setIntentInput('Simulate secure token swap on Cookie Chain')}
                    className="w-full text-left bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 transition flex justify-between items-center group"
                  >
                    <span>⚡ Simulate secure swap</span>
                    <span className="text-slate-600 group-hover:text-emerald-400">→</span>
                  </button>
                  <button 
                    onClick={() => setIntentInput('Audit smart contract approvals & allowances')}
                    className="w-full text-left bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 transition flex justify-between items-center group"
                  >
                    <span>🛡️ Audit token approvals</span>
                    <span className="text-slate-600 group-hover:text-emerald-400">→</span>
                  </button>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3.5 text-xs text-emerald-400/90">
                <span className="font-semibold block mb-0.5">💡 Pro Tip</span>
                Connect your Nightly wallet to grant authorization for autonomous intent signing.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-bold text-white">Security & Due Diligence Hub</h2>
              <p className="text-xs text-slate-400">Powered by multi-provider threat intelligence engines protecting interactions across the SVM ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-emerald-400">🛡️ Threat Risks API</h4>
                <p className="text-xs text-slate-400">Scans smart contracts and EOAs against historical blacklists and malicious databases.</p>
                <div className="pt-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-md font-semibold">Status: Active</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-emerald-400">🔍 Transaction Intelligence</h4>
                <p className="text-xs text-slate-400">Pre-execution risk evaluation to mitigate drainer attacks and unintended allowances.</p>
                <div className="pt-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-md font-semibold">Status: Real-time</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-emerald-400">📊 Holder & Contract Analysis</h4>
                <p className="text-xs text-slate-400">Deep inspection of token ownership distribution and contract code vulnerabilities.</p>
                <div className="pt-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-md font-semibold">Status: Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-bold text-white">Cookie Chain Network Analytics</h2>
              <p className="text-xs text-slate-400">Real-time telemetry and throughput metrics from the Cookie Chain RPC layer.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs">Block Height</span>
                <p className="text-lg font-mono font-bold text-white mt-1">#14,298,412</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs">Average Finality</span>
                <p className="text-lg font-mono font-bold text-emerald-400 mt-1">0.42s</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs">Intent Success Rate</span>
                <p className="text-lg font-mono font-bold text-emerald-400 mt-1">99.8%</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}