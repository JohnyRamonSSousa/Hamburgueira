
import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../constants';
import { BurgerProduct } from '../types';

interface MenuProps {
  onAddToCart: (item: BurgerProduct) => void;
  isLoggedIn: boolean;
  onOpenCustomBurger: () => void;
  onOpenAuth: () => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart, isLoggedIn, onOpenCustomBurger, onOpenAuth }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'classic', label: 'Clássicos' },
    { key: 'gourmet', label: 'Gourmet' },
    { key: 'smash', label: 'Smash' },
    { key: 'snacks', label: 'Salgados' },
    { key: 'sides', label: 'Acompanhamentos' },
    { key: 'drinks', label: 'Bebidas' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl mb-4">O CARDÁPIO DIGITAL</h2>

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

          {/* Banner de Montagem Personalizada */}
          <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-1 flex flex-col md:flex-row items-center overflow-hidden shadow-2xl shadow-amber-500/10">
            <div className="bg-stone-950 w-full h-full rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <span className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2 block">Disponível para Todos</span>
                <h3 className="font-display text-4xl md:text-5xl mb-4">MONTE DO SEU JEITO</h3>
                <p className="text-stone-400 text-sm max-w-sm">Escolha cada ingrediente, do pão ao molho, e crie sua própria obra-prima tech-gourmet.</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <button
                  onClick={onOpenCustomBurger}
                  className="bg-amber-500 text-stone-950 px-8 py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  Começar Agora
                </button>
              </div>
            </div>
          </div>
        </div>

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
                    Adicionar ao Pedido
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
    </section>
  );
};

export default Menu;
