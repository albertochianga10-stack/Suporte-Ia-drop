import React, { useState } from 'react';
import ChatBot from './components/ChatBot';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, MessageSquare, ShoppingBag, Settings, Globe, Package, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [view, setView] = useState<'landing' | 'admin'>('landing');

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Dynamic View Header */}
      {view === 'admin' ? (
        <div className="flex">
          {/* Static Sidebar for Admin */}
          <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 h-screen sticky top-0 hidden lg:flex flex-col bg-white dark:bg-zinc-950">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg" />
                <span className="font-bold text-xl tracking-tight uppercase">ORENVY</span>
              </div>
              <nav className="space-y-1">
                {[
                  { icon: LayoutDashboard, label: 'Dashboard', active: true },
                  { icon: MessageSquare, label: 'Atendimentos', active: false },
                  { icon: ShoppingBag, label: 'Pedidos', active: false },
                  { icon: Package, label: 'Produtos', active: false },
                  { icon: Globe, label: 'Idiomas', active: false },
                  { icon: Settings, label: 'Configurações', active: false },
                ].map((item, i) => (
                  <button 
                    key={i}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      item.active 
                        ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shadow-sm" 
                        : "text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="mt-auto p-6 border-t border-zinc-100 dark:border-zinc-800">
               <button 
                 onClick={() => setView('landing')}
                 className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
               >
                 Voltar para Site
               </button>
            </div>
          </aside>

          <main className="flex-1">
            <Dashboard />
          </main>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          {/* Landing Page (Mock Store Interface) */}
          <nav className="p-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg" />
              <span className="font-bold text-xl tracking-tight uppercase">ORENVY LUXURY</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-zinc-500">
              <a href="#" className="hover:text-black transition-colors">Novidades</a>
              <a href="#" className="hover:text-black transition-colors">Best Sellers</a>
              <a href="#" className="hover:text-black transition-colors">Frete Grátis</a>
            </div>
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setView('admin')}
                 className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
               >
                 Painel Admin
               </button>
            </div>
          </nav>

          <section className="relative h-[80vh] flex items-center justify-center p-6">
            <div className="max-w-4xl text-center space-y-8 relative z-10">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
               >
                 <Zap size={12} className="text-yellow-500 fill-yellow-500" />
                 Lançamento Mundial
               </motion.div>
               <motion.h1 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.1 }}
                 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none"
               >
                 MODA DE LUXO <br />
                 PARA <span className="italic serif text-zinc-300 dark:text-zinc-700">VOCÊ.</span>
               </motion.h1>
               <motion.p 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed"
               >
                 Dropshipping internacional com qualidade premium e suporte inteligente 24/7.
               </motion.p>
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
               >
                 <button className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                   Ver Coleção
                 </button>
                 <button className="px-8 py-4 bg-zinc-100 dark:bg-zinc-900 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors">
                   Saber Mais
                 </button>
               </motion.div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0">
               <div className="w-[800px] h-[800px] bg-zinc-50 dark:bg-zinc-950 rounded-full blur-[120px] opacity-50" />
            </div>
          </section>

          <footer className="p-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
            <p className="text-zinc-400 text-xs uppercase tracking-widest">© 2026 ORENVY GLOBAL - Todos os direitos reservados</p>
          </footer>
        </div>
      )}

      {/* Persistent ChatBot */}
      <ChatBot />
    </div>
  );
}
