/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ProductsView } from './components/ProductsView';
import { AdStudioView } from './components/AdStudioView';
import { PricingView } from './components/PricingView';
import { CustomerSupportView } from './components/CustomerSupportView';
import { SecurityCenterView } from './components/SecurityCenterView';
import { StorefrontChatModal } from './components/StorefrontChatModal';
import { INITIAL_PRODUCTS, INITIAL_CAMPAIGNS, INITIAL_TICKETS } from './data/mockData';
import { Product, AdCampaign, SupportTicket } from './types/dropship';
import { MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_CAMPAIGNS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  
  const [autopilotActive, setAutopilotActive] = useState<boolean>(true);
  const [isAutopilotRunning, setIsAutopilotRunning] = useState<boolean>(false);
  const [cycleNotification, setCycleNotification] = useState<string | null>(null);

  const [storefrontChatOpen, setStorefrontChatOpen] = useState<boolean>(false);
  const [selectedProductForAd, setSelectedProductForAd] = useState<Product | undefined>(undefined);
  const [selectedProductForPricing, setSelectedProductForPricing] = useState<Product | undefined>(undefined);

  const handleTriggerAutopilotCycle = () => {
    setIsAutopilotRunning(true);
    setCycleNotification(null);

    setTimeout(() => {
      // Refresh mock stock with small variance to show real-time synchronization
      setProducts(prev => prev.map(p => ({
        ...p,
        inStock: p.inStock + Math.floor(Math.random() * 20) - 5
      })));

      setIsAutopilotRunning(false);
      setCycleNotification('Ciclo Autônomo executado com sucesso: Estoques sincronizados com fornecedores, margens recalculadas e anúncios operando com ROAS 5.26x.');
      
      setTimeout(() => {
        setCycleNotification(null);
      }, 5000);
    }, 1500);
  };

  const handleSelectProductForAd = (product: Product) => {
    setSelectedProductForAd(product);
    setActiveTab('ads');
  };

  const handleSelectProductForPricing = (product: Product) => {
    setSelectedProductForPricing(product);
    setActiveTab('pricing');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header compliant with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        autopilotActive={autopilotActive}
        onTriggerAutopilotCycle={handleTriggerAutopilotCycle}
        isAutopilotRunning={isAutopilotRunning}
      />

      {/* Floating Cycle Execution Banner */}
      {cycleNotification && (
        <div className="bg-indigo-950/80 border-b border-indigo-500/40 px-4 py-2.5 text-xs text-indigo-200 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{cycleNotification}</span>
        </div>
      )}

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            products={products}
            campaigns={campaigns}
            autopilotActive={autopilotActive}
            setAutopilotActive={setAutopilotActive}
            onOpenStorefrontChat={() => setStorefrontChatOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'products' && (
          <ProductsView
            products={products}
            setProducts={setProducts}
            onSelectProductForAd={handleSelectProductForAd}
            onSelectProductForPricing={handleSelectProductForPricing}
          />
        )}

        {activeTab === 'ads' && (
          <AdStudioView
            products={products}
            campaigns={campaigns}
            setCampaigns={setCampaigns}
            selectedProductForAd={selectedProductForAd}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingView
            products={products}
            setProducts={setProducts}
            selectedProductForPricing={selectedProductForPricing}
          />
        )}

        {activeTab === 'support' && (
          <CustomerSupportView
            tickets={tickets}
            setTickets={setTickets}
            onOpenStorefrontChat={() => setStorefrontChatOpen(true)}
          />
        )}

        {activeTab === 'security' && (
          <SecurityCenterView />
        )}
      </main>

      {/* Floating Customer Support Button */}
      {!storefrontChatOpen && (
        <button
          onClick={() => setStorefrontChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          title="Abrir Chat de Suporte IA da Loja"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-semibold pr-1 hidden sm:inline">Suporte IA 24/7</span>
        </button>
      )}

      {/* Floating Storefront Chat Widget Simulation */}
      <StorefrontChatModal
        isOpen={storefrontChatOpen}
        onClose={() => setStorefrontChatOpen(false)}
      />
    </div>
  );
}
