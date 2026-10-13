import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MODEL_NAME = 'gemini-3.8-flash';

// AI Product Sourcing & Trend Scout
app.post('/api/ai/scout-products', async (req, res) => {
  try {
    const { category, minMargin, marketTrend } = req.body;

    const prompt = `Você é o Agente Especialista em Mineração e Scouting de Produtos Vencedores para Dropshipping Global e Nacional.
Analise as tendências do mercado atual (TikTok Shop, AliExpress Trending, CJ Dropshipping, Amazon Movers & Shakers) e gere 3 oportunidades reais e virais de produtos de alto lucro com envio sem estoque.

Critérios:
- Categoria de interesse: ${category || 'Geral / Alta Tendência'}
- Margem de lucro líquida mínima desejada: ${minMargin || '50%'}
- Tendência de mercado: ${marketTrend || 'Produtos virais com alta resolução de dor e apelo visual'}

Responda ESTRITAMENTE em formato JSON com o seguinte schema:
{
  "products": [
    {
      "id": "prod_1",
      "name": "Nome Comercial Vencedor em Português",
      "category": "Categoria",
      "supplier": "Nome do fornecedor (ex: CJ Dropshipping, AliExpress Direct, Spocket Global)",
      "supplierCost": 89.50,
      "suggestedRetailPrice": 229.90,
      "projectedMargin": "61%",
      "inStock": 1420,
      "shippingTimeDays": "7-12 dias",
      "trendScore": 96,
      "viralReason": "Por que viralizou ou resolve uma dor aguda",
      "idealAudience": "Descrição concisa do público comprador ideal",
      "targetChannels": ["TikTok Ads", "Meta Ads"]
    }
  ],
  "marketAnalysis": "Resumo executivo de 2 frases sobre a janela de oportunidade deste nicho."
}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error scouting products:', error);
    res.status(500).json({ error: error.message || 'Falha ao buscar produtos com IA' });
  }
});

// AI Ad Campaign & Creative Generator
app.post('/api/ai/generate-ad', async (req, res) => {
  try {
    const { product, channel = 'TikTok & Meta' } = req.body;

    const prompt = `Você é o Diretor de Tráfego Pago e Copywriting de Elite para Dropshipping e E-commerce.
Crie uma campanha publicitária completa e de alta conversão para o produto:
- Nome: ${product.name}
- Preço de Venda: R$ ${product.price || product.suggestedRetailPrice}
- Benefícios principais: ${product.description || product.viralReason || 'Tecnologia inovadora que facilita o dia a dia'}
- Canal prioritário: ${channel}

Gere o planejamento completo em JSON com:
1. "audiencePersona":
   - "targetName": Nome do arquétipo de cliente
   - "ageRange": Faixa etária
   - "gender": Gênero preponderante
   - "painPoints": [Lista de 3 maiores dores]
   - "buyingTriggers": [Lista de 3 gatilhos de compra imediatos]
   - "interestsKeywords": [5 palavras-chave de interesses para Meta/TikTok Ads]
2. "metaAds":
   - "primaryText": Texto persuasivo (hook + dor + solução + oferta)
   - "headline": Título chamativo para o criativo
   - "callToAction": Chamada para ação recomendada (ex: "Obter Oferta", "Comprar Agora")
3. "tiktokAds":
   - "hookFirst3Sec": O que falar/mostrar nos primeiros 3 segundos para reter atenção
   - "script3Beats": [Passo 1: Choque/Curiosidade, Passo 2: Demonstração sem esforço, Passo 3: Oferta irresistível]
   - "viralSoundtrackVibe": Estilo de áudio recomendado
4. "budgetStrategy":
   - "recommendedDailySpend": Valor diário recomendado para teste
   - "targetRoas": ROAS esperado (ex: 3.4x)

Responda APENAS em JSON válido.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating ad:', error);
    res.status(500).json({ error: error.message || 'Falha ao gerar anúncio com IA' });
  }
});

// AI Dynamic Pricing & Market Demand Optimizer
app.post('/api/ai/optimize-price', async (req, res) => {
  try {
    const { product, competitorAvg, currentPrice, supplierCost, currentDemand } = req.body;

    const prompt = `Você é o Engenheiro de Precificação Algorítmica e Análise de Demanda de E-commerce.
Analise os dados deste produto em dropshipping:
- Nome do Produto: ${product.name}
- Custo do Fornecedor (COGS): R$ ${supplierCost}
- Preço Atual na Loja: R$ ${currentPrice}
- Média da Concorrência: R$ ${competitorAvg || currentPrice * 1.05}
- Status da Demanda de Mercado: ${currentDemand || 'Alta / Tendência Crescente'}

Calcule a estratégia ótima de preço para maximizar o LUCRO LÍQUIDO (considerando margem mínima de segurança, taxas de gateway de 4.9% e frete dropshipping).
Responda em formato JSON:
{
  "optimizedPrice": 0.00,
  "netProfitEstimate": 0.00,
  "marginPercentage": "00%",
  "priceElasticity": "Inelástica" | "Elástica" | "Neutra",
  "recommendedAction": "Aumentar Preço" | "Reduzir Preço" | "Manter com Escala",
  "rationale": "Justificativa econômica e comportamental clara em 2 frases.",
  "competitorDifferential": "-3.5% vs concorrência",
  "urgencyDiscountOffer": "Ex: R$ 249,90 riscado por R$ 219,90 nas próximas 24h"
}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error optimizing price:', error);
    res.status(500).json({ error: error.message || 'Falha ao otimizar preço com IA' });
  }
});

// AI Customer Support Chat Engine
app.post('/api/ai/support-chat', async (req, res) => {
  try {
    const { messages, customerContext } = req.body;

    const systemInstruction = `Você é o Assistente Virtual Inteligente de Atendimento ao Cliente de uma loja online de dropshipping de alto padrão.
Seu objetivo é resolver dúvidas instantaneamente, transmitir máxima confiança e segurança, rastrear pedidos e reduzir estornos e chargebacks.

Políticas da Loja:
- Prazo de entrega internacional prioritário: 6 a 12 dias úteis com código de rastreio oficial dos Correios / transportadora expressa.
- Política de trocas e devoluções: 30 dias de garantia incondicional sem custo ao cliente (conforme Código de Defesa do Consumidor e política premium).
- Segurança de pagamento: Criptografia de ponta a ponta, processamento via Mercado Pago / Stripe, dados blindados (LGPD/GDPR compliance).
- Pedidos cadastrados no sistema para consulta rápida:
  * Pedido #BR-94821-XP: "Máscara Smart Luna Sleep" -> Status: "Em rota de entrega para São Paulo/SP. Previsão: amanhã até 17h. Código de rastreio: NL948218492BR".
  * Pedido #BR-83104-NV: "Estação Magnética Titanium 3 em 1" -> Status: "Despachado da alfândega sem taxas adicionais. Em trânsito para Curitiba/PR. Previsão: 3 dias úteis. Código: BR831049214NV".
  * Pedido #BR-72091-MC: "Espresso Maker Portátil Nomad" -> Status: "Objeto postado pelo fornecedor internacional. Código: CJ720919420US".

Diretrizes de Resposta:
- Seja prestativo, educado, empático e resolutivo.
- Se o usuário fornecer um número de pedido ou rastreio, consulte os pedidos acima ou simule o status com precisão acolhedora.
- Se for dúvida de devolução ou suporte, explique o passo a passo com calma.
- Fale em português do Brasil impecável. Mantenha as respostas concisas e objetivas.`;

    const chatContents = (messages || []).map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    if (chatContents.length === 0) {
      chatContents.push({
        role: 'user',
        parts: [{ text: 'Olá, gostaria de ajuda com meu pedido.' }],
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    res.json({
      reply: response.text || 'Olá! Como posso ajudar você com seu pedido hoje?',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in customer support chat:', error);
    res.status(500).json({ error: error.message || 'Falha no suporte com IA' });
  }
});

// AI Executive Daily Strategic Intelligence Report
app.post('/api/ai/executive-report', async (req, res) => {
  try {
    const { storeStats } = req.body;

    const prompt = `Você é o Diretor Estratégico (COO & CFO de Inteligência Artificial) especializado em operações de Dropshipping escaláveis.
Analise a performance diária da operação:
- Faturamento Bruto: R$ ${storeStats.grossRevenue || '148.420,00'}
- Lucro Líquido Real: R$ ${storeStats.netProfit || '62.336,40'} (Margem Líquida: ${storeStats.margin || '42%'})
- Gasto com Anúncios (Ad Spend): R$ ${storeStats.adSpend || '28.190,00'} (ROAS Geral: ${storeStats.roas || '5.26x'})
- Total de Pedidos Faturados: ${storeStats.orders || '645'} pedidos
- Fornecedores Integrados: 12 fornecedores (com sincronização de estoque ativa a cada 5 min)
- Taxa de Resolução do Suporte via IA: ${storeStats.aiSupportResolution || '94.2%'}

Gere um Relatório Executivo Automatizado em formato JSON:
{
  "executiveSummary": "Resumo executivo de alto impacto (2 frases)",
  "topWinningProduct": "Nome do produto de maior retorno do dia",
  "tacticalActions": [
    {
      "priority": "Alta" | "Média",
      "action": "Ação operacional específica (ex: Aumentar orçamento no TikTok Ads em 25% no produto X)",
      "impact": "Impacto projetado de lucro ou mitigação"
    },
    {
      "priority": "Alta" | "Média",
      "action": "Ajuste de fornecedor ou estoque",
      "impact": "Impacto projetado"
    },
    {
      "priority": "Alta" | "Média",
      "action": "Otimização de checkout ou suporte",
      "impact": "Impacto projetado"
    }
  ],
  "riskAlert": "Alerta preventivo de risco (ex: Fornecedor X com tempo de despacho subindo de 2 para 4 dias)",
  "scalingVerdict": "AVANÇAR COM ESCALA AGRESSIVA" | "CONSOLIDAR MARGENS" | "ESTABILIZAR"
}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating executive report:', error);
    res.status(500).json({ error: error.message || 'Falha ao gerar relatório executivo' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`AutoDrop AI server running on http://localhost:${PORT}`);
  });
}

startServer();
