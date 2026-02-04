
import React from 'react';
import { User, Order } from '../types';

interface DashboardProps {
    user: User;
    onBackToMenu: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onBackToMenu }) => {
    // Pedidos simulados para demonstração
    const mockOrders: Order[] = [
        {
            id: '1',
            date: new Date(),
            items: [],
            total: 0,
            status: 'pending'
        }
    ];

    return (
        <div className="min-h-screen bg-stone-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <header className="relative z-10 border-b border-stone-800 backdrop-blur-sm bg-stone-950/80">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-3xl md:text-5xl text-amber-500 mb-2">
                                BEM-VINDO, {user.name.split(' ')[0].toUpperCase()}!
                            </h1>
                            <p className="text-stone-500 text-sm">
                                Seu espaço exclusivo para gerenciar pedidos e aproveitar ofertas especiais
                            </p>
                        </div>
                        <button
                            onClick={onBackToMenu}
                            className="px-6 py-3 bg-stone-900 border border-stone-800 rounded-xl hover:border-amber-500 transition-all text-sm font-bold uppercase tracking-wider group"
                        >
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Voltar ao Menu
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: Desconto Ativo */}
                    <div className="group relative bg-gradient-to-br from-stone-900 to-stone-900/50 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all backdrop-blur-sm overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-amber-500 font-display text-3xl">10%</span>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Desconto Ativo</h3>
                            <p className="text-stone-300 text-sm">Em todos os pedidos pelo site</p>
                        </div>
                    </div>

                    {/* Card 2: Pontos de Fidelidade */}
                    <div className="group relative bg-gradient-to-br from-stone-900 to-stone-900/50 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all backdrop-blur-sm overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <span className="text-amber-500 font-display text-3xl">0</span>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Pontos</h3>
                            <p className="text-stone-300 text-sm">Acumule em cada pedido</p>
                        </div>
                    </div>

                    {/* Card 3: Pedidos Realizados */}
                    <div className="group relative bg-gradient-to-br from-stone-900 to-stone-900/50 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all backdrop-blur-sm overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <span className="text-amber-500 font-display text-3xl">0</span>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Pedidos</h3>
                            <p className="text-stone-300 text-sm">Total de pedidos realizados</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Pedidos Recentes */}
                    <div className="lg:col-span-2">
                        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display text-2xl">PEDIDOS RECENTES</h2>
                                <span className="text-xs uppercase tracking-widest text-stone-500">Últimos 30 dias</span>
                            </div>

                            <div className="text-center py-16">
                                <div className="inline-block p-6 bg-stone-800/50 rounded-full mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-stone-400">Nenhum pedido ainda</h3>
                                <p className="text-stone-600 mb-6 text-sm">Faça seu primeiro pedido e aproveite os 10% de desconto!</p>
                                <button
                                    onClick={onBackToMenu}
                                    className="px-8 py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all inline-flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Fazer Pedido
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Ofertas Especiais */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 backdrop-blur-sm">
                            <h2 className="font-display text-2xl mb-6">OFERTAS EXCLUSIVAS</h2>

                            {/* Oferta 1 */}
                            <div className="mb-6 p-4 bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-500/20 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm mb-1">Burger Grátis</h3>
                                        <p className="text-xs text-stone-400 mb-2">Na compra de 5 burgers, ganhe 1 grátis</p>
                                        <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                                            <div className="bg-amber-500 h-full w-0" style={{ width: '0%' }}></div>
                                        </div>
                                        <p className="text-xs text-stone-500 mt-1">0/5 pedidos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Oferta 2 */}
                            <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-500/20 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm mb-1">Desconto Progressivo</h3>
                                        <p className="text-xs text-stone-400">10% OFF já ativo + acumule mais descontos</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-6 bg-stone-900/50 border border-stone-800 rounded-2xl p-6 backdrop-blur-sm">
                            <h2 className="font-display text-xl mb-4">MINHA CONTA</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Nome</p>
                                    <p className="text-stone-300">{user.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">E-mail</p>
                                    <p className="text-stone-300 text-sm break-all">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Membro desde</p>
                                    <p className="text-stone-300">{new Date(user.registeredAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
