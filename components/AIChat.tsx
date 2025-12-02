/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido al espacio de transformación. Soy el asistente IA de Pepe. ¿Te interesa descubrir el origen emocional de algún síntoma o deseas agendar tu sesión?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-6 w-[90vw] md:w-[380px] bg-slate-950/90 backdrop-blur-2xl border border-emerald-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)] flex flex-col"
          >
            {/* Ultra Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 flex justify-between items-center border-b border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center relative">
                    <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <div className="absolute inset-0 bg-emerald-400 blur-md opacity-20 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white tracking-wide text-sm">Asistente Bio-Neuro</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">En línea</span>
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
              className="h-[350px] overflow-y-auto p-5 space-y-6 bg-transparent scrollbar-hide"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed relative ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-sm shadow-[0_5px_15px_rgba(5,150,105,0.3)]'
                        : 'bg-slate-800/80 text-slate-200 border border-white/10 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                    {msg.role === 'model' && (
                       <div className="absolute -left-2 -top-2 w-2 h-2 border-l border-t border-emerald-500/50 opacity-0"></div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 p-4 rounded-2xl rounded-tl-sm border border-white/10 flex gap-2 items-center">
                    <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider mr-2">Analizando</span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-white/10 backdrop-blur-md">
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
                  className="flex-1 bg-slate-800/50 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-white/5 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-600 w-12 rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                >
                  {isLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-center mt-3">
                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Powered by Gemini AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] border border-emerald-500/50 hover:border-emerald-400 transition-all z-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {/* Pulsing Rings */}
        {!isOpen && (
            <>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping duration-[2s]"></span>
                <span className="absolute inline-flex h-[80%] w-[80%] rounded-full bg-emerald-500 opacity-10 animate-pulse"></span>
            </>
        )}
        
        {isOpen ? (
            <X className="w-6 h-6 text-white relative z-10" />
        ) : (
            <Bot className="w-7 h-7 text-emerald-400 relative z-10 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;