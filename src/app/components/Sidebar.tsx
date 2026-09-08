'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarSquareIcon,
  BriefcaseIcon,
  BellAlertIcon,
  StarIcon,
  BoltIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  expanded: boolean;
  setExpanded: (val: boolean) => void;
}

export function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pathname = usePathname(); // Pega a URL atual (ex: "/dashboard")

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: <ChartBarSquareIcon className="w-5 h-5" />, path: '/dashboard' },
    { id: 'wallets', label: 'WALLETS', icon: <BriefcaseIcon className="w-5 h-5" />, path: '/wallets' },
    { id: 'alerts', label: 'ALERTS', icon: <BellAlertIcon className="w-5 h-5" />, path: '/alerts' },
    { id: 'watchlist', label: 'WATCHLIST', icon: <StarIcon className="w-5 h-5" />, path: '/watchlist' },
    { id: 'transaction', label: 'TRANSACTION', icon: <BoltIcon className="w-5 h-5" />, path: '/transaction' },
  ];

  const toolItems = [
    { id: 'reports', label: 'REPORTS', icon: <DocumentTextIcon className="w-5 h-5" />, path: '/reports' },
    { id: 'settings', label: 'SETTINGS', icon: <Cog6ToothIcon className="w-5 h-5" />, path: '/settings' },
  ];

  // Função auxiliar para verificar se a rota atual é a do botão
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <aside className={`transition-all duration-300 ease-in-out bg-[#050810]/85 backdrop-blur-3xl border-r border-slate-800/60 hidden lg:flex flex-col justify-between p-5 shrink-0 z-30 shadow-2xl relative ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="space-y-8">
        
        {/* Topo: Logo e Botão */}
        <div className={`flex ${expanded ? 'items-center justify-between' : 'flex-col items-center gap-4 w-full'}`}>
          <div className={`flex items-center gap-3 overflow-hidden ${!expanded ? 'justify-center w-full translate-x-2' : ''}`}>
            <div className="h-10 w-10 flex items-center justify-center shrink-0 bg-transparent shadow-none">
              <img src="/cookie-logo.png" alt="CookieLogix Logo" className="h-full w-full object-contain bg-transparent" />
            </div>
            <div className={`transition-opacity duration-200 ease-in-out whitespace-nowrap overflow-hidden ${expanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none w-0'}`}>
              <span className="text-base font-black tracking-tight text-white">CookieLogix</span>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className={`text-slate-400 hover:text-emerald-400 p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 transition shadow-sm shrink-0 flex items-center justify-center ${!expanded ? 'w-12 h-12' : ''}`}
            title={expanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {expanded ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-5 h-5" />}
          </button>
        </div>

        <div className="space-y-6">
          {/* Overview */}
          <div>
            <div className={`transition-opacity duration-200 overflow-hidden ${expanded ? 'opacity-100 mb-3 delay-100' : 'opacity-0 mb-0 pointer-events-none'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 whitespace-nowrap">Overview</p>
            </div>
            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => !expanded && setHoveredId(item.id)}
                  onMouseLeave={() => !expanded && setHoveredId(null)}
                >
                  <Link
                    href={item.path}
                    className={`w-full flex items-center rounded-xl text-xs font-medium transition-all transform hover:translate-x-1 ${expanded ? 'px-3 py-2.5 gap-3' : 'p-3 justify-center'} ${isActive(item.path) ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner backdrop-blur-md font-semibold' : 'text-slate-400 hover:text-white hover:bg-[#080c16]/80'} ${!expanded ? 'hover:translate-x-0' : ''}`}
                  >
                    <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
                    <span className={`transition-opacity duration-200 ease-in-out whitespace-nowrap overflow-hidden ${expanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none w-0'}`}>
                      {item.label}
                    </span>
                  </Link>

                  {!expanded && hoveredId === item.id && (
                    <div className="absolute left-[78px] top-1/2 -translate-y-1/2 bg-transparent pointer-events-none z-50 whitespace-nowrap animate-fade-in">
                      <span className="text-white font-black text-sm tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Tools */}
          <div>
            <div className={`transition-opacity duration-200 overflow-hidden ${expanded ? 'opacity-100 mb-3 delay-100' : 'opacity-0 mb-0 pointer-events-none'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 whitespace-nowrap">Tools</p>
            </div>
            <nav className="space-y-1.5">
              {toolItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => !expanded && setHoveredId(item.id)}
                  onMouseLeave={() => !expanded && setHoveredId(null)}
                >
                  <Link
                    href={item.path}
                    className={`w-full flex items-center rounded-xl text-xs font-medium transition-all transform hover:translate-x-1 ${expanded ? 'px-3 py-2.5 gap-3' : 'p-3 justify-center'} ${isActive(item.path) ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner backdrop-blur-md font-semibold' : 'text-slate-400 hover:text-white hover:bg-[#080c16]/80'} ${!expanded ? 'hover:translate-x-0' : ''}`}
                  >
                    <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
                    <span className={`transition-opacity duration-200 ease-in-out whitespace-nowrap overflow-hidden ${expanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none w-0'}`}>
                      {item.label}
                    </span>
                  </Link>

                  {!expanded && hoveredId === item.id && (
                    <div className="absolute left-[78px] top-1/2 -translate-y-1/2 bg-transparent pointer-events-none z-50 whitespace-nowrap animate-fade-in">
                      <span className="text-white font-black text-sm tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className={`transition-opacity duration-200 ease-in-out overflow-hidden ${expanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-[#080c16]/90 backdrop-blur-xl border border-slate-800/80 p-4 rounded-2xl space-y-3 shadow-xl relative">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheckIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Startup Grant</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Webacy & DD.xyz Spec.</p>
          </div>
          <Link 
            href="/docs"
            className="flex items-center justify-center gap-1.5 w-full text-center bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 py-2 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider"
          >
            <DocumentTextIcon className="w-4 h-4" /> Docs & Grant
          </Link>
        </div>
      </div>
    </aside>
  );
}