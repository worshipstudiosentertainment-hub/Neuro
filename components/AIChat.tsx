/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGeminiStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido. Soy el asistente neural de Pepe. ¿En qué conflicto deseas recuperar tu paz hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsGenerating(true);

    // Create a placeholder for the model response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const stream = sendMessageToGeminiStream(userText);
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text = fullText;
          }
          return newMessages;
        });
        // Ultra-fast scroll as text arrives
        scrollToBottom();
      }
    } catch (error) {
      console.error("Stream error", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-6 w-[90vw] md:w-[380px] bg-slate-950/90 backdrop-blur-2xl border border-emerald-500/30 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-10px_rgba(16,185,129,0.2)] flex flex-col"
          >
            {/* Ultra Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 flex justify-between items-center border-b border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center relative overflow-hidden">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <div className="absolute inset-0 bg-emerald-400 blur-md opacity-20 rounded-full animate-ping-slow"></div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white tracking-widest text-xs uppercase">Neural Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em]">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="h-[380px] overflow-y-auto p-5 space-y-6 bg-transparent scrollbar-hide"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed relative backdrop-blur-md whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-emerald-600/90 text-white rounded-tr-sm shadow-[0_5px_15px_rgba(5,150,105,0.3)] border border-emerald-500/50'
                        : 'bg-slate-800/60 text-slate-200 border border-white/10 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                    {msg.role === 'model' && idx === messages.length - 1 && isGenerating && (
                       <span className="inline-block w-1.5 h-4 ml-1 bg-emerald-400 animate-pulse align-middle"></span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/95 border-t border-white/10 backdrop-blur-xl">
              <div className="flex gap-3 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 bg-slate-800/50 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500/50 border border-white/5 transition-all font-light tracking-wide"
                />
                <button
                  onClick={handleSend}
                  disabled={isGenerating || !input.trim()}
                  className="bg-emerald-600 w-12 rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
                >
                  {isGenerating ? <Activity className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-between items-center mt-3 px-1">
                 <span className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">Secure Connection</span>
                 <span className="text-[9px] text-emerald-500/50 uppercase tracking-widest font-bold">Gemini 2.5 Flash</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-emerald-500/30 hover:border-emerald-400 transition-all z-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Living Pulse */}
        {!isOpen && (
            <>
                <span className="absolute inset-0 rounded-full border border-emerald-500/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse"></span>
            </>
        )}
        
        <AnimatePresence mode="wait">
          {isOpen ? (
              <motion.div 
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
          ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                 <Bot className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIChat;