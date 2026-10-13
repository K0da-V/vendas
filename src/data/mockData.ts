import { Product, AdCampaign, SupportTicket, SecuritySettings } from '../types/dropship';

import sleepMaskImg from '../assets/images/smart_sleep_mask_1791891085457.jpg';
import chargerImg from '../assets/images/magnetic_charger_station_1791891086191.jpg';
import espressoImg from '../assets/images/portable_espresso_maker_1791891087409.jpg';
import readingLightImg from '../assets/images/led_neck_reading_light_1791891087097.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Máscara Smart Luna Sleep com Áudio Condução Óssea',
    category: 'Saúde & Bem-Estar',
    image: sleepMaskImg,
    supplier: 'CJ Dropshipping Shenzhen Direct',
    supplierUrl: 'https://cjdropshipping.com/product/smart-sleep-mask',
    supplierCost: 78.40,
    retailPrice: 249.90,
    competitorAvgPrice: 269.00,
    inStock: 2840,
    supplierStockStatus: 'Em Estoque',
    syncStatus: 'Sincronizado',
    shippingDays: '6-10 dias úteis',
    salesCount: 1420,
    trendScore: 97,
    profitMarginPercent: 68.6,
    isImportedToStore: true,
    idealAudience: 'Executivos, profissionais com insônia, viajantes frequentes e entusiastas de biohacking de 25-45 anos.',
    description: 'Máscara blackout 100% ergonômica com transdutores de condução óssea integrados e sensor inteligente de sono.',
    viralReason: 'Viral no TikTok com vídeos demonstrando bloqueio absoluto de luz azul e relaxamento guiado.'
  },
  {
    id: 'prod-002',
    name: 'Estação de Carga Magnética Titânio 3-em-1 Dobrável',
    category: 'Tecnologia & Acessórios',
    image: chargerImg,
    supplier: 'AliExpress Direct Gold Partner',
    supplierUrl: 'https://aliexpress.com/item/titanium-3in1-foldable-magsafe',
    supplierCost: 64.20,
    retailPrice: 199.90,
    competitorAvgPrice: 219.90,
    inStock: 3410,
    supplierStockStatus: 'Em Estoque',
    syncStatus: 'Sincronizado',
    shippingDays: '7-12 dias úteis',
    salesCount: 2890,
    trendScore: 94,
    profitMarginPercent: 67.9,
    isImportedToStore: true,
    idealAudience: 'Proprietários de ecossistema Apple/Android (iPhone, Apple Watch, AirPods), nômades digitais e profissionais de escritório.',
    description: 'Carregador wireless MagSafe dobrável em liga de titânio aeroespacial, recarrega 3 dispositivos em alta velocidade sem fios emaranhados.',
    viralReason: 'Demonstração de mesa limpa minimalista com alta taxa de conversão em anúncios de lifestyle de produtividade.'
  },
  {
    id: 'prod-003',
    name: 'Cafeteira Espresso Portátil Elétrica Nomad Elite',
    category: 'Casa & Gastronomia',
    image: espressoImg,
    supplier: 'Zendrop Premium Verified',
    supplierUrl: 'https://zendrop.com/catalog/nomad-portable-espresso',
    supplierCost: 112.00,
    retailPrice: 349.90,
    competitorAvgPrice: 389.00,
    inStock: 890,
    supplierStockStatus: 'Em Estoque',
    syncStatus: 'Sincronizado',
    shippingDays: '8-14 dias úteis',
    salesCount: 814,
    trendScore: 91,
    profitMarginPercent: 68.0,
    isImportedToStore: true,
    idealAudience: 'Amantes de café especial, motoristas, acampadores, nômades e profissionais que valorizam espresso cremoso onde quer que estejam.',
    description: 'Cafeteira espresso de extração a 18 bar de pressão com aquecimento elétrico autônomo e bateria recarregável USB-C.',
    viralReason: 'Vídeos de extração de café cremoso no meio do trânsito ou no escritório acumulam milhões de visualizações.'
  },
  {
    id: 'prod-004',
    name: 'Luminária Ergonômica de Leitura de Pescoço GlōMate',
    category: 'Livros & Acessórios',
    image: readingLightImg,
    supplier: 'Spocket Global Express',
    supplierUrl: 'https://spocket.co/products/glomate-neck-light',
    supplierCost: 32.50,
    retailPrice: 129.90,
    competitorAvgPrice: 139.90,
    inStock: 4120,
    supplierStockStatus: 'Em Estoque',
    syncStatus: 'Sincronizado',
    shippingDays: '5-9 dias úteis',
    salesCount: 3940,
    trendScore: 89,
    profitMarginPercent: 75.0,
    isImportedToStore: true,
    idealAudience: 'Leitores noturnos, parceiros de quarto que não querem luz incômoda, estudantes e praticantes de artesanato/tricô.',
    description: 'Luminária flexível antibrilho com ajuste de temperatura de luz (âmbar suave para não despertar o sono) e 80 horas de bateria.',
    viralReason: 'O apelo "leia até tarde sem acordar seu parceiro(a)" possui ressonância emocional instantânea e zero atrito de compra.'
  }
];

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-01',
    productId: 'prod-001',
    productName: 'Máscara Smart Luna Sleep',
    platform: 'TikTok Ads',
    status: 'Ativo',
    dailyBudget: 450.00,
    spendTotal: 3150.00,
    revenueTotal: 18270.00,
    roas: 5.80,
    clicks: 14200,
    conversions: 73,
    ctr: '2.84%',
    targetAudience: {
      personaName: 'Otimizador de Sono & Produtividade',
      ageRange: '24-44 anos',
      gender: 'Todos (54% Masc / 46% Fem)',
      painPoints: ['Insônia e acordar cansado', 'Luz incomodando durante o sono', 'Fones de ouvido convencionais machucando de lado'],
      buyingTriggers: ['Indução a sono profundo em 15min', 'Design ultra fino para dormir de lado', 'Garantia de 30 noites de teste'],
      interestsKeywords: ['Biohacking', 'Qualidade do Sono', 'Mindfulness', 'Meditação Guiada', 'Rotina Noturna']
    },
    copy: {
      primaryText: 'Você passa horas rolando na cama tentando desligar a mente? A nova Luna Sleep combina blackout total com condução óssea que relaxa as ondas cerebrais sem machucar a orelha.',
      headline: 'Dormir em 15 minutos agora é ciência. Teste por 30 noites sem risco.',
      cta: 'Experimentar com 35% OFF',
      tiktokHook: 'Se você demora mais de 20 minutos para pegar no sono, assista até o final...',
      videoScript: [
        'Corte rápido: pessoa revirando no travesseiro com o celular vs colocando a máscara Luna.',
        'Close nos transdutores de condução óssea suaves e demonstração dormindo confortavelmente de lado.',
        'Tela de checkout com entrega expressa e cupom aplicado.'
      ]
    }
  },
  {
    id: 'camp-02',
    productId: 'prod-002',
    productName: 'Estação Magnética Titânio 3-em-1',
    platform: 'Meta Ads',
    status: 'Ativo',
    dailyBudget: 600.00,
    spendTotal: 5400.00,
    revenueTotal: 27986.00,
    roas: 5.18,
    clicks: 19800,
    conversions: 140,
    ctr: '3.12%',
    targetAudience: {
      personaName: 'Minimalista Tecnológico',
      ageRange: '22-50 anos',
      gender: 'Todos (62% Masc / 38% Fem)',
      painPoints: ['Mesa cheia de cabos desorganizados', 'Esquecer de carregar o relógio ou fones', 'Carregadores de plástico baratos que quebram'],
      buyingTriggers: ['Organização estética instantânea', 'Construção premium em titânio', 'Dobrável para levar em viagens'],
      interestsKeywords: ['Apple Inc.', 'Setup Minimalista', 'Home Office', 'Gadgets de Produtividade', 'Design Industrial']
    },
    copy: {
      primaryText: 'Livre-se de 3 cabos embolados na sua mesa de cabeceira com uma única peça de titânio usinado. Carregue seu celular, relógio e fone ao mesmo tempo com fixação magnética ultra forte.',
      headline: 'A última estação de carregamento que você precisará comprar.',
      cta: 'Garantir Unidade com Frete Grátis'
    }
  },
  {
    id: 'camp-03',
    productId: 'prod-003',
    productName: 'Cafeteira Espresso Portátil Nomad Elite',
    platform: 'Multi-Canal',
    status: 'Ativo',
    dailyBudget: 350.00,
    spendTotal: 2100.00,
    revenueTotal: 9447.30,
    roas: 4.50,
    clicks: 8640,
    conversions: 27,
    ctr: '2.45%',
    targetAudience: {
      personaName: 'Entusiasta de Café On-the-Go',
      ageRange: '26-55 anos',
      gender: 'Todos',
      painPoints: ['Café ruim de posto ou máquina corporativa', 'Falta de tempo para moer café em viagens', 'Gastar R$ 18 por xícara em cafeterias'],
      buyingTriggers: ['Espresso com crema real a 18 bar de pressão em qualquer lugar', 'Aquecimento automático de água sem fogão', 'Bateria durável de 50 xícaras'],
      interestsKeywords: ['Café Especial', 'Nespresso', 'Road Trips', 'Camping & Trekking', 'Gourmet Lifestyle']
    },
    copy: {
      primaryText: 'Não tome mais café frio ou requentado. Tenha um espresso de cafeteria com crema perfeita direto no trânsito, no avião ou no acampamento.',
      headline: 'Pressão profissional de 18 bar na palma da sua mão.',
      cta: 'Ver Demonstração & Comprar'
    }
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-101',
    customerName: 'Renato Silveira',
    customerEmailMasked: 'r***.s***@gmail.com',
    orderNumber: '#BR-94821-XP',
    subject: 'Onde está meu pedido? Rastreamento',
    status: 'Resolvido pela IA',
    csat: 5,
    lastMessage: 'A IA informou que o pacote saiu para entrega em São Paulo hoje e forneceu o código dos Correios. Cliente agradeceu.',
    timeAgo: 'há 12 min',
    messages: [
      { id: 'm1', sender: 'user', text: 'Boa tarde, comprei a Máscara Luna Sleep sob o pedido #BR-94821-XP e queria saber onde está.', timestamp: '14:22' },
      { id: 'm2', sender: 'ai', text: 'Olá Renato! Localizei seu pedido #BR-94821-XP. Ele está em trânsito prioritário e saiu para entrega hoje em São Paulo/SP com previsão de chegada até as 17h. O código de rastreio oficial é NL948218492BR. Posso ajudar com mais alguma informação?', timestamp: '14:22' },
      { id: 'm3', sender: 'user', text: 'Perfeito, muito rápido! Obrigado pelo atendimento.', timestamp: '14:24' }
    ]
  },
  {
    id: 'tkt-102',
    customerName: 'Camila Mendonça',
    customerEmailMasked: 'c***.m***@outlook.com',
    orderNumber: '#BR-83104-NV',
    subject: 'Compatibilidade com iPhone 15 Pro Max',
    status: 'Resolvido pela IA',
    csat: 5,
    lastMessage: 'IA confirmou alinhamento magnético MagSafe nativo e velocidade máxima de 15W Qi2.',
    timeAgo: 'há 34 min',
    messages: [
      { id: 'm4', sender: 'user', text: 'Oi! A estação de titânio funciona com a capinha original de silicone do iPhone 15 Pro Max?', timestamp: '13:58' },
      { id: 'm5', sender: 'ai', text: 'Olá Camila! Sim, com certeza! A nossa estação é 100% compatível com a tecnologia MagSafe oficial, funcionando perfeitamente através de qualquer capa MagSafe ou de até 3mm de espessura.', timestamp: '13:58' }
    ]
  },
  {
    id: 'tkt-103',
    customerName: 'Eduardo Vasconcelos',
    customerEmailMasked: 'e***.v***@uol.com.br',
    orderNumber: '#BR-72091-MC',
    subject: 'Como funciona a garantia de 30 dias?',
    status: 'Resolvido pela IA',
    csat: 5,
    lastMessage: 'Explicado processo de devolução sem custo e estorno integral.',
    timeAgo: 'há 1 hora',
    messages: [
      { id: 'm6', sender: 'user', text: 'Se eu não me adaptar à cafeteira portátil, como funciona para devolver?', timestamp: '13:10' },
      { id: 'm7', sender: 'ai', text: 'Olá Eduardo! Você conta com 30 dias de garantia incondicional a partir do recebimento. Caso deseje devolver por qualquer motivo, nossa equipe gera uma etiqueta de postagem reversa sem custo algum e realizamos o reembolso integral imediato.', timestamp: '13:10' }
    ]
  }
];

export const INITIAL_SECURITY_SETTINGS: SecuritySettings = {
  endToEndEncryption: true,
  maskCustomerPII: true,
  zeroRetentionAI: true,
  twoFactorAuth: true,
  autoPurgeOrdersDays: 90,
  lgpdComplianceActive: true,
  auditLogging: true
};
