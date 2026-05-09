import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, ShoppingCart, DollarSign, Globe, 
  MessageSquare, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Users
} from 'lucide-react';

const data = [
  { name: 'Seg', chats: 40, sales: 24, conv: 12 },
  { name: 'Ter', chats: 30, sales: 13, conv: 10 },
  { name: 'Qua', chats: 20, sales: 98, conv: 22 },
  { name: 'Qui', chats: 27, sales: 39, conv: 15 },
  { name: 'Sex', chats: 18, sales: 48, conv: 20 },
  { name: 'Sáb', chats: 23, sales: 38, conv: 18 },
  { name: 'Dom', chats: 34, sales: 43, conv: 21 },
];

const COLORS = ['#000', '#333', '#666', '#999', '#CCC'];

const countryData = [
  { name: 'Brasil', value: 400 },
  { name: 'EUA', value: 300 },
  { name: 'Portugal', value: 300 },
  { name: 'Espanha', value: 200 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
              Admin Panel <span className="text-zinc-300 dark:text-zinc-700 font-normal">/</span> ORENVY AI
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Visão geral do desempenho do seu suporte e vendas.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors">
              Exportar Dados
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10">
              Configurar Shopify
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Atendimentos', value: '1.284', trend: '+12.5%', icon: MessageSquare, color: 'text-zinc-600' },
            { label: 'Conversões IA', value: '342', trend: '+18.2%', icon: TrendingUp, color: 'text-green-600' },
            { label: 'Vendas Totais', value: '$45.201', trend: '+5.4%', icon: DollarSign, color: 'text-zinc-900 dark:text-white' },
            { label: 'Abandono Carrinho', value: '14%', trend: '-2.1%', icon: ShoppingCart, color: 'text-red-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                  stat.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {stat.trend}
                  {stat.trend.startsWith('+') ? <ArrowUpRight size={12} className="ml-1" /> : <ArrowDownRight size={12} className="ml-1" />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Volume de Atendimento</h3>
                <p className="text-zinc-500 text-sm italic serif font-medium">Últimos 7 dias</p>
              </div>
              <select className="bg-zinc-50 dark:bg-zinc-800 border-none rounded-lg text-sm px-3 py-1 outline-none">
                <option>Mensal</option>
                <option>Semanal</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="chats" stroke="#666" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Channels / Integrations */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
             <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Canais Ativos</h3>
             <div className="space-y-4 flex-1">
                {[
                    { name: 'Shopify Store', status: 'Conectado', icon: ShoppingCart },
                    { name: 'WhatsApp', status: 'Conectado', icon: MessageSquare },
                    { name: 'Instagram DM', status: 'Inativo', icon: Globe },
                    { name: 'Telegram Bot', status: 'Inativo', icon: Users },
                    { name: 'Stripe / PayPal', status: 'Conectado', icon: DollarSign },
                ].map((channel, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <channel.icon size={18} className="text-zinc-400" />
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">{channel.name}</span>
                        </div>
                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                            channel.status === 'Conectado' ? "text-green-600 bg-green-50" : "text-zinc-400 bg-zinc-100"
                        )}>
                            {channel.status}
                        </span>
                    </div>
                ))}
             </div>
             <button className="mt-6 w-full py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Configurar Canais
             </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Produtos Mais Recomendados (Upsell)</h3>
            <button className="text-zinc-500 hover:text-black">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="pb-4 font-semibold text-zinc-500 uppercase text-[10px] tracking-widest">Produto</th>
                  <th className="pb-4 font-semibold text-zinc-500 uppercase text-[10px] tracking-widest">Recomendações</th>
                  <th className="pb-4 font-semibold text-zinc-500 uppercase text-[10px] tracking-widest">Conversão</th>
                  <th className="pb-4 font-semibold text-zinc-500 uppercase text-[10px] tracking-widest">Receita Gerada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                {[
                  { name: 'Relógio Luxo Quartz', count: 452, conv: '24%', rev: '$12.400' },
                  { name: 'Fone Noise Cancelling', count: 312, conv: '18%', rev: '$9.200' },
                  { name: 'Mochila Tech Anti-furto', count: 284, conv: '31%', rev: '$14.100' },
                  { name: 'Smartwatch V8 Pro', count: 198, conv: '12%', rev: '$4.500' },
                ].map((p, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center font-mono text-[10px]">IMG</div>
                        <span className="font-medium text-zinc-900 dark:text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-zinc-600 dark:text-zinc-400">{p.count}</td>
                    <td className="py-4 font-medium text-green-600">{p.conv}</td>
                    <td className="py-4 font-bold text-zinc-900 dark:text-white">{p.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
