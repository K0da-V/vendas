export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  supplier: string;
  supplierUrl: string;
  supplierCost: number; // in BRL
  retailPrice: number; // in BRL
  competitorAvgPrice: number;
  inStock: number;
  supplierStockStatus: 'Em Estoque' | 'Estoque Baixo' | 'Esgotado';
  syncStatus: 'Sincronizado' | 'Pendente' | 'Alerta de Preço';
  shippingDays: string;
  salesCount: number;
  trendScore: number; // 0 - 100
  profitMarginPercent: number;
  isImportedToStore: boolean;
  idealAudience: string;
  description: string;
  viralReason: string;
}

export interface AdCampaign {
  id: string;
  productId: string;
  productName: string;
  platform: 'TikTok Ads' | 'Meta Ads' | 'Google Shopping' | 'Multi-Canal';
  status: 'Ativo' | 'Pausado' | 'Em Análise' | 'Otimizando';
  dailyBudget: number;
  spendTotal: number;
  revenueTotal: number;
  roas: number;
  clicks: number;
  conversions: number;
  ctr: string;
  targetAudience: {
    personaName: string;
    ageRange: string;
    gender: string;
    painPoints: string[];
    buyingTriggers: string[];
    interestsKeywords: string[];
  };
  copy: {
    primaryText: string;
    headline: string;
    cta: string;
    tiktokHook?: string;
    videoScript?: string[];
  };
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'ai' | 'agent';
  text: string;
  timestamp: string;
  orderNumber?: string;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmailMasked: string;
  orderNumber: string;
  subject: string;
  status: 'Resolvido pela IA' | 'Em Andamento' | 'Escalado Humano';
  csat: number; // 1-5
  lastMessage: string;
  timeAgo: string;
  messages: SupportMessage[];
}

export interface ExecutiveReport {
  executiveSummary: string;
  topWinningProduct: string;
  tacticalActions: {
    priority: 'Alta' | 'Média';
    action: string;
    impact: string;
  }[];
  riskAlert: string;
  scalingVerdict: string;
}

export interface SecuritySettings {
  endToEndEncryption: boolean;
  maskCustomerPII: boolean;
  zeroRetentionAI: boolean;
  twoFactorAuth: boolean;
  autoPurgeOrdersDays: number;
  lgpdComplianceActive: boolean;
  auditLogging: boolean;
}
