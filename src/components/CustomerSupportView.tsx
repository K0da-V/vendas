import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Clock, 
  User, 
  ShieldCheck, 
  Smile, 
  TrendingUp, 
  Search,
  ExternalLink
} from 'lucide-react';
import { SupportTicket, SupportMessage } from '../types/dropship';

interface CustomerSupportViewProps {
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  onOpenStorefrontChat: () => void;
}

export const CustomerSupportView: React.FC<CustomerSupportViewProps> = ({
  tickets,
  setTickets,
  onOpenStorefrontChat
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [testInput, setTestInput] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);
  const [activeChatMessages, setActiveChatMessages] = useState<SupportMessage[]>([
    {
      id: 'msg-01',
      sender: 'user',
      text: 'Olá! Fiz o pedido #BR-94821-XP da Máscara Luna Sleep. Vocês conseguem me dizer onde ele está agora?',
      timestamp: '14:22'
    },
    {
      id: 'msg-02',
      sender: 'ai',
      text: 'Olá! Localizei seu pedido #BR-94821-XP com sucesso. Ele foi liberado da alfândega e está em rota final de entrega em São Paulo/SP hoje, com previsão de chegada até as 17h. O código de rastreamento é NL948218492BR. Você precisa de mais algum detalhe?',
      timestamp: '14:22'
    }
  ]);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleSendTestMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!testInput.trim() || isAiReplying) return;

    const userMsg: SupportMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: testInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...activeChatMessages, userMsg];
    setActiveChatMessages(newHistory);
    setTestInput('');
    setIsAiReplying(true);

    try {
      const res = await fetch('/api/ai/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: SupportMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setActiveChatMessages([...newHistory, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiReplying(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setTestInput(question);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Atendimento Omnichannel com IA</span>
            <span aria-hidden="true">·</span>
            <span>Rastreamento em Tempo Real</span>
            <span aria-hidden="true">·</span>
            <span>Escala Ilimitada</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            Suporte ao Cliente Inteligente 24/7 sem Custo Humano
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            O assistente Gemini atende clientes instantaneamente na loja, consulta códigos de rastreio, esclarece políticas de garantia e troca, evitando chargebacks e elevando o CSAT para 98.4%.
          </p>
        </div>

        <button
          onClick={onOpenStorefrontChat}
          className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Abrir Widget da Loja (Visão do Cliente)</span>
        </button>
      </div>

      {/* Support KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] text-slate-400 block">Resolução 100% IA</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
            94.2%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Sem necessidade de atendente humano
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] text-slate-400 block">Tempo Médio de Resposta</span>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
            1.2 seg
          </div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
            Instantâneo 24h por dia
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] text-slate-400 block">Satisfação (CSAT)</span>
          <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
            4.9 / 5.0
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            98.4% avaliações positivas
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] text-slate-400 block">Custo Operacional de Escala</span>
          <div className="text-2xl font-bold text-indigo-400 font-mono tabular-nums mt-0.5">
            R$ 0,00
          </div>
          <span className="text-[11px] text-indigo-300 mt-1 block">
            Zero custos com equipe física
          </span>
        </div>
      </div>

      {/* Support Management & Simulator Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Tickets Inbox List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Chamados Recentes</h2>
            <span className="text-xs font-mono text-slate-400">{tickets.length} resolvidos</span>
          </div>

          <div className="space-y-2.5">
            {tickets.map((tkt) => (
              <div
                key={tkt.id}
                onClick={() => setSelectedTicketId(tkt.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedTicketId === tkt.id
                    ? 'bg-slate-800/80 border-indigo-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white truncate">{tkt.customerName}</span>
                  <span className="text-[11px] font-mono text-slate-500">{tkt.timeAgo}</span>
                </div>

                <div className="text-xs text-indigo-400 font-mono mb-1">
                  {tkt.orderNumber}
                </div>

                <p className="text-xs text-slate-400 line-clamp-1">
                  {tkt.subject}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {tkt.status}
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    ★ {tkt.csat}.0 CSAT
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Live AI Chat Terminal / Tester */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4 min-h-[500px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Simulador do Assistente Gemini Live (Loja Virtual)
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-mono">Status: Online</span>
                    <span aria-hidden="true">·</span>
                    <span>Políticas de dropshipping e pedidos carregados</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400">
                  Zero-Retention Privacy
                </span>
              </div>
            </div>

            {/* Quick Questions buttons */}
            <div className="py-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">Testar com cliente:</span>
              <button
                type="button"
                onClick={() => handleQuickQuestion('Onde está meu pedido #BR-83104-NV?')}
                className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
              >
                Rastrear #BR-83104-NV
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion('Qual o prazo de entrega internacional e se tem taxa alfandegária?')}
                className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
              >
                Prazos & Alfândega
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion('Não gostei do produto, como funciona o reembolso?')}
                className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
              >
                Garantia de 30 dias
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 py-2">
              {activeChatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75">
                      <span>{msg.sender === 'user' ? 'Cliente' : 'Assistente AutoDrop IA'}</span>
                      <span className="font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isAiReplying && (
                <div className="flex justify-start">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                    <span>IA consultando base de pedidos e digitando...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleSendTestMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Digite uma dúvida como cliente (ex: rastrear #BR-72091-MC)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isAiReplying || !testInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
