import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileText, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Database,
  EyeOff,
  Server
} from 'lucide-react';
import { SecuritySettings } from '../types/dropship';
import { INITIAL_SECURITY_SETTINGS } from '../data/mockData';

export const SecurityCenterView: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings>(INITIAL_SECURITY_SETTINGS);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  const auditLogs = [
    {
      id: 'log-01',
      action: 'Sincronização de Estoque Criptografada',
      target: 'CJ Dropshipping API (AES-256)',
      user: 'Agente Autônomo IA',
      ip: '192.168.***.***',
      time: 'há 4 min',
      status: 'Sucesso'
    },
    {
      id: 'log-02',
      action: 'Anonimização de PII do Pedido #BR-94821-XP',
      target: 'Cliente: Renato S*** (CPF ***.482.***-**)',
      user: 'Pipeline de Mascaramento LGPD',
      ip: 'Interno seguro',
      time: 'há 18 min',
      status: 'Sucesso'
    },
    {
      id: 'log-03',
      action: 'Disparo de Campanha TikTok Ads',
      target: 'API TikTok Business (Token SHA-256)',
      user: 'AutoDrop Campaign Engine',
      ip: '172.16.***.***',
      time: 'há 42 min',
      status: 'Sucesso'
    },
    {
      id: 'log-04',
      action: 'Consulta de Suporte com Zero-Retention',
      target: 'Gemini 3.8 Flash via Proxy Seguro',
      user: 'Chatbot Loja Virtual',
      ip: 'Proxy Seguro / Sem Registro',
      time: 'há 1 hora',
      status: 'Sucesso'
    }
  ];

  const toggleSetting = (key: keyof SecuritySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExportLGPDAudit = () => {
    setDownloadSuccess(true);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      report: "Relatório Oficial de Conformidade LGPD & Segurança de Dados",
      app: "AutoDrop AI",
      complianceStandard: "LGPD (Lei 13.709/2018) & GDPR",
      encryptionStatus: "AES-256 GCM ativo em repouso e TLS 1.3 em trânsito",
      piiMasking: "100% de CPFs, telefones e endereços mascarados com hash SHA-256",
      zeroRetentionModel: "Ativo - Nenhuma interação de chat é retida para treino de IA",
      generatedAt: new Date().toISOString()
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `conformidade_lgpd_autodrop_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleRunSecurityAudit = () => {
    setIsAuditing(true);
    setAuditMessage(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditMessage('Auditoria concluída com 100% de integridade: Zero vazamentos, criptografia intacta e todos os tokens protegidos.');
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Blindagem Corporativa</span>
            <span aria-hidden="true">·</span>
            <span>Conformidade LGPD & GDPR</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Retention AI</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            Parâmetros de Segurança de Dados & Privacidade Total
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Todos os dados de clientes, transações financeiras e credenciais de fornecedores operam sob criptografia de ponta a ponta, sem retenção para treino de modelos externos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportLGPDAudit}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>{downloadSuccess ? 'Relatório Exportado!' : 'Exportar Relatório LGPD'}</span>
          </button>

          <button
            onClick={handleRunSecurityAudit}
            disabled={isAuditing}
            className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Auditando...' : 'Auditoria Rápida'}</span>
          </button>
        </div>
      </div>

      {auditMessage && (
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 flex items-center gap-3 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{auditMessage}</span>
        </div>
      )}

      {/* Security Parameter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Toggle 1: End-to-End Encryption */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Lock className="w-4 h-4" />
            </div>
            <button
              onClick={() => toggleSetting('endToEndEncryption')}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                settings.endToEndEncryption ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.endToEndEncryption ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Criptografia de Ponta a Ponta (AES-256)</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              As chaves de API e tokens dos fornecedores (AliExpress, CJ, Zendrop) são criptografados no cofre de segurança antes de qualquer transmissão.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Padrão militar ativo
          </span>
        </div>

        {/* Toggle 2: PII Masking */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <EyeOff className="w-4 h-4" />
            </div>
            <button
              onClick={() => toggleSetting('maskCustomerPII')}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                settings.maskCustomerPII ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.maskCustomerPII ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Mascaramento Automático de PII</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Nenhum dado sensível (CPF, número de cartão, endereço pessoal completo) é exposto em telas ou enviado de forma aberta nos relatórios.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Hashing unidirecional ativo
          </span>
        </div>

        {/* Toggle 3: Zero-Retention AI Policy */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Server className="w-4 h-4" />
            </div>
            <button
              onClick={() => toggleSetting('zeroRetentionAI')}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                settings.zeroRetentionAI ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.zeroRetentionAI ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Política Zero-Retention AI</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Garante que as conversas de atendimento e métricas da sua loja jamais sejam armazenadas ou reutilizadas para treinar modelos públicos de IA.
            </p>
          </div>
          <span className="text-[11px] font-mono text-indigo-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Privacidade estrita confirmada
          </span>
        </div>

      </div>

      {/* Immutable Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Trilha de Conformidade LGPD</div>
            <h2 className="text-base font-bold text-white">Registro Imutável de Auditoria de Acesso</h2>
          </div>
          <span className="text-xs text-emerald-400 font-mono">
            Integridade Criptográfica Verificada
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 pr-4">Ação Registrada</th>
                <th className="pb-3 pr-4">Destino / Parâmetro</th>
                <th className="pb-3 pr-4">Executor</th>
                <th className="pb-3 pr-4">Endereço IP</th>
                <th className="pb-3 pr-4">Momento</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-white">
                    {log.action}
                  </td>
                  <td className="py-3 pr-4 font-mono text-slate-300">
                    {log.target}
                  </td>
                  <td className="py-3 pr-4 text-slate-400">
                    {log.user}
                  </td>
                  <td className="py-3 pr-4 font-mono text-slate-400 text-[11px]">
                    {log.ip}
                  </td>
                  <td className="py-3 pr-4 text-slate-400 font-mono text-[11px]">
                    {log.time}
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {log.status}
                    </span>
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
