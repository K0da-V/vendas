import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Plus, 
  TrendingUp, 
  Check, 
  Clock, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Product } from '../types/dropship';

interface ProductsViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onSelectProductForAd: (product: Product) => void;
  onSelectProductForPricing: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  setProducts,
  onSelectProductForAd,
  onSelectProductForPricing,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isScouting, setIsScouting] = useState(false);
  const [scoutedResults, setScoutedResults] = useState<any[]>([]);
  const [syncingProductId, setSyncingProductId] = useState<string | null>(null);

  const categories = ['Todas', 'Saúde & Bem-Estar', 'Tecnologia & Acessórios', 'Casa & Gastronomia', 'Livros & Acessórios'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleScoutProducts = async () => {
    setIsScouting(true);
    try {
      const res = await fetch('/api/ai/scout-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory === 'Todas' ? 'Viral Gadgets & Lifestyle' : selectedCategory,
          minMargin: '55%',
          marketTrend: 'Produtos com alta viralidade no TikTok Shop e fornecedores com envio expresso internacional'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setScoutedResults(data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScouting(false);
    }
  };

  const handleAddScoutedProduct = (scouted: any) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: scouted.name,
      category: scouted.category || 'Inovação & Gadgets',
      image: products[0].image, // fallback to high-quality generated asset
      supplier: scouted.supplier || 'CJ Dropshipping Express',
      supplierUrl: 'https://cjdropshipping.com',
      supplierCost: Number(scouted.supplierCost) || 65.00,
      retailPrice: Number(scouted.suggestedRetailPrice) || 189.90,
      competitorAvgPrice: (Number(scouted.suggestedRetailPrice) || 189.90) * 1.08,
      inStock: Number(scouted.inStock) || 1850,
      supplierStockStatus: 'Em Estoque',
      syncStatus: 'Sincronizado',
      shippingDays: scouted.shippingTimeDays || '6-12 dias úteis',
      salesCount: 0,
      trendScore: Number(scouted.trendScore) || 92,
      profitMarginPercent: 65,
      isImportedToStore: true,
      idealAudience: scouted.idealAudience || 'Consumidores de produtos inovadores',
      description: scouted.viralReason || 'Produto minerado automaticamente por IA com alta margem de lucro.',
      viralReason: scouted.viralReason || 'Alta retenção de vídeo e apelo visual comprovado.'
    };

    setProducts(prev => [newProd, ...prev]);
    setScoutedResults(prev => prev.filter(p => p.name !== scouted.name));
  };

  const handleSyncSupplierStock = (productId: string) => {
    setSyncingProductId(productId);
    setTimeout(() => {
      setProducts(prev => prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            syncStatus: 'Sincronizado',
            inStock: p.inStock + Math.floor(Math.random() * 50) - 10
          };
        }
        return p;
      }));
      setSyncingProductId(null);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Scout Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Mineração Autônoma</span>
            <span aria-hidden="true">·</span>
            <span>Integração de Fornecedores</span>
            <span aria-hidden="true">·</span>
            <span>Estoque em Tempo Real</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            Catálogo sem Estoque Físico & Sourcing Automatizado
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            A IA pesquisa fornecedores internacionais (CJ Dropshipping, AliExpress, Zendrop, Spocket), verifica a disponibilidade de estoque e importa produtos lucrativos com 1 clique.
          </p>
        </div>

        <button
          onClick={handleScoutProducts}
          disabled={isScouting}
          className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isScouting ? 'animate-spin' : ''}`} />
          <span>{isScouting ? 'Minerando Oportunidades...' : 'Minerar Produtos com IA (Gemini)'}</span>
        </button>
      </div>

      {/* Scouted AI Results Drawer / Card Grid if available */}
      {scoutedResults.length > 0 && (
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white">
                Oportunidades Mineradas pelo Agente de IA
              </h2>
            </div>
            <span className="text-xs text-indigo-300 font-mono">
              Pronto para importação sem estoque
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scoutedResults.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{item.supplier}</span>
                    <span className="text-emerald-400 font-mono font-semibold">Score: {item.trendScore}/100</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {item.viralReason}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Custo Fornecedor:</span>
                    <span className="font-mono text-slate-200">R$ {Number(item.supplierCost).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Preço Sugerido:</span>
                    <span className="font-mono text-emerald-400 font-bold">R$ {Number(item.suggestedRetailPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Prazo de Envio:</span>
                    <span className="font-mono text-slate-300">{item.shippingTimeDays}</span>
                  </div>

                  <button
                    onClick={() => handleAddScoutedProduct(item)}
                    className="w-full mt-2 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar à Minha Loja</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produto ou fornecedor..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              {/* Image Frame with fallback */}
              <div className="relative aspect-4/3 bg-slate-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-950/80 backdrop-blur-sm text-slate-300 border border-slate-800">
                  {product.category}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-950/80 backdrop-blur-sm text-emerald-400 border border-emerald-800/60">
                  {product.profitMarginPercent.toFixed(0)}% margem
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Supplier & Real-time Stock Details */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="truncate">{product.supplier}</span>
                    <button
                      onClick={() => handleSyncSupplierStock(product.id)}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      title="Sincronizar estoque agora"
                    >
                      <RefreshCw className={`w-3 h-3 ${syncingProductId === product.id ? 'animate-spin' : ''}`} />
                      <span className="text-[10px]">Sync</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Estoque Fornecedor:</span>
                    <span className="font-mono font-semibold text-slate-200 tabular-nums">
                      {product.inStock} un.
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Tempo de Despacho:</span>
                    <span className="font-mono text-slate-300">{product.shippingDays}</span>
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Preço de Venda</span>
                    <span className="text-base font-bold text-white font-mono tabular-nums">
                      R$ {product.retailPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Custo Fornecedor</span>
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      R$ {product.supplierCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-4 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectProductForAd(product)}
                className="py-2 text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Criar Anúncio</span>
              </button>

              <button
                onClick={() => onSelectProductForPricing(product)}
                className="py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <TrendingUp className="w-3 h-3" />
                <span>Otimizar Preço</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
