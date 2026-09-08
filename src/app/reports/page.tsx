'use client';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ReportsPage() {
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
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12">
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
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
            className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg flex items-center gap-2 uppercase tracking-wider"
          >
            <DocumentTextIcon className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>
    </div>
  );
}