import React, { useState } from 'react';
import { 
  MessageSquareText, 
  Send, 
  Sparkles, 
  FileText, 
  BookOpen, 
  ExternalLink, 
  Bot, 
  User as UserIcon,
  ChevronRight,
  Trash2,
  Download
} from 'lucide-react';
import { ChatMessage } from '../types';
import { MOCK_CHAT_MESSAGES } from '../data/mockData';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeCitation, setActiveCitation] = useState<any | null>(MOCK_CHAT_MESSAGES[1].citations?.[0] || null);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "What is the net ATP yield per glucose molecule?",
    "Explain Complex II in the electron transport chain.",
    "Summarize PFK-1 regulation in Glycolysis."
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI response with note citation after delay
    setTimeout(() => {
      setIsTyping(false);
      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: `Based strictly on your uploaded **Cellular Respiration & Bioenergetics** notes:

Key insight regarding "${query}":

The mitochondrial inner membrane maintains a tight proton barrier. When electrons flow through Complexes I, III, and IV, free energy change (ΔG°) is coupled to pumping H⁺ into the intermembrane space. This creates both a concentration gradient (ΔpH) and an electrical potential (Δψ) that together sum to the **Proton Motive Force (PMF)**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            documentName: 'Cellular_Respiration_Bioenergetics.pdf',
            page: 16,
            paragraphSnippet: 'Section 5.2: Proton Motive Force calculation and Mitchell’s Chemiosmotic Hypothesis.'
          }
        ],
        suggestedFollowUps: [
          'Calculate total ATP produced from 1 NADH vs 1 FADH2.',
          'What happens when oligomycin inhibits ATP Synthase?'
        ]
      };
      setMessages((prev) => [...prev, aiReply]);
      setActiveCitation(aiReply.citations?.[0]);
    }, 1200);
  };

  const handleClearChat = () => {
    setMessages([]);
    setActiveCitation(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] animate-fadeIn">
      
      {/* LEFT 8 COLS: CHAT CONVERSATION */}
      <div className="lg:col-span-8 flex flex-col glass-panel border border-white/15 overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#4ECDC4] p-[1.5px]">
              <div className="w-full h-full bg-[#13131A] rounded-[10.5px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#4ECDC4]" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-[#Outfit] flex items-center gap-2">
                <span>MindLoop Note Assistant</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Grounded Mode
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Answers exclusively from uploaded notes with verified source citations.
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Prompts Bar */}
        {messages.length === 0 && (
          <div className="p-6 text-center space-y-4 my-auto">
            <Bot className="w-12 h-12 text-[#4ECDC4] mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white font-[#Outfit]">
              Ask Anything About Your Notes
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              MindLoop grounds every response with exact PDF citations. Try one of these prompts:
            </p>
            <div className="flex flex-col gap-2 max-w-md mx-auto">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#4ECDC4] text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>⚡ {prompt}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-[#6C63FF] text-white'
                  : 'bg-[#4ECDC4]/20 text-[#4ECDC4] border border-[#4ECDC4]/40'
              }`}>
                {msg.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-3">
                {/* Floating Card Message Bubble */}
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#5A52E0] text-white border-transparent shadow-lg'
                    : 'glass-panel border-white/15 text-slate-200'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Source Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[#4ECDC4] uppercase tracking-wider">
                      Verified Citations ({msg.citations.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((cite, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveCitation(cite)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#4ECDC4] font-medium transition-all cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{cite.documentName} (p. {cite.page})</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up Buttons */}
                {msg.suggestedFollowUps && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {msg.suggestedFollowUps.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="px-3 py-1 rounded-full bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 border border-[#6C63FF]/30 text-[11px] font-semibold text-[#6C63FF] transition-all cursor-pointer"
                      >
                        ⚡ {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-2xl">
              <div className="w-8 h-8 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 flex items-center justify-center text-[#4ECDC4]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/15 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4ECDC4] animate-spin" />
                <span>MindLoop AI is searching note vectors...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask a question about your uploaded notes..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full pl-4 pr-12 py-3 bg-white/[0.04] text-white text-xs sm:text-sm placeholder-slate-400 rounded-xl border border-white/15 focus:border-[#6C63FF] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="absolute right-2 p-2 rounded-lg bg-[#6C63FF] text-white hover:bg-[#5A52E0] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT 4 COLS: CITATION PREVIEW DRAWER */}
      <div className="lg:col-span-4 glass-panel p-5 border border-white/15 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Citation Drawer</span>
          </div>

          {activeCitation ? (
            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="text-sm font-bold text-white font-[#Outfit]">
                {activeCitation.documentName}
              </h3>
              <div className="text-xs text-[#4ECDC4] font-semibold">
                Page {activeCitation.page}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed border-l-2 border-[#4ECDC4] pl-3 py-1">
                "{activeCitation.paragraphSnippet}"
              </p>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 space-y-2 border border-dashed border-white/10 rounded-2xl">
              <FileText className="w-8 h-8 mx-auto text-slate-500" />
              <p>Click any citation badge in the chat to view exact document excerpt.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
