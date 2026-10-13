import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ShieldCheck, Minimize2 } from 'lucide-react';
import { SupportMessage } from '../types/dropship';

interface StorefrontChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorefrontChatModal: React.FC<StorefrontChatModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Olá! Sou o assistente virtual da loja. Como posso ajudar com sua compra, rastreamento ou informações de entrega hoje?',
      timestamp: 'Agora'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: SupportMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: SupportMessage = {
          id: `a-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...newHistory, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (text: string) => {
    setInput(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold leading-tight">Loja Oficial - Suporte IA 24/7</div>
            <div className="text-[10px] text-indigo-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Resposta instantânea · LGPD Seguro</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Questions buttons */}
      <div className="p-2.5 bg-slate-950/70 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handlePreset('Onde está meu pedido #BR-94821-XP?')}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer shrink-0"
        >
          Rastrear #BR-94821-XP
        </button>
        <button
          onClick={() => handlePreset('Qual o prazo de entrega?')}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer shrink-0"
        >
          Prazos de Frete
        </button>
        <button
          onClick={() => handlePreset('Como funciona a garantia de 30 dias?')}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer shrink-0"
        >
          Devolução / Troca
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-4 space-y-3 h-80 overflow-y-auto bg-slate-950/90 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
              <div className="text-[9px] mt-1 opacity-70 text-right font-mono">
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-none px-3.5 py-2 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>Consultando sistema...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva sua dúvida aqui..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Privacy Badge footer */}
      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Atendimento blindado LGPD</span>
        </span>
        <span className="font-mono text-[9px]">Zero-Retention AI</span>
      </div>

    </div>
  );
};
