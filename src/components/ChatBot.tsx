import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { chatWithAI } from '../services/gemini';
import { Send, User, Bot, Loader2, Minus, X, MessageSquare, Package, Truck, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: any;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessage: Message = { role: 'user', content: userMessage, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Mock store context for the AI
      const storeContext = {
        name: "ORENVY AI Support",
        policies: {
            shipping: "8 a 15 dias úteis para entrega internacional.",
            refunds: "30 dias de garantia incondicional.",
            tracking: "Código de rastreio enviado em até 3 dias após a compra."
        },
        recent_orders: [
            { id: "ORD-1234", status: "Em Porto Nacional, BR", last_update: "Saindo da Unidade de Tratamento" }
        ],
        available_languages: ["English", "Portuguese", "Spanish", "French"]
      };

      const aiResponse = await chatWithAI([...messages, newMessage], storeContext);
      
      if (aiResponse) {
        setMessages(prev => [...prev, { role: 'model', content: aiResponse, timestamp: new Date() }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Desculpe, tive um problema técnico. Pode repetir?", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickActions = [
    { icon: Truck, label: "Rastrear Pedido", prompt: "Como posso rastrear meu pedido?" },
    { icon: Package, label: "Produtos", prompt: "Me mostre os produtos mais vendidos." },
    { icon: HelpCircle, label: "Dúvidas", prompt: "Dúvidas frequentes." },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            <MessageSquare size={28} />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="w-[400px] h-[600px] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800"
          >
            {/* Header */}
            <div className="p-5 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
                  <Bot size={20} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ORENVY AI Support</h3>
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online 24/7
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-800 rounded-lg">
                  <Minus size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-800 rounded-lg">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-zinc-50 dark:bg-zinc-950"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                    <Bot size={32} className="text-zinc-400" />
                  </div>
                  <h2 className="text-zinc-900 dark:text-white font-medium">Como posso ajudar você hoje?</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm px-10">Suporte humanizado para todas as suas dúvidas sobre compras internacionais.</p>
                  
                  <div className="grid grid-cols-1 gap-2 pt-4">
                    {QuickActions.map((action, i) => (
                      <button 
                        key={i}
                        onClick={() => { setInput(action.prompt); }}
                        className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-black dark:hover:border-white transition-colors text-sm text-left"
                      >
                        <action.icon size={16} className="text-zinc-400" />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ x: msg.role === 'user' ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-zinc-200 dark:bg-zinc-800" : "bg-black text-white"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-zinc-900 text-white rounded-tr-none" 
                      : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-tl-none shadow-sm"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-zinc-400" />
                    <span className="text-sm text-zinc-400 italic">Digitando...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl border border-transparent focus-within:border-black dark:focus-within:border-white transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-[10px] text-zinc-400 text-center mt-3 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                Powered by <span className="text-zinc-600 dark:text-zinc-300">ORENVY Engine</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
