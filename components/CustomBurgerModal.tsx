
import React, { useState } from 'react';
import { INGREDIENTS } from '../constants';
import { BurgerProduct, Ingredient } from '../types';

interface CustomBurgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: BurgerProduct, ingredients: string[]) => void;
}

const CustomBurgerModal: React.FC<CustomBurgerModalProps> = ({ isOpen, onClose, onAddToCart }) => {
  const [selected, setSelected] = useState<Ingredient[]>([]);
  
  if (!isOpen) return null;

  const categories = [
    { key: 'bread', label: '1. Escolha o Pão (Máx 1)', max: 1 },
    { key: 'meat', label: '2. Escolha a Carne (Máx 2)', max: 2 },
    { key: 'cheese', label: '3. Escolha o Queijo', max: 3 },
    { key: 'salad', label: '4. Saladas', max: 5 },
    { key: 'extra', label: '5. Extras', max: 4 },
    { id: 'sauce', label: '6. Molhos', max: 2 }
  ];

  const toggleIngredient = (ing: Ingredient, max: number) => {
    const categoryCount = selected.filter(s => s.category === ing.category).length;
    const isSelected = selected.find(s => s.id === ing.id);

    if (isSelected) {
      setSelected(selected.filter(s => s.id !== ing.id));
    } else if (categoryCount < max) {
      setSelected([...selected, ing]);
    }
  };

  const totalPrice = 10 + selected.reduce((sum, ing) => sum + ing.price, 0); // Base price 10.00

  const handleFinish = () => {
    const hasBread = selected.some(s => s.category === 'bread');
    const hasMeat = selected.some(s => s.category === 'meat');

    if (!hasBread || !hasMeat) {
      alert("Por favor, selecione pelo menos um pão e uma carne!");
      return;
    }

    const customProduct: BurgerProduct = {
      id: `custom-${Date.now()}`,
      name: 'Meu Burger Tech',
      description: selected.map(s => s.name).join(', '),
      price: totalPrice,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800',
      category: 'custom'
    };

    onAddToCart(customProduct, selected.map(s => s.name));
    setSelected([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900 sticky top-0 z-10">
          <div>
            <h2 className="font-display text-4xl text-amber-500">MONTE SEU BURGER</h2>
            <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Personalização total em tempo real</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full text-stone-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {categories.map(cat => (
            <div key={cat.label} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-300 border-l-2 border-amber-500 pl-3">
                {cat.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INGREDIENTS.filter(ing => ing.category === (cat.key || 'sauce')).map(ing => {
                  const isSelected = selected.some(s => s.id === ing.id);
                  return (
                    <button
                      key={ing.id}
                      onClick={() => toggleIngredient(ing, cat.max)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected 
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

        <div className="p-6 border-t border-stone-800 bg-stone-950/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-center sm:text-left">
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">Total Estimado</p>
            <p className="text-3xl font-display text-amber-500">R$ {totalPrice.toFixed(2)}</p>
          </div>
          <button 
            onClick={handleFinish}
            className="w-full sm:w-auto px-12 py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomBurgerModal;
