
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CustomBurgerModal from './components/CustomBurgerModal';
import { BurgerProduct, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCustomBurgerOpen, setIsCustomBurgerOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const handleAddToCart = (product: BurgerProduct, customIngredients?: string[]) => {
    setCartItems(prev => {
      // For custom burgers, we always add as a new item because ingredients might differ
      if (product.category === 'custom') {
         return [...prev, { ...product, quantity: 1, customIngredients }];
      }

      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Abrir o carrinho se for a primeira adição ou se for um burger customizado
    if (cartItems.length === 0 || product.category === 'custom') {
      setIsCartOpen(true);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogin = (name: string) => {
    setUser({ name });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (isCartOpen || isAuthModalOpen || isCustomBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen, isAuthModalOpen, isCustomBurgerOpen]);

  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
      
      <main>
        <Hero />
        
        <section className="py-12 md:py-20 bg-amber-500 overflow-hidden">
          <div className="whitespace-nowrap flex animate-marquee font-display text-stone-950 text-4xl md:text-7xl uppercase opacity-20 select-none">
             PROMOÇÃO 10% OFF PELO SITE &bull; MONTE SEU BURGER &bull; TECH GOURMET &bull; FUTURO DO SABOR &bull; SABORES INTENSOS &bull; PROMOÇÃO 10% OFF PELO SITE &bull; MONTE SEU BURGER &bull; TECH GOURMET
          </div>
        </section>

        <Menu 
          onAddToCart={(item) => handleAddToCart(item)} 
          isLoggedIn={!!user}
          onOpenCustomBurger={() => setIsCustomBurgerOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
        
        <section id="about" className="py-24 bg-stone-950 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <h3 className="font-display text-4xl mb-6">POR QUE JE BURGUES?</h3>
            <p className="text-stone-400 mb-12">Nossa cozinha é controlada por um algoritmo de sabor que garante a harmonia perfeita entre os ingredientes a cada pedido.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
               <div className="space-y-4 p-6 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all">
                  <div className="text-amber-500 font-display text-5xl">01</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-100">Ingredientes de Precisão</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-tighter">Rastreabilidade Total</p>
               </div>
               <div className="space-y-4 p-6 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all">
                  <div className="text-amber-500 font-display text-5xl">02</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-100">Perfis Neurais</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-tighter">Otimização de Aroma</p>
               </div>
               <div className="space-y-4 p-6 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all">
                  <div className="text-amber-500 font-display text-5xl">03</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-100">Frescor em Tempo Real</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-tighter">Just-in-Time Burger</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        isLoggedIn={!!user}
        onOpenAuth={() => {
          setIsCartOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <CustomBurgerModal 
        isOpen={isCustomBurgerOpen}
        onClose={() => setIsCustomBurgerOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
