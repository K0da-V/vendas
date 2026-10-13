import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight, 
  MessageSquareText, 
  Layers,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Product, AdCampaign, ExecutiveReport } from '../types/dropship';

interface DashboardViewProps {
  products: Product[];
  campaigns: AdCampaign[];
  autopilotActive: boolean;
  setAutopilotActive: (active: boolean) => void;
  onOpenStorefrontChat: () => void;
  setActiveTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  campaigns,
  autopilotActive,
  setAutopilotActive,
  onOpenStorefrontChat,
  setActiveTab,
}) => {
  const [executiveReport, setExecutiveReport] = useState<ExecutiveReport | null>({
    executiveSummary: "A operação opera com ROAS médio de 5.26x e margem líquida consolidada de 42%. A demanda pelo produto 'Máscara Smart Luna Sleep' no TikTok gerou um salto de 38% nas conversões nas últimas 24h.",
    topWinningProduct: "Máscara Smart Luna Sleep com Áudio Condução Óssea",
    tacticalActions: [
      {
        priority: "Alta",
        action: "Escalar orçamento diário da campanha TikTok Ads em 25% para o produto Luna Sleep enquanto o CPA se mantiver abaixo de R$ 45,00.",
        impact: "+R$ 14.800 de lucro líquido semanal projetado"
      },
      {
        priority: "Alta",
        action: "Aumentar preço de venda da Cafeteira Nomad em R$ 15,00 aproveitando a inelesticidade de demanda detectada nos concorrentes.",
        impact: "+R$ 3.420 de margem adicional sem queda na taxa de conversão"
      },
      {
        priority: "Média",
        action: "Acionar fornecedor alternativo da Estação Titânio para manter garantia de envio expresso de 6 dias.",
        impact: "Zero atrasos de despacho e blindagem de CSAT"
      }
    ],
    riskAlert: "Fornecedor da Cafeteira Nomad está com 890 unidades restantes. Automação de estoque já configurou gatilho de reabastecimento.",
    scalingVerdict: "AVANÇAR COM ESCALA AGRESSIVA"
  });

  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [syncTimestamp, setSyncTimestamp] = useState('há 2 min');

  const handleGenerateExecutiveReport = async () => {
    setIsLoadingReport(true);
    try {
      const res = await fetch('/api/ai/executive-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeStats: {
            grossRevenue: '148.420,00',
            netProfit: '62.336,40',
            margin: '42%',
            adSpend: '28.190,00',
            roas: '5.26x',
            orders: '645',
            aiSupportResolution: '94.2%'
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        setExecutiveReport(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleManualSync = () => {
    setSyncTimestamp('Agora mesmo');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Autopilot Engine Control */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Dropshipping 100% Autônomo</span>
              <span aria-hidden="true">·</span>
              <span>Fornecedores Conectados</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-mono">Sem Estoque Físico</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Centro de Comando Operacional & Escala
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              A IA monitora fornecedores, sincroniza estoque em tempo real, gera criativos de anúncios direcionados, ajusta preços dinamicamente e resolve suporte ao cliente 24/7.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Autopilot Status Pill-less Switch */}
            <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-lg flex items-center gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  {autopilotActive ? 'Piloto 100% Autônomo Ativo' : 'Modo Semi-Automático'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {autopilotActive 
                    ? 'IA executa mineração, anúncios e precificação' 
                    : 'Requer aprovação manual de cada ação'}
                </div>
              </div>
              <button
                onClick={() => setAutopilotActive(!autopilotActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autopilotActive ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autopilotActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={onOpenStorefrontChat}
              className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageSquareText className="w-4 h-4 text-indigo-400" />
              <span>Testar Chat Suporte IA</span>
            </button>
          </div>
        </div>

        {/* Engine Guardrails */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block text-[11px]">Margem Mínima Protegida:</span>
            <span className="font-mono text-slate-200 font-semibold tabular-nums">45.0% Líquida</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Sincronização de Estoque:</span>
            <span className="font-mono text-emerald-400 font-semibold tabular-nums">A cada 5 min ({syncTimestamp})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Teto Diário de Anúncios:</span>
            <span className="font-mono text-slate-200 font-semibold tabular-nums">R$ 2.500,00</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Privacidade de Dados:</span>
            <span className="font-mono text-indigo-300 font-semibold">Zero-Retention LGPD</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Gross Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Faturamento Bruto</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            R$ 148.420,00
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" /> +24.8%
            </span>
            <span aria-hidden="true">·</span>
            <span>vs semana anterior</span>
          </div>
        </div>

        {/* KPI 2: Real Net Profit */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Lucro Líquido Real</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
            R$ 62.336,40
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-200 font-mono font-semibold">42.0%</span>
            <span aria-hidden="true">·</span>
            <span>Margem líquida pós-anúncios</span>
          </div>
        </div>

        {/* KPI 3: Ad Spend & ROAS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Gasto em Anúncios (ROAS)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            R$ 28.190,00
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold font-mono">5.26x ROAS</span>
            <span aria-hidden="true">·</span>
            <span>TikTok & Meta Ads</span>
          </div>
        </div>

        {/* KPI 4: Orders & AI Support Resolution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Pedidos / Atendimento IA</span>
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            645 pedidos
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">94.2%</span>
            <span aria-hidden="true">·</span>
            <span>Suporte resolvido por IA</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Executive Report & Supplier Inventory Sync Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Automated Executive Strategic Report (Gemini AI) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Inteligência Estratégica Diária</span>
                <span aria-hidden="true">·</span>
                <span>Gemini 3.8 Flash</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Relatório Executivo Automatizado da Operação
              </h2>
            </div>
            
            <button
              onClick={handleGenerateExecutiveReport}
              disabled={isLoadingReport}
              className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReport ? 'animate-spin' : ''}`} />
              <span>{isLoadingReport ? 'Analisando...' : 'Atualizar com IA'}</span>
            </button>
          </div>

          {executiveReport && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                  Parecer Executivo da IA
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {executiveReport.executiveSummary}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Produto Campeão:</span>
                  <span className="text-white font-semibold">{executiveReport.topWinningProduct}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-mono font-semibold">{executiveReport.scalingVerdict}</span>
                </div>
              </div>

              {/* Tactical Actions */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Recomendações Táticas Automatizadas para Decisão Imediata
                </h3>
                <div className="space-y-2.5">
                  {executiveReport.tacticalActions.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-950/40 border border-slate-800/80 rounded-lg p-3.5 flex items-start justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`font-semibold ${item.priority === 'Alta' ? 'text-amber-400' : 'text-indigo-400'}`}>
                            Prioridade {item.priority}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-300 font-medium">{item.action}</span>
                        </div>
                        <div className="text-xs text-emerald-400 font-mono">
                          Impacto: {item.impact}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-500 shrink-0">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Alert */}
              <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-3.5 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-semibold text-amber-300 block mb-0.5">Alerta Preditivo de Risco:</span>
                  {executiveReport.riskAlert}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Real-Time Supplier Inventory & Dropship Sync */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 mb-1">Zero Estoque Físico</div>
              <h2 className="text-base font-bold text-white">Sincronização com Fornecedores</h2>
            </div>
            <button
              onClick={handleManualSync}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sincronizar agora"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Se o fornecedor alterar preço ou esgotar estoque, a IA pausa os anúncios ou ajusta o preço da loja instantaneamente.
          </p>

          <div className="space-y-3">
            {products.map((prod) => (
              <div 
                key={prod.id}
                className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-white truncate">
                    {prod.name}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {prod.supplierStockStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate">{prod.supplier}</span>
                  <span className="font-mono tabular-nums text-slate-200">
                    {prod.inStock} un.
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Custo Fornecedor: <strong className="font-mono text-slate-200">R$ {prod.supplierCost.toFixed(2)}</strong></span>
                  <span>Margem: <strong className="font-mono text-emerald-400">{prod.profitMarginPercent.toFixed(1)}%</strong></span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('products')}
            className="w-full py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Gerenciar Catálogo & Fornecedores</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Dropshipping Live Performance Funnel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Métricas de Conversão em Tempo Real</div>
            <h2 className="text-lg font-bold text-white">Funil Automatizado de Vendas & Despacho</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Últimas 24 horas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-1">
            <span className="text-[11px] text-slate-400 block">1. Impressões de Anúncios</span>
            <div className="text-lg font-bold text-white font-mono tabular-nums">142.800</div>
            <span className="text-[11px] text-indigo-400 font-mono">TikTok & Meta Ads</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-1">
            <span className="text-[11px] text-slate-400 block">2. Cliques / Visitas Loja</span>
            <div className="text-lg font-bold text-white font-mono tabular-nums">4.260</div>
            <span className="text-[11px] text-emerald-400 font-mono">CTR Médio: 2.98%</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-1">
            <span className="text-[11px] text-slate-400 block">3. Checkout Iniciado</span>
            <div className="text-lg font-bold text-white font-mono tabular-nums">398</div>
            <span className="text-[11px] text-slate-400 font-mono">Taxa de Carinho: 9.3%</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-1">
            <span className="text-[11px] text-slate-400 block">4. Vendas Aprovadas</span>
            <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">645</div>
            <span className="text-[11px] text-emerald-400 font-mono">Conversão: 15.1%</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-1">
            <span className="text-[11px] text-slate-400 block">5. Despacho Direto</span>
            <div className="text-lg font-bold text-indigo-400 font-mono tabular-nums">638</div>
            <span className="text-[11px] text-indigo-300 font-mono">Sync Automático</span>
          </div>

        </div>
      </div>

    </div>
  );
};
