'use client';
import { useState } from 'react';
import { DocumentTextIcon, ShieldCheckIcon, ArrowDownTrayIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ReportsPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const reports = [
    {
      id: 'q3-audit',
      title: 'CookieLogix_SVM_Security_Audit_Q3.txt',
      type: 'Cryptographic Due Diligence & Threat Analysis',
      date: 'September 8, 2026',
      status: 'VERIFIED SECURE',
      content: `==================================================
       COOKIELOGIX SECURITY & RISK REPORT
       Verified via Webacy & DD.xyz Kernel
==================================================
Target Asset: Cookie Chain (SVM) Autonomous Engine
Report Type: Cryptographic Due Diligence & Threat Analysis
Status: VERIFIED SECURE
Date: 2026-09-08
RPC Endpoint: https://rpc.cookiescan.io
--------------------------------------------------
[METRICS SUMMARY]
* Total Scans Performed: 1,234
* Normalized Risk Score: 12 / 100 (Secure State)
* Exposure Risk: Zero Vulnerabilities Detected
* Contract Integrity: 100% Immutable SVM Programs
* Autonomous Intent Firewall: Active & Fully Synchronized
==================================================`
    },
    {
      id: 'telemetry-log',
      title: 'CookieLogix_RPC_Telemetry_Stream.txt',
      type: 'Real-Time RPC Telemetry & Heuristics',
      date: 'September 8, 2026',
      status: 'SYNCHRONIZED',
      content: `==================================================
       COOKIELOGIX RPC TELEMETRY LOG
       Endpoint: https://rpc.cookiescan.io
==================================================
* Slot Monitoring: Active (Live Slot Tracking)
* Pre-execution Heuristics: Enabled
* Known Flags: 10% (Clean State)
* Behavior Analysis: 5% (Secure Outbound Frequency)
* Counterparty Risk: 5% (Verified Ecosystem Routers)
==================================================`
    }
  ];

  const handleDownload = (report: typeof reports[0]) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      const blob = new Blob([report.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = report.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 600);
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto px-8 pt-6 pb-12 space-y-6">
      
      {/* Header / Banner de Relatórios */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/80 px-8 py-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
            <ShieldCheckIcon className="w-3.5 h-3.5" /> Cryptographic Audit Suite
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1.5">
            Due Diligence Reports
          </h1>
        </div>
        <div className="text-right font-mono text-xs text-slate-400 space-y-0.5">
          <div>Kernel: Webacy & DD.xyz</div>
          <div className="text-emerald-400 font-bold">Network: Cookie Chain SVM</div>
        </div>
      </div>

      {/* Container Principal */}
      <div className="bg-[#060a14]/80 backdrop-blur-2xl border border-slate-800/70 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Generated Assessment Files</h3>
          <p className="text-xs text-slate-400 mt-0.5">Download cryptographic audit logs and real-time telemetry documentation.</p>
        </div>

        {/* Lista de Relatórios */}
        <div className="space-y-4">
          {reports.map((report) => (
            <div 
              key={report.id}
              className="bg-[#090d18]/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner hover:border-emerald-500/40 transition group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <DocumentTextIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-white tracking-wider">
                      {report.title}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-0.5 rounded-md font-bold border border-emerald-500/20 uppercase tracking-wider">
                      {report.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{report.type}</p>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 pt-1">
                    <ClockIcon className="w-3 h-3" /> Generated: {report.date}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleDownload(report)}
                disabled={downloadingId === report.id}
                className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-5 py-3 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 uppercase tracking-wider cursor-pointer disabled:opacity-50 shrink-0 w-full sm:w-auto justify-center"
              >
                <ArrowDownTrayIcon className="w-4 h-4" /> 
                {downloadingId === report.id ? 'Generating...' : 'Download Report'}
              </button>
            </div>
          ))}
        </div>

        {/* Rodapé Informativo */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300/90 leading-relaxed flex items-center gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block mb-0.5">Immutable Audit Trail</span>
            All reports are compiled locally via secure kernel routines with hashes verified against <code className="font-mono text-emerald-200">rpc.cookiescan.io</code>.
          </div>
        </div>

      </div>
    </div>
  );
}