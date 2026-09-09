'use client';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { FeeTracker } from './FeeTracker';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useWallet } from '../context/WalletContext';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { walletAddress, connectWallet } = useWallet();
  const pathname = usePathname();

  const routeName = pathname?.split('/')[1] || 'dashboard';

  // Se estiver na raiz ("/"), renderiza apenas o conteúdo (a tela de boot) sem a Sidebar e sem o Header
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans flex antialiased relative overflow-x-hidden bg-[#02050b]">
      <div className="absolute inset-0 bg-[url('/cookielogix-bg.jpg')] bg-cover bg-center bg-fixed opacity-75 pointer-events-none z-0"></div>

      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10 h-screen">
        <header className="h-20 bg-[#03060e]/80 backdrop-blur-3xl border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-6 w-full max-w-xl">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hidden sm:block">
              {routeName.toUpperCase()}
            </h2>
            <form className="flex-1 relative flex items-center">
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
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
              onClick={connectWallet}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-6 py-2.5 rounded-2xl text-xs font-black transition shadow-lg shadow-emerald-500/25 uppercase tracking-wider transform hover:scale-[1.02]"
            >
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}'use client';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { FeeTracker } from './FeeTracker';
import { 
  MagnifyingGlassIcon, 
  ChartBarSquareIcon, 
  BriefcaseIcon, 
  BellAlertIcon, 
  StarIcon, 
  BoltIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useWallet } from '../context/WalletContext';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState<'dashboard' | 'wallets' | 'alerts' | 'watchlist' | 'transaction' | 'reports' | 'settings'>('dashboard');
  const { walletAddress, connectWallet } = useWallet();
  const pathname = usePathname();

  const routeName = pathname?.split('/')[1] || 'dashboard';

  // Se estiver na raiz ("/"), renderiza apenas o conteúdo (a tela de boot) sem a Sidebar e sem o Header
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans flex antialiased relative overflow-x-hidden bg-[#02050b]">
      <div className="absolute inset-0 bg-[url('/cookielogix-bg.jpg')] bg-cover bg-center bg-fixed opacity-75 pointer-events-none z-0"></div>

      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10 h-screen pb-20 lg:pb-0">
        <header className="h-20 bg-[#03060e]/80 backdrop-blur-3xl border-b border-slate-800/60 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4 sm:gap-6 w-full max-w-xl">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hidden sm:block">
              {routeName.toUpperCase()}
            </h2>
            <form className="flex-1 relative flex items-center">
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search wallet / tx hash..."
                className="w-full bg-[#080c16]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl pl-10 pr-10 sm:pr-12 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner font-mono transition"
              />
              <span className="absolute right-3.5 text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 pointer-events-none hidden sm:inline-block">
                ⌘K
              </span>
            </form>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <FeeTracker />
            <div className="hidden xl:flex items-center gap-2 bg-[#080c16]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800/80 text-[11px] font-mono text-slate-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>22ms | RPC Synced</span>
            </div>
            
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-4 sm:px-6 py-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition shadow-lg shadow-emerald-500/25 uppercase tracking-wider transform hover:scale-[1.02] whitespace-nowrap"
            >
              {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Nightly'}
            </button>
          </div>
        </header>

        {children}

        {/* BARRA DE NAVEGAÇÃO INFERIOR EXCLUSIVA PARA MOBILE (Bottom Bar) */}
        <nav aria-label="Mobile Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#03060e]/95 backdrop-blur-2xl border-t border-slate-800/80 px-4 flex items-center justify-around z-40 shadow-2xl">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <ChartBarSquareIcon className="w-5 h-5" /> },
            { id: 'wallets', label: 'Wallets', icon: <BriefcaseIcon className="w-5 h-5" /> },
            { id: 'alerts', label: 'Alerts', icon: <BellAlertIcon className="w-5 h-5" /> },
            { id: 'transaction', label: 'Tx', icon: <BoltIcon className="w-5 h-5" /> },
            { id: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id as any);
                window.location.hash = item.id;
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${activeNav === item.id ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {item.icon}
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}