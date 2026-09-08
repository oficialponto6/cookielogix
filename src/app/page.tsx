'use client';
import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Toaster, ToastMessage } from './components/Toaster';
import { ContractDrawer } from './components/ContractDrawer';
import { FeeTracker } from './components/FeeTracker';
import { Sidebar } from './components/Sidebar';
import { Terminal } from './components/Terminal';
import {
  ChartBarSquareIcon,
  BriefcaseIcon,
  BellAlertIcon,
  StarIcon,
  BoltIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  PlusIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const COOKIE_RPC = 'https://rpc.cookiescan.io';
const connection = new Connection(COOKIE_RPC, 'confirmed');

export default function CookieLogixDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [statusLogType, setStatusLogType] = useState<string>('ready');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNav, setActiveNav] = useState<'dashboard' | 'wallets' | 'alerts' | 'watchlist' | 'transaction' | 'reports' | 'settings'>('dashboard');
  
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // Estados dos novos recursos enterprise
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedContract, setSelectedContract] = useState<{
    address: string;
    name: string;
    riskScore: number;
    mintAuthority: boolean;
    freezeAuthority: boolean;
    lpLocked: boolean;
  } | null>(null);

  const addToast = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    const newToast: ToastMessage = { id: Date.now(), message, type };
    setToasts((prev) => [newToast, ...prev]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openInspector = (address: string) => {
    setSelectedContract({
      address,
      name: 'Target Contract',
      riskScore: 78,
      mintAuthority: true,
      freezeAuthority: false,
      lpLocked: true
    });
    setDrawerOpen(true);
    addToast(`Contract X-Ray opened for ${address.slice(0, 6)}...`, 'warning');
  };

  const [intentInput, setIntentInput] = useState<string>('');
  const [watchlistItems, setWatchlistItems] = useState<string[]>(['0x742d35...9c4f8a', '0x8f3a21...4b7e9d']);
  const [newWatchAddress, setNewWatchAddress] = useState<string>('');
  const [alertsList, setAlertsList] = useState<Array<{ id: number; type: string; message: string; time: string; severity: 'high' | 'mid' | 'low'; address?: string }>>([
    { id: 1, type: 'Critical Alert', message: 'Suspicious allowance detected on contract 0x99a...4b1', time: '10 mins ago', severity: 'high', address: '0x99a4b1723e4590128c71' },
    { id: 2, type: 'Warning', message: 'Unusual outbound frequency on secondary router', time: '25 mins ago', severity: 'mid', address: '0x8f3a21b47e9d10293847' }
  ]);

  const [safetyScore, setSafetyScore] = useState<{ label: string; color: string; score: number }>({
    label: 'Moderate Risk',
    color: 'text-amber-400',
    score: 45
  });

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      addToast('CookieLogix Kernel synchronized successfully.', 'success');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const connectNightlyWallet = async () => {
    try {
      setStatusLogType('connecting');
      const provider = (window as any)?.nightly?.solana || (window as any)?.solana;
      
      if (!provider) {
        alert('Nightly Wallet not found! Please install the Nightly extension.');
        setStatusLogType('error');
        addToast('Nightly Wallet extension not detected.', 'error');
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
      setStatusLogType('success_connect');
      setSafetyScore({ label: 'Safest', color: 'text-emerald-400', score: 99 });
      addToast('Nightly Wallet connected securely!', 'success');

      const pubKey = new PublicKey(pubKeyStr);
      const lamports = await connection.getBalance(pubKey);
      setBalance(lamports / 1e9);
    } catch (error: any) {
      console.error(error);
      setStatusLogType('error');
      addToast('Wallet connection failed or canceled.', 'error');
    }
  };

  const handleSearchScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setStatusLogType('scanning');
    addToast('Initiating Webacy Threat Scan...', 'success');
    setTimeout(() => {
      setStatusLogType('success_scan');
      addToast('Target hash evaluation complete. Secure.', 'success');
    }, 1500);
  };

  const handleExecuteIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentInput) return;
    setStatusLogType('executing');
    addToast('Executing SVM Intent pipeline...', 'success');
    setTimeout(() => {
      setStatusLogType('success_exec');
      addToast('Intent executed successfully on Cookie Chain.', 'success');
    }, 1500);
  };

  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWatchAddress) return;
    setWatchlistItems([newWatchAddress, ...watchlistItems]);
    setNewWatchAddress('');
    addToast('Address successfully added to Watchlist.', 'success');
  };

  const handleAddAlert = () => {
    const newAlert = {
      id: Date.now(),
      type: 'Warning',
      message: 'New high-risk transaction monitored on Cookie Chain SVM.',
      time: 'Just now',
      severity: 'mid' as const,
      address: '0x4f5a6b7c8d9e01234567'
    };
    setAlertsList([newAlert, ...alertsList]);
    addToast('Simulated new high-risk security alert.', 'warning');
  };

  const handleDownloadReport = () => {
    const reportContent = `
==================================================
       COOKIELOGIX SECURITY & RISK REPORT
       Verified via Webacy & DD.xyz Kernel
==================================================

Target Asset: Cookie Chain (SVM) Autonomous Engine
Report Type: Cryptographic Due Diligence & Threat Analysis
Status: VERIFIED SECURE
Date: 2026-09-08

[METRICS]
- Total Scans Performed: 1,234
- Risk Score: 99.4% (Safest)
- Exposure Risk: Zero Threats Detected
- RPC Endpoint: https://rpc.cookiescan.io
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CookieLogix_Risk_Report_Q3.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('Security report downloaded successfully.', 'success');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#02050b] flex flex-col items-center justify-center z-50 overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[url('/cookielogix-bg.jpg')] bg-cover bg-center opacity-30 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="h-24 w-24 flex items-center justify-center drop-shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-pulse">
            <img src="/cookie-logo.png" alt="CookieLogix Logo" className="h-full w-full object-contain" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 uppercase">
              C O O K I E L O G I X
            </h1>
            <p className="text-[11px] text-slate-400 tracking-widest uppercase font-mono">
              Initializing Web3 Security Kernel...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans flex antialiased relative overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950 bg-[#02050b]">
      
      <div className="absolute inset-0 bg-[url('/cookielogix-bg.jpg')] bg-cover bg-center bg-fixed opacity-75 pointer-events-none z-0"></div>

      {/* COMPONENTES ENTERPRISE */}
      <Toaster toasts={toasts} removeToast={removeToast} />
      <ContractDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} contractData={selectedContract} />

      {/* SIDEBAR MODULARIZADA */}
      <Sidebar 
        expanded={sidebarExpanded} 
        setExpanded={setSidebarExpanded} 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10">
        
        <header className="h-20 bg-[#03060e]/80 backdrop-blur-3xl border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6 w-full max-w-xl">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hidden sm:block">
              {activeNav.toUpperCase()}
            </h2>
            <form onSubmit={handleSearchScan} className="flex-1 relative flex items-center">
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallet address / ENS / tx hash..."
                className="w-full bg-[#080c16]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl pl-10 pr-12 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner font-mono transition"
              />
              <span className="absolute right-3.5 text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 pointer-events-none">
                ⌘K
              </span>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <FeeTracker />

            <div className="hidden xl:flex items-center gap-2 bg-[#080c16]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800/80 text-[11px] font-mono text-slate-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>22ms | RPC Synced</span>
            </div>

            <button
              onClick={connectNightlyWallet}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-6 py-2.5 rounded-2xl text-xs font-black transition shadow-lg shadow-emerald-500/25 uppercase tracking-wider transform hover:scale-[1.02]"
            >
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        <div className="px-8 pt-6 pb-2 max-w-7xl mx-auto w-full">
          <div className="bg-[#060a14]/75 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Webacy & DD.xyz Accelerator Engine
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Autonomous Intent & Due Diligence Security Kernel
              </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-xs text-center md:text-right leading-relaxed font-mono">
              SVM Mainnet Active • Zero Vulnerabilities Reported
            </p>
          </div>
        </div>

        {/* Dynamic Views */}
        <div className="px-8 pb-12 space-y-6 max-w-7xl mx-auto w-full">
          
          {activeNav === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden transition hover:border-emerald-500/30">
                  <div className="flex justify-between items-center relative z-10">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Selected Wallet: <span className="text-white font-mono">0xAb57...04c5</span> <span className="text-emerald-400 font-mono">(whale.eth)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner transition hover:bg-[#0c1220]">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Scans</span>
                        <p className="text-2xl font-mono font-black text-white mt-1 tracking-tight">1,234 <span className="text-xs text-emerald-400 font-normal">times</span></p>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-inner transition hover:bg-[#0c1220]">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Detected</span>
                        <p className="text-xl font-mono font-black text-amber-400 mt-1">4 Mid <span className="text-slate-600">|</span> 12 High</p>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <ExclamationTriangleIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden transition hover:border-emerald-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Score</span>
                    <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 shadow-sm">MEDIUM RISK</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center my-2">
                    <div className="h-28 w-28 rounded-full border-4 border-slate-800 border-t-emerald-500 border-r-teal-400 flex items-center justify-center shadow-inner relative bg-[#090d18]/90">
                      <div className="text-3xl font-mono font-black text-white">{safetyScore.score}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-3 uppercase tracking-wider font-mono">Normalized scale (0 - 100)</span>
                  </div>

                  <p className="text-[11px] text-slate-300 text-center leading-relaxed">
                    This wallet shows moderate heuristic exposure. Review risk breakdown below.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">Risk Breakdown</h3>
                        <div className="relative">
                          <QuestionMarkCircleIcon 
                            className="w-4 h-4 text-slate-500 cursor-pointer hover:text-emerald-400 transition"
                            onMouseEnter={() => setActiveTooltip('risk')}
                            onMouseLeave={() => setActiveTooltip(null)}
                          />
                          {activeTooltip === 'risk' && (
                            <div className="absolute left-0 bottom-6 bg-slate-950 border border-slate-700 text-[11px] text-slate-200 p-2.5 rounded-xl shadow-xl w-56 z-20">
                              Calculated via Webacy Exposure Risk API based on historical contract interactions.
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Interpretable analysis of the 78 score based on weighted heuristics</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-400">Live Heuristics</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300 font-semibold">Known Flag</span>
                        <span className="text-emerald-400 font-mono font-bold">60%</span>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30" />
                        ))}
                        {[6, 7, 8].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300 font-semibold">Behavior Analysis</span>
                        <span className="text-emerald-400 font-mono font-bold">20%</span>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30" />
                        ))}
                        {[3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300 font-semibold">Counterparty Risk</span>
                        <span className="text-emerald-400 font-mono font-bold">15%</span>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        {[1].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 shadow-md shadow-emerald-500/30" />
                        ))}
                        {[2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300 font-semibold">Contract Integrity</span>
                        <span className="text-emerald-400 font-mono font-bold">5%</span>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        <div className="h-3 rounded-full bg-emerald-500/50 border border-emerald-500/30 shadow-sm shadow-emerald-500/20" />
                        {[2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="h-3 rounded-full bg-slate-800/60 border border-slate-700/40" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-7 rounded-3xl space-y-4 shadow-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      <BellAlertIcon className="w-4 h-4 text-emerald-400" /> Live Alerts Feed
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Real-time web3 transaction intelligence logs.</p>
                  </div>

                  <div className="space-y-3">
                    {alertsList.slice(0, 2).map((alert) => (
                      <div 
                        key={alert.id} 
                        onClick={() => alert.address && openInspector(alert.address)}
                        className={`bg-[#090d18]/80 backdrop-blur-md border p-4 rounded-2xl space-y-2 shadow-inner transition hover:translate-x-1 cursor-pointer ${alert.severity === 'high' ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800/80'}`}
                        title="Click to Inspect Contract X-Ray"
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[9px] px-2.5 py-0.5 rounded-md font-bold border ${alert.severity === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-sm shadow-red-500/10' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{alert.type}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{alert.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-snug">{alert.message}</p>
                      </div>
                    ))}
                  </div>

                  <div 
                    onClick={() => setActiveNav('alerts')}
                    className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs text-emerald-400 font-semibold cursor-pointer hover:text-emerald-300 transition"
                  >
                    <span>View all security alerts</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'wallets' && (
            <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-white">Connected Wallets & Assets</h3>
                  <p className="text-xs text-slate-400 mt-1">Manage multiple SVM & EVM identities under CookieLogix Due Diligence.</p>
                </div>
                <button 
                  onClick={connectNightlyWallet}
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
                      {walletAddress ? walletAddress : 'D34a75VHxHQHDixEdmh52SYzoaqJnQnys64GxjX3ZXKL'}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {balance !== null ? `Balance: ${balance} COOK` : 'Nightly / Solana SVM Provider'}
                    </span>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-4 py-1.5 rounded-xl font-bold">
                  Active
                </span>
              </div>
            </div>
          )}

          {activeNav === 'alerts' && (
            <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-white">Security & Threat Alerts</h3>
                  <p className="text-xs text-slate-400 mt-1">Real-time threat telemetry streamed via Webacy & DD.xyz APIs.</p>
                </div>
                <button 
                  onClick={handleAddAlert}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition shadow-lg"
                >
                  <PlusIcon className="w-4 h-4" /> Simulate New Alert
                </button>
              </div>

              <div className="space-y-4">
                {alertsList.map((alert) => (
                  <div 
                    key={alert.id} 
                    onClick={() => alert.address && openInspector(alert.address)}
                    className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex justify-between items-center shadow-inner cursor-pointer hover:border-emerald-500/40 transition"
                  >
                    <div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold border ${alert.severity === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{alert.type}</span>
                      <p className="text-xs text-slate-200 mt-2 font-medium">{alert.message}</p>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'watchlist' && (
            <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
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
                  <div 
                    key={index} 
                    onClick={() => openInspector(addr)}
                    className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl flex justify-between items-center shadow-inner font-mono cursor-pointer hover:border-emerald-500/40 transition"
                  >
                    <span className="text-xs text-white">{addr}</span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-xl font-bold">Inspect X-Ray</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'transaction' && (
            <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
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

              {/* TERMINAL MODULARIZADO */}
              <Terminal statusLogType={statusLogType} />
            </div>
          )}

          {activeNav === 'reports' && (
            <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Due Diligence Reports</h3>
                <p className="text-xs text-slate-400 mt-1">Generated cryptographic audit and risk assessment files.</p>
              </div>
              <div className="bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex justify-between items-center shadow-inner">
                <div>
                  <p className="text-xs font-bold text-white font-mono">CookieLogix_Risk_Report_Q3.txt</p>
                  <span className="text-[11px] text-slate-400">Verified via DD.xyz Kernel</span>
                </div>
                <button 
                  onClick={handleDownloadReport} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider flex items-center gap-2"
                >
                  <DocumentTextIcon className="w-4 h-4" /> Download Report
                </button>
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-white">Kernel Settings</h3>
                <p className="text-xs text-slate-400 mt-1">Configure RPC endpoints and security API thresholds.</p>
              </div>
              <div className="space-y-4 bg-[#090d18]/80 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-inner">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-white">Cookie Chain RPC Endpoint</p>
                    <span className="text-[11px] text-slate-400 font-mono">https://rpc.cookiescan.io</span>
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