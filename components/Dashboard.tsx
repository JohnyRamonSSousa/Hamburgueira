
import React, { useState, useMemo, useRef } from 'react';
import { User, BurgerProduct, CartItem, Ingredient, Order } from '../types';
import { MENU_ITEMS, INGREDIENTS } from '../constants';
import ScrollToTop from './ScrollToTop';

interface DashboardProps {
    user: User;
    onBackToMenu: () => void;
    onAddToCart: (product: BurgerProduct, customIngredients?: string[]) => void;
    cartItems: CartItem[];
    onRemoveFromCart: (id: string) => void;
    onUpdateQuantity: (id: string, delta: number) => void;
    onClearCart: () => void;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    user,
    onBackToMenu,
    onAddToCart,
    cartItems,
    onRemoveFromCart,
    onUpdateQuantity,
    onClearCart
}) => {
    const [activeCategory, setActiveCategory] = useState<string>('todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [showBurgerBuilder, setShowBurgerBuilder] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
    const menuRef = useRef<HTMLDivElement>(null);
    const builderRef = useRef<HTMLDivElement>(null);

    // Mock orders for demonstration
    const [orders] = useState<Order[]>([
        {
            id: 'order-001',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            items: [],
            total: 89.90,
            status: 'delivered'
        },
        {
            id: 'order-002',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            items: [],
            total: 125.50,
            status: 'delivered'
        }
    ]);

    const categories = [
        { key: 'todos', label: 'Todos' },
        { key: 'classic', label: 'Clássicos' },
        { key: 'gourmet', label: 'Gourmet' },
        { key: 'smash', label: 'Smash' },
        { key: 'snacks', label: 'Salgados' },
        { key: 'sides', label: 'Acompanhamentos' },
        { key: 'drinks', label: 'Bebidas' }
    ];

    const ingredientCategories = [
        { key: 'bread', label: '1. Escolha o Pão (Máx 1)', max: 1 },
        { key: 'meat', label: '2. Escolha a Carne (Máx 2)', max: 2 },
        { key: 'cheese', label: '3. Escolha o Queijo', max: 3 },
        { key: 'salad', label: '4. Saladas', max: 5 },
        { key: 'extra', label: '5. Extras', max: 4 },
        { key: 'sauce', label: '6. Molhos', max: 2 }
    ];

    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter(item => {
            const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const toggleIngredient = (ing: Ingredient, max: number) => {
        const categoryCount = selectedIngredients.filter(s => s.category === ing.category).length;
        const isSelected = selectedIngredients.find(s => s.id === ing.id);

        if (isSelected) {
            setSelectedIngredients(selectedIngredients.filter(s => s.id !== ing.id));
        } else if (categoryCount < max) {
            setSelectedIngredients([...selectedIngredients, ing]);
        }
    };

    const customBurgerPrice = 10 + selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);

    const handleAddCustomBurger = () => {
        const hasBread = selectedIngredients.some(s => s.category === 'bread');
        const hasMeat = selectedIngredients.some(s => s.category === 'meat');

        if (!hasBread || !hasMeat) {
            alert("Por favor, selecione pelo menos um pão e uma carne!");
            return;
        }

        const customProduct: BurgerProduct = {
            id: `custom-${Date.now()}`,
            name: 'Meu Burger Tech',
            description: selectedIngredients.map(s => s.name).join(', '),
            price: customBurgerPrice,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800',
            category: 'custom'
        };

        onAddToCart(customProduct, selectedIngredients.map(s => s.name));
        setSelectedIngredients([]);
        setShowBurgerBuilder(false);
    };

    const scrollToMenu = () => {
        menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToBuilder = () => {
        setShowBurgerBuilder(true);
        setTimeout(() => {
            builderRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-stone-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <header className="relative z-10 border-b border-stone-800 backdrop-blur-sm bg-stone-950/80 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div>
                        <h1 className="font-display text-3xl md:text-5xl text-amber-500 mb-2">
                            BEM-VINDO, {user.name.split(' ')[0].toUpperCase()}!
                        </h1>
                        <p className="text-stone-500 text-sm">
                            Seu espaço exclusivo para gerenciar pedidos e aproveitar ofertas especiais
                        </p>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: Desconto Ativo */}
                    <div className="group relative bg-gradient-to-br from-stone-900 to-stone-900/50 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all backdrop-blur-sm overflow-hidden cursor-pointer">
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

                    {/* Card 2: Carrinho */}
                    <div className="group relative bg-gradient-to-br from-stone-900 to-stone-900/50 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all backdrop-blur-sm overflow-hidden cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <span className="text-amber-500 font-display text-3xl">{cartCount}</span>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Itens no Carrinho</h3>
                            <p className="text-stone-300 text-sm">R$ {cartTotal.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Card 3: Monte Seu Lanche */}
                    <button
                        onClick={scrollToBuilder}
                        className="group relative bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 rounded-2xl p-6 hover:border-amber-500 transition-all backdrop-blur-sm overflow-hidden cursor-pointer text-left"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/20 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Monte Seu Lanche</h3>
                            <p className="text-stone-300 text-sm">Crie seu burger personalizado</p>
                        </div>
                    </button>
                </div>

                {/* Menu Section */}
                <div ref={menuRef} className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl mb-4">CARDÁPIO COMPLETO</h2>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto mb-8 relative">
                            <input
                                type="text"
                                placeholder="Buscar no cardápio..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-stone-900 border border-stone-800 rounded-full py-3 px-6 pl-12 text-sm focus:outline-none focus:border-amber-500 transition-all text-stone-200"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {categories.map(cat => (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.key
                                        ? 'bg-amber-500 text-stone-950'
                                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Grid */}
                    {filteredItems.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map(item => (
                                <div key={item.id} className="group bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                            <span className="text-amber-500 font-bold whitespace-nowrap ml-2">R$ {item.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-stone-400 text-sm mb-6 flex-1">{item.description}</p>
                                        <button
                                            onClick={() => onAddToCart(item)}
                                            className="w-full py-3 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 font-bold uppercase tracking-tighter rounded-xl transition-all active:scale-95"
                                        >
                                            Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-stone-500 font-display text-3xl">Nenhum item encontrado.</p>
                        </div>
                    )}
                </div>

                {/* Custom Burger Builder Section */}
                {showBurgerBuilder && (
                    <div ref={builderRef} className="mb-16 bg-stone-900/50 border border-stone-800 rounded-3xl p-8 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-display text-4xl text-amber-500">MONTE SEU BURGER</h2>
                                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Personalização total em tempo real</p>
                            </div>
                            <button
                                onClick={() => setShowBurgerBuilder(false)}
                                className="p-2 hover:bg-stone-800 rounded-full text-stone-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-8">
                            {ingredientCategories.map(cat => (
                                <div key={cat.label} className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-stone-300 border-l-2 border-amber-500 pl-3">
                                        {cat.label}
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {INGREDIENTS.filter(ing => ing.category === cat.key).map(ing => {
                                            const isSelected = selectedIngredients.some(s => s.id === ing.id);
                                            return (
                                                <button
                                                    key={ing.id}
                                                    onClick={() => toggleIngredient(ing, cat.max)}
                                                    className={`p-3 rounded-xl border text-left transition-all relative ${isSelected
                                                        ? 'bg-amber-500/10 border-amber-500'
                                                        : 'bg-stone-950 border-stone-800 hover:border-stone-600'
                                                        }`}
                                                >
                                                    <p className={`text-xs font-bold ${isSelected ? 'text-amber-500' : 'text-stone-200'}`}>{ing.name}</p>
                                                    <p className="text-[10px] text-stone-500">+ R$ {ing.price.toFixed(2)}</p>
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 text-amber-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 border-t border-stone-800 bg-stone-950/50 flex flex-col sm:flex-row gap-4 items-center justify-between rounded-xl">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">Total Estimado</p>
                                <p className="text-3xl font-display text-amber-500">R$ {customBurgerPrice.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handleAddCustomBurger}
                                className="w-full sm:w-auto px-12 py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10"
                            >
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                )
                }

                {
                    !showBurgerBuilder && (
                        <div className="text-center mb-16">
                            <button
                                onClick={() => setShowBurgerBuilder(true)}
                                className="px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20"
                            >
                                Monte Seu Burger Personalizado
                            </button>
                        </div>
                    )
                }

                {/* Shopping Cart */}
                {
                    cartItems.length > 0 && (
                        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display text-2xl">CARRINHO</h2>
                                <button
                                    onClick={onClearCart}
                                    className="text-xs uppercase tracking-widest text-stone-500 hover:text-red-500 transition-colors"
                                >
                                    Limpar Tudo
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex items-center gap-4 p-4 bg-stone-950/50 rounded-xl border border-stone-800">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm">{item.name}</h3>
                                            {item.customIngredients && (
                                                <p className="text-xs text-stone-500 mt-1">{item.customIngredients.join(', ')}</p>
                                            )}
                                            <p className="text-amber-500 font-bold text-sm mt-1">R$ {item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                className="w-8 h-8 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                className="w-8 h-8 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => onRemoveFromCart(item.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-stone-500 hover:text-red-500 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-stone-800 pt-6 flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Total</p>
                                    <p className="text-3xl font-display text-amber-500">R$ {cartTotal.toFixed(2)}</p>
                                    <p className="text-xs text-green-500 mt-1">✓ Desconto de 10% aplicado</p>
                                </div>
                                <button className="px-12 py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10">
                                    Finalizar Pedido
                                </button>
                            </div>
                        </div>
                    )
                }

                {/* Empty Cart Message */}
                {
                    cartItems.length === 0 && (
                        <div className="text-center py-16 bg-stone-900/50 border border-stone-800 rounded-2xl">
                            <div className="inline-block p-6 bg-stone-800/50 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-stone-400">Carrinho Vazio</h3>
                            <p className="text-stone-600 mb-6 text-sm">Adicione produtos do cardápio para começar seu pedido!</p>
                            <button
                                onClick={scrollToMenu}
                                className="px-8 py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all inline-flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Ver Cardápio
                            </button>
                        </div>
                    )
                }
            </main>

            <ScrollToTop />
        </div>
    );
};

export default Dashboard;
