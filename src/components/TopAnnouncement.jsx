import React from 'react';
import { businessInfo } from '../data/businessInfo';

export default function TopAnnouncement() {
  return (
    <div className="bg-brand-yellow text-brand-purpleDeep font-grotesk text-xs sm:text-sm font-bold tracking-wide py-2 px-4 border-b border-yellow-400" data-purpose="announcement-bar">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 text-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span>📍 {businessInfo.address}</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>🕒 {businessInfo.schedule}</span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-brand-purple text-brand-yellow px-2 py-0.5 rounded-full font-black text-[10px] tracking-wider uppercase">
            🍟 CDMX · Próximamente
          </span>
        </div>
      </div>
    </div>
  );
}
