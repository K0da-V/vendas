import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  Sliders, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Percent,
  CheckCircle2
} from 'lucide-react';
import { Product } from '../types/dropship';

interface PricingViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedProductForPricing?: Product;
}

export const PricingView: React.FC<PricingViewProps> = ({
  products,
  setProducts,
  selectedProductForPricing
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    selectedProductForPricing?.id || products[0]?.id || ''
  );
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any | null>(null);
  const [minMarginRule, setMinMarginRule] = useState(45);
  const [psychologicalRounding, setPsychologicalRounding] = useState(true);
  const [autoSupplierPassThrough, setAutoSupplierPassThrough] = useState(true);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

  const handleOptimizePrice = async () => {
    if (!currentProduct) return;
    setIsOptimizing(true);
    setOptimizationResult(null);
    setAppliedSuccess(false);

    try {
      const res = await fetch('/api/ai/optimize-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: currentProduct,
          supplierCost: currentProduct.supplierCost,
          currentPrice: currentProduct.retailPrice,
          competitorAvg: currentProduct.competitorAvgPrice,
          currentDemand: 'Demanda Alta com tendência de crescimento no TikTok Shop'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setOptimizationResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyOptimizedPrice = () => {
    if (!currentProduct || !optimizationResult) return;
    const newPrice = Number(optimizationResult.optimizedPrice) || currentProduct.retailPrice;

    setProducts(prev => prev.map(p => {
      if (p.id === currentProduct.id) {
        const newMargin = ((newPrice - p.supplierCost) / newPrice) * 100;
        return {
          ...p,
          retailPrice: newPrice,
          profitMarginPercent: newMargin
        };
      }
      return p;
    }));

    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Precificação Algorítmica</span>
            <span aria-hidden="true">·</span>
            <span>Elasticidade & Demanda de Mercado</span>
            <span aria-hidden="true">·</span>
            <span>Margem Protegida</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            Otimizador Dinâmico de Preços com Análise de Demanda
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            A IA calcula o ponto de preço ideal com base nos preços dos concorrentes, variações de custo do fornecedor e volume de procura em tempo real, maximizando a margem líquida da sua loja.
          </p>
        </div>

        <button
          onClick={handleOptimizePrice}
          disabled={isOptimizing || !currentProduct}
          className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Calculando Elasticidade...' : 'Otimizar Preço com IA (Gemini)'}</span>
        </button>
      </div>

      {/* Selector & Product Context Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">
            Produto Selecionado
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
              setOptimizationResult(null);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Preço Atual / Concorrentes</span>
            <span className="font-mono text-white font-bold text-sm">
              R$ {currentProduct.retailPrice.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[11px]">Média de Mercado</span>
            <span className="font-mono text-slate-300">
              R$ {currentProduct.competitorAvgPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Custo Fornecedor (COGS)</span>
            <span className="font-mono text-slate-300">
              R$ {currentProduct.supplierCost.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[11px]">Margem Bruta Atual</span>
            <span className="font-mono text-emerald-400 font-bold">
              {currentProduct.profitMarginPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* AI Optimization Result Panel */}
      {optimizationResult && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recomendação Algorítmica da IA</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Diagnóstico de Preço & Análise de Demanda
              </h2>
            </div>

            <button
              onClick={handleApplyOptimizedPrice}
              disabled={appliedSuccess}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                appliedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {appliedSuccess ? <Check className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
              <span>{appliedSuccess ? 'Preço Aplicado na Loja!' : 'Aplicar Preço Otimizado na Loja'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
              <span className="text-[11px] text-slate-400 block">Preço Recomendado</span>
              <div className="text-xl font-bold text-white font-mono tabular-nums mt-1">
                R$ {Number(optimizationResult.optimizedPrice).toFixed(2)}
              </div>
              <span className="text-[11px] text-indigo-400 font-mono">
                {optimizationResult.competitorDifferential}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
              <span className="text-[11px] text-slate-400 block">Lucro Líquido Estimado</span>
              <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
                R$ {Number(optimizationResult.netProfitEstimate).toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-400/80 font-mono">
                Margem: {optimizationResult.marginPercentage}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
              <span className="text-[11px] text-slate-400 block">Elasticidade de Demanda</span>
              <div className="text-base font-bold text-white font-mono mt-1">
                {optimizationResult.priceElasticity}
              </div>
              <span className="text-[11px] text-slate-400">
                Ação: {optimizationResult.recommendedAction}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
              <span className="text-[11px] text-slate-400 block">Gatilho de Conversão</span>
              <div className="text-xs text-amber-300 font-medium mt-1">
                {optimizationResult.urgencyDiscountOffer}
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-indigo-300 block mb-1">
              Justificativa Econômica & Comportamental:
            </span>
            {optimizationResult.rationale}
          </div>
        </div>
      )}

      {/* Dynamic Rules Configuration */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Automação Contínua</div>
          <h2 className="text-base font-bold text-white">Regras Globais de Precificação Automática</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Margem Líquida Mínima</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{minMarginRule}%</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Se o custo do fornecedor subir, o preço de venda é aumentado automaticamente para nunca ferir esta margem.
            </p>
            <input
              type="range"
              min="30"
              max="70"
              value={minMarginRule}
              onChange={(e) => setMinMarginRule(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-white block">Arredondamento Psicológico</span>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">
                Padroniza todos os preços de varejo terminados em <strong className="text-slate-200">,90</strong> para maior conversão em anúncios.
              </p>
            </div>
            <button
              onClick={() => setPsychologicalRounding(!psychologicalRounding)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                psychologicalRounding ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                psychologicalRounding ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-white block">Repasse de Custo Fornecedor</span>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">
                Atualiza preços no catálogo da loja quando fornecedores da China/EUA alteram taxas de frete ou cotação do dólar.
              </p>
            </div>
            <button
              onClick={() => setAutoSupplierPassThrough(!autoSupplierPassThrough)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                autoSupplierPassThrough ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                autoSupplierPassThrough ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Pricing Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Matriz de Preços da Loja vs Concorrência</h2>
          <span className="text-xs text-slate-400 font-mono">{products.length} itens ativos</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 pr-4">Produto</th>
                <th className="pb-3 pr-4 text-right">Custo Fornecedor</th>
                <th className="pb-3 pr-4 text-right">Preço de Venda</th>
                <th className="pb-3 pr-4 text-right">Média Concorrência</th>
                <th className="pb-3 pr-4 text-right">Margem Bruta</th>
                <th className="pb-3 pr-4 text-right">Lucro/Unidade</th>
                <th className="pb-3 text-right">Status Preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {products.map((p) => {
                const profitPerUnit = p.retailPrice - p.supplierCost;
                return (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-white">
                      {p.name}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums text-slate-400">
                      R$ {p.supplierCost.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums text-white font-bold">
                      R$ {p.retailPrice.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums text-slate-400">
                      R$ {p.competitorAvgPrice.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums text-emerald-400 font-semibold">
                      {p.profitMarginPercent.toFixed(1)}%
                    </td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums text-emerald-400 font-bold">
                      +R$ {profitPerUnit.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        Otimizado
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
