import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Send, 
  DollarSign, 
  TrendingUp, 
  Play, 
  Pause, 
  CheckCircle2, 
  Copy, 
  Smartphone, 
  Share2,
  Video,
  Eye,
  Sliders
} from 'lucide-react';
import { Product, AdCampaign } from '../types/dropship';

interface AdStudioViewProps {
  products: Product[];
  campaigns: AdCampaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<AdCampaign[]>>;
  selectedProductForAd?: Product;
}

export const AdStudioView: React.FC<AdStudioViewProps> = ({
  products,
  campaigns,
  setCampaigns,
  selectedProductForAd
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    selectedProductForAd?.id || products[0]?.id || ''
  );
  const [targetPlatform, setTargetPlatform] = useState<'TikTok Ads' | 'Meta Ads' | 'Multi-Canal'>('TikTok Ads');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedAdPack, setGeneratedAdPack] = useState<any | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

  const handleGenerateAd = async () => {
    if (!currentProduct) return;
    setIsGenerating(true);
    setGeneratedAdPack(null);

    try {
      const res = await fetch('/api/ai/generate-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: currentProduct,
          channel: targetPlatform
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedAdPack(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishCampaign = () => {
    if (!currentProduct || !generatedAdPack) return;
    setIsPublishing(true);

    setTimeout(() => {
      const newCampaign: AdCampaign = {
        id: `camp-${Date.now()}`,
        productId: currentProduct.id,
        productName: currentProduct.name,
        platform: targetPlatform === 'Multi-Canal' ? 'Multi-Canal' : targetPlatform,
        status: 'Ativo',
        dailyBudget: Number(generatedAdPack.budgetStrategy?.recommendedDailySpend) || 350.00,
        spendTotal: 0,
        revenueTotal: 0,
        roas: Number(generatedAdPack.budgetStrategy?.targetRoas) || 4.8,
        clicks: 0,
        conversions: 0,
        ctr: '3.20%',
        targetAudience: generatedAdPack.audiencePersona || {
          personaName: 'Público Alvo Otimizado por IA',
          ageRange: '22-45 anos',
          gender: 'Todos',
          painPoints: ['Necessidade de eficiência'],
          buyingTriggers: ['Entrega expressa'],
          interestsKeywords: ['E-commerce', 'Inovação']
        },
        copy: {
          primaryText: generatedAdPack.metaAds?.primaryText || 'Oferta exclusiva com garantia.',
          headline: generatedAdPack.metaAds?.headline || 'Compre agora com desconto.',
          cta: generatedAdPack.metaAds?.callToAction || 'Comprar Agora',
          tiktokHook: generatedAdPack.tiktokAds?.hookFirst3Sec,
          videoScript: generatedAdPack.tiktokAds?.script3Beats
        }
      };

      setCampaigns(prev => [newCampaign, ...prev]);
      setIsPublishing(false);
    }, 1000);
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'Ativo' ? 'Pausado' : 'Ativo'
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Studio Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Gerador Inteligente de Anúncios</span>
            <span aria-hidden="true">·</span>
            <span>Público-Alvo Perfeito</span>
            <span aria-hidden="true">·</span>
            <span>Copywriting & Roteiros TikTok</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            Estúdio de Anúncios & Segmentação de Alto Impacto
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            A IA descobre quem é o comprador perfeito para cada produto, mapeia as maiores dores emocionais e cria copies e roteiros de vídeos para Meta e TikTok Ads sem necessidade de estoque.
          </p>
        </div>

        {/* Action Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateAd}
            disabled={isGenerating || !currentProduct}
            className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Criando Campanha...' : 'Gerar Campanha com IA (Gemini)'}</span>
          </button>
        </div>
      </div>

      {/* Campaign Generator Config Controls */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product selector */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">
            Produto para Anunciar
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (R$ {p.retailPrice.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {/* Platform Selector */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">
            Canal de Tráfego Principal
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['TikTok Ads', 'Meta Ads', 'Multi-Canal'] as const).map((plat) => (
              <button
                key={plat}
                type="button"
                onClick={() => setTargetPlatform(plat)}
                className={`py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                  targetPlatform === plat
                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Context preview */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 flex items-center gap-3">
          {currentProduct && (
            <>
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded object-cover shrink-0"
              />
              <div className="overflow-hidden text-xs">
                <span className="text-white font-semibold block truncate">
                  {currentProduct.name}
                </span>
                <span className="text-slate-400 text-[11px] block">
                  Custo: R$ {currentProduct.supplierCost.toFixed(2)} · Venda: R$ {currentProduct.retailPrice.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Generated Creative Pack Section */}
      {generatedAdPack && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Campanha Gerada com Sucesso</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Diretrizes de Criação & Segmentação
              </h2>
            </div>

            <button
              onClick={handlePublishCampaign}
              disabled={isPublishing}
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Send className={`w-3.5 h-3.5 ${isPublishing ? 'animate-bounce' : ''}`} />
              <span>{isPublishing ? 'Disparando...' : 'Publicar Anúncio Automaticamente'}</span>
            </button>
          </div>

          {/* Persona & Perfect Audience */}
          {generatedAdPack.audiencePersona && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Público-Alvo Perfeito (ICP Identificado)
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Faixa: {generatedAdPack.audiencePersona.ageRange} · {generatedAdPack.audiencePersona.gender}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-slate-400 font-medium block">Dores Emocionais Críticas:</span>
                  <ul className="space-y-1 text-slate-300">
                    {generatedAdPack.audiencePersona.painPoints?.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-mono">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-slate-400 font-medium block">Gatilhos de Decisão Imediata:</span>
                  <ul className="space-y-1 text-slate-300">
                    {generatedAdPack.audiencePersona.buyingTriggers?.map((t: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-mono">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-slate-400 font-medium block">Palavras-Chave de Segmentação:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {generatedAdPack.audiencePersona.interestsKeywords?.map((kw: string, i: number) => (
                      <span key={i} className="text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ad Copies (Meta & TikTok) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Meta Ads Box */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Copy Meta Ads (Instagram & Facebook)
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedAdPack.metaAds?.primaryText, 'meta')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSection === 'meta' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Texto Principal (Primary Copy):</span>
                  <p className="text-slate-200 mt-1 p-3 bg-slate-900/80 rounded border border-slate-800 leading-relaxed">
                    {generatedAdPack.metaAds?.primaryText}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Título do Anúncio (Headline):</span>
                  <p className="text-white font-semibold mt-0.5">
                    {generatedAdPack.metaAds?.headline}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Botão de Ação (CTA):</span>
                  <span className="text-indigo-400 font-mono font-medium">
                    {generatedAdPack.metaAds?.callToAction}
                  </span>
                </div>
              </div>
            </div>

            {/* TikTok Video Script Box */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400">
                  <Video className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Roteiro Viral TikTok Ads (Vídeo Curto)
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedAdPack.tiktokAds?.hookFirst3Sec, 'tiktok')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSection === 'tiktok' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-rose-400 font-semibold block text-[11px]">
                    Hook Primeiros 3 Segundos:
                  </span>
                  <p className="text-white font-medium mt-1 p-2 bg-rose-950/20 border border-rose-900/40 rounded">
                    "{generatedAdPack.tiktokAds?.hookFirst3Sec}"
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Roteiro em 3 Tempos:</span>
                  <ol className="mt-1 space-y-1.5 text-slate-300">
                    {generatedAdPack.tiktokAds?.script3Beats?.map((beat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-indigo-400 font-semibold">{idx + 1}.</span>
                        <span>{beat}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {generatedAdPack.tiktokAds?.viralSoundtrackVibe && (
                  <div className="text-[11px] text-slate-400">
                    <span>Áudio Sugerido: </span>
                    <span className="text-slate-200">{generatedAdPack.tiktokAds.viralSoundtrackVibe}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Budget & Target ROAS */}
          {generatedAdPack.budgetStrategy && (
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-500 block">Orçamento Diário de Teste:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    R$ {Number(generatedAdPack.budgetStrategy.recommendedDailySpend).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">ROAS Alvo Projetado:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {generatedAdPack.budgetStrategy.targetRoas}
                  </span>
                </div>
              </div>

              <span className="text-slate-400 text-[11px]">
                Estratégia calculada para proteger margem mínima de 45%
              </span>
            </div>
          )}

        </div>
      )}

      {/* Active Campaigns Management Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Tráfego & Retorno em Tempo Real</div>
            <h2 className="text-base font-bold text-white">Campanhas Ativas & Performance de Anúncios</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {campaigns.length} campanhas monitoradas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 pr-4">Produto & Campanha</th>
                <th className="pb-3 pr-4">Canal</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4 text-right">Orçamento/dia</th>
                <th className="pb-3 pr-4 text-right">Gasto Total</th>
                <th className="pb-3 pr-4 text-right">Faturamento</th>
                <th className="pb-3 pr-4 text-right">ROAS</th>
                <th className="pb-3 pr-4 text-right">Conversões</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pr-4">
                    <span className="font-semibold text-white block">{camp.productName}</span>
                    <span className="text-[11px] text-slate-400">{camp.targetAudience.personaName}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-300">
                      {camp.platform}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold ${
                      camp.status === 'Ativo' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono tabular-nums text-slate-200">
                    R$ {camp.dailyBudget.toFixed(2)}
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono tabular-nums text-slate-400">
                    R$ {camp.spendTotal.toFixed(2)}
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono tabular-nums text-emerald-400 font-semibold">
                    R$ {camp.revenueTotal.toFixed(2)}
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono tabular-nums font-bold text-indigo-400">
                    {camp.roas.toFixed(2)}x
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono tabular-nums text-slate-200">
                    {camp.conversions} vendas
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                      title={camp.status === 'Ativo' ? 'Pausar campanha' : 'Ativar campanha'}
                    >
                      {camp.status === 'Ativo' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
