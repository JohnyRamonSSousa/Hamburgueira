
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CustomBurgerModal from './components/CustomBurgerModal';
import ScrollToTop from './components/ScrollToTop';
import Checkout, { OrderData } from './components/Checkout';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import ProfileModal from './components/ProfileModal';
import { BurgerProduct, CartItem, User } from './types';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signUp, login as firebaseLogin, logout as firebaseLogout, subscribeToAuthChanges } from './services/auth';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCustomBurgerOpen, setIsCustomBurgerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  const handleLogin = async (name: string, email: string, isRegistering: boolean, password?: string) => {
    // Note: Actual login/signup is now handled inside AuthModal.tsx
    // This function can be kept for UI transition or analytics if needed,
    // but the state is updated via subscribeToAuthChanges.
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleConfirmOrder = async (orderData: OrderData) => {
    if (!user) {
      alert('Você precisa estar logado para finalizar o pedido.');
      return;
    }
    try {
      // Salvar pedido no Firestore com o uid do usuário
      await addDoc(collection(db, 'orders'), {
        ...orderData,
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        items: cartItems,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Atualizar UI
      setConfirmedOrder(orderData);
      setCartItems([]);
      setIsCheckoutOpen(false);
      setIsConfirmationOpen(true);
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      alert('Erro ao confirmar pedido. Verifique sua conexão e tente novamente.');
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((newUser) => {
      setUser(newUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isCartOpen || isAuthModalOpen || isCustomBurgerOpen || isCheckoutOpen || isConfirmationOpen || isProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen, isAuthModalOpen, isCustomBurgerOpen, isCheckoutOpen, isConfirmationOpen, isProfileOpen]);

  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
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

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h3 className="font-display text-5xl mb-8 text-amber-500">NOSSA HISTÓRIA</h3>

            <div className="space-y-8 text-left">
              {/* História principal */}
              <div className="bg-stone-900/50 rounded-2xl border border-stone-800 p-8 hover:border-amber-500/30 transition-all">
                <p className="text-stone-300 leading-relaxed text-lg mb-6">
                  Tudo começou de forma <span className="text-amber-500 font-semibold">despretenciosa</span> em uma pequena cozinha,
                  onde a paixão por criar hambúrgueres únicos era maior que qualquer ambição comercial.
                  O que era apenas um hobby entre amigos, se transformou em algo especial quando começamos a receber
                  pedidos de vizinhos e conhecidos.
                </p>

                <p className="text-stone-300 leading-relaxed text-lg mb-6">
                  Palavra por palavra, nossos hambúrgueres ganharam fama no bairro. Os <span className="text-amber-500 font-semibold">elogios dos visitantes</span> eram
                  constantes: "o melhor hambúrguer que já provei", "ingredientes de qualidade incomparável", "sabor que não se esquece".
                  Cada feedback positivo nos motivava a aprimorar ainda mais nossas receitas e técnicas.
                </p>

                <p className="text-stone-300 leading-relaxed text-lg mb-6">
                  Com o passar do tempo, a demanda cresceu tanto que percebemos: era hora de <span className="text-amber-500 font-semibold">profissionalizar</span> o negócio.
                  Foi aí que decidimos criar este site, para que mais pessoas pudessem experimentar nossos hambúrgueres
                  e ter acesso facilitado ao nosso cardápio. A tecnologia veio para nos ajudar a alcançar mais clientes
                  sem perder a essência artesanal que nos tornou especiais.
                </p>

                <p className="text-stone-300 leading-relaxed text-lg">
                  Hoje, continuamos com o mesmo <span className="text-amber-500 font-semibold">compromisso com a qualidade</span> que nos trouxe até aqui:
                  ingredientes selecionados, preparo cuidadoso e um sabor que conquista a cada mordida.
                  Nosso objetivo é simples: fazer você se sentir em casa, com um hambúrguer que transmite
                  todo o carinho e dedicação que colocamos em cada receita.
                </p>
              </div>

              {/* Valores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="space-y-4 p-6 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all">
                  <div className="text-amber-500 font-display text-5xl">🍔</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-stone-100">Qualidade Artesanal</p>
                  <p className="text-xs text-stone-400">Feito com paixão desde o início</p>
                </div>
                <div className="space-y-4 p-6 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all">
                  <div className="text-amber-500 font-display text-5xl">❤️</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-stone-100">Clientes Satisfeitos</p>
                  <p className="text-xs text-stone-400">Cada elogio nos motiva</p>
                </div>
                <div className="space-y-4 p-6 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all">
                  <div className="text-amber-500 font-display text-5xl">🌟</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-stone-100">Inovação Constante</p>
                  <p className="text-xs text-stone-400">Tradição com tecnologia</p>
                </div>
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
        onOpenCheckout={() => setIsCheckoutOpen(true)}
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

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onConfirmOrder={handleConfirmOrder}
      />

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        orderData={confirmedOrder}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
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

      <ScrollToTop />
    </div>
  );
};

export default App;
