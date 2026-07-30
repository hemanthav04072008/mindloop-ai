import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Globe, 
  QrCode, 
  Send, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Code,
  Users,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  shareUrl?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title = "MindLoop — AI Learning & Study Platform",
  shareUrl = window.location.origin
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'social' | 'qr' | 'embed'>('link');
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isOpen) return null;

  const currentUrl = shareUrl || window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${currentUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard?.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const socialLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${title}! AI-powered flashcards, summaries, and exam readiness.`)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Join me on MindLoop AI: ${currentUrl}`)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: '#FFB84D',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out MindLoop AI learning platform here: ${currentUrl}`)}`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090B]/80 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 space-y-6 relative overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
            <Share2 className="w-4 h-4" />
            <span>Public Access & Sharing</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-[#Outfit]">
            Share MindLoop With Everyone
          </h2>
          <p className="text-xs text-slate-400">
            Invite classmates, study groups, or publish your transformed AI notes publicly.
          </p>
        </div>

        {/* Share Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/10 text-xs font-semibold">
          {[
            { id: 'link', label: 'Share Link', icon: LinkIcon },
            { id: 'social', label: 'Social Networks', icon: Send },
            { id: 'qr', label: 'QR Code', icon: QrCode },
            { id: 'embed', label: 'Embed Web', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#6C63FF] text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SHARE LINK */}
        {activeTab === 'link' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Public MindLoop App Link:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 px-3.5 py-2.5 bg-white/[0.04] text-xs font-mono text-slate-200 rounded-xl border border-white/15 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="btn-primary-glow px-4 py-2.5 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Network Access Alert */}
            <div className="p-3.5 rounded-2xl bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4]">
                <Globe className="w-4 h-4" />
                <span>Local & Public Network Access Active</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Anyone on your local network or given this URL can instantly interact with your MindLoop study session!
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SOCIAL SHARE BUTTONS */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-2 gap-3 animate-fadeIn">
            {socialLinks.map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 flex items-center gap-3 transition-all group cursor-pointer"
                >
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${soc.color}20`, border: `1px solid ${soc.color}40` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: soc.color }} />
                  </div>
                  <span className="text-xs font-semibold text-white group-hover:text-[#4ECDC4] transition-colors">
                    {soc.name}
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {/* TAB 3: QR CODE PREVIEW */}
        {activeTab === 'qr' && (
          <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white/[0.02] rounded-2xl border border-white/10 text-center animate-fadeIn">
            {/* SVG QR Code Simulation */}
            <div className="w-40 h-40 p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="#09090B">
                <rect x="10" y="10" width="25" height="25" fill="#09090B" />
                <rect x="15" y="15" width="15" height="15" fill="#FFFFFF" />
                <rect x="18" y="18" width="9" height="9" fill="#09090B" />

                <rect x="65" y="10" width="25" height="25" fill="#09090B" />
                <rect x="70" y="15" width="15" height="15" fill="#FFFFFF" />
                <rect x="73" y="18" width="9" height="9" fill="#09090B" />

                <rect x="10" y="65" width="25" height="25" fill="#09090B" />
                <rect x="15" y="70" width="15" height="15" fill="#FFFFFF" />
                <rect x="18" y="73" width="9" height="9" fill="#09090B" />

                <rect x="40" y="10" width="10" height="20" fill="#6C63FF" />
                <rect x="40" y="35" width="20" height="10" fill="#4ECDC4" />
                <rect x="65" y="45" width="15" height="15" fill="#6C63FF" />
                <rect x="45" y="65" width="20" height="20" fill="#09090B" />
                <rect x="70" y="70" width="15" height="15" fill="#4ECDC4" />
              </svg>
            </div>
            <p className="text-xs text-slate-300">
              Scan with smartphone camera for instant mobile access to MindLoop.
            </p>
          </div>
        )}

        {/* TAB 4: EMBED IFRAME */}
        {activeTab === 'embed' && (
          <div className="space-y-3 animate-fadeIn">
            <label className="text-xs font-semibold text-slate-300">HTML Embed Snippet:</label>
            <textarea
              readOnly
              rows={3}
              value={`<iframe src="${currentUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`}
              className="w-full p-3 bg-[#09090B] text-xs font-mono text-amber-300 rounded-xl border border-white/15 focus:outline-none resize-none"
            />
            <button
              onClick={handleCopyEmbed}
              className="w-full btn-secondary-glow py-2.5 text-xs font-bold text-slate-900 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {copiedEmbed ? <Check className="w-4 h-4 text-emerald-900" /> : <Code className="w-4 h-4" />}
              <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy iFrame Embed Code'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
