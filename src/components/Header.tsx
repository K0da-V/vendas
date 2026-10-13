import React from 'react';
import { Bot, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  autopilotActive: boolean;
  onTriggerAutopilotCycle: () => void;
  isAutopilotRunning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  autopilotActive,
  onTriggerAutopilotCycle,
  isAutopilotRunning
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Painel Geral' },
    { id: 'products', label: 'Mineração & Fornecedores' },
    { id: 'ads', label: 'Anúncios & Campanhas' },
    { id: 'pricing', label: 'Precificação Dinâmica' },
    { id: 'support', label: 'Suporte IA 24/7' },
    { id: 'security', label: 'Segurança & Privacidade' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap text-left hover:text-indigo-300 transition-colors cursor-pointer"
          >
            AutoDrop AI
          </button>
        </div>

        {/* Zone 2: Nav links with clean single-line text */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-400">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 text-xs xl:text-sm cursor-pointer ${
                  isActive
                    ? 'text-white bg-slate-800/90 shadow-sm font-semibold'
                    : 'hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 px-2 py-1 rounded bg-slate-900 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] text-slate-300">LGPD Blindado</span>
          </div>

          <button
            onClick={onTriggerAutopilotCycle}
            disabled={isAutopilotRunning}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              autopilotActive
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-500'
                : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAutopilotRunning ? 'animate-spin' : ''}`} />
            <span>{isAutopilotRunning ? 'Executando Ciclo IA...' : 'Executar Ciclo Autônomo'}</span>
          </button>
        </div>

      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 gap-2 border-t border-slate-800/80 bg-slate-900/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 text-xs rounded whitespace-nowrap shrink-0 ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
