
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity, 
  onClearCart, 
  isLoggedIn,
  onOpenAuth
}) => {
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.10; // 10% discount
  const total = subtotal - discount;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      onOpenAuth();
      return;
    }
    setCheckoutStatus('loading');
    setTimeout(() => {
      setCheckoutStatus('success');
      setTimeout(() => {
        onClearCart();
        setCheckoutStatus('idle');
        onClose();
      }, 3000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={checkoutStatus === 'idle' ? onClose : undefined}></div>
      <div className="relative w-full max-w-md bg-stone-900 h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <h2 className="font-display text-3xl">SEU PEDIDO</h2>
          <button 
            disabled={checkoutStatus !== 'idle'} 
            onClick={onClose} 
            className="p-2 hover:bg-stone-800 rounded-full transition-colors disabled:opacity-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {checkoutStatus === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-bounce-in">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-stone-950 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-4xl text-green-500">SUCESSO!</h3>
              <p className="text-stone-400">Seu pedido foi enviado para a cozinha.<br/>Prepare o apetite!</p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-semibold">Carrinho vazio.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <span className="font-bold text-amber-500">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-stone-950 rounded-lg p-1">
                      <button 
                        disabled={checkoutStatus !== 'idle'}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-amber-500 disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        disabled={checkoutStatus !== 'idle'}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-amber-500 disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      disabled={checkoutStatus !== 'idle'}
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-red-500 transition-colors disabled:opacity-30"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {checkoutStatus !== 'success' && items.length > 0 && (
          <div className="p-6 border-t border-stone-800 bg-stone-950/50">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-sm text-stone-400">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-green-500 font-bold">
                <span>Desconto Site (10%)</span>
                <span>- R$ {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-stone-800">
                <span className="text-stone-100 font-semibold">Total Final</span>
                <span className="text-3xl font-display text-amber-500">R$ {total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={checkoutStatus !== 'idle'}
              className={`w-full py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                isLoggedIn 
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' 
                : 'bg-stone-100 text-stone-950 hover:bg-stone-200'
              }`}
            >
              {checkoutStatus === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processando...</span>
                </>
              ) : (
                isLoggedIn ? 'Finalizar Pedido' : 'Cadastre-se para Finalizar'
              )}
            </button>
            {!isLoggedIn && (
               <p className="mt-4 text-[10px] text-center text-stone-500 uppercase tracking-widest font-bold">
                 * Cadastro obrigatório para segurança do pedido
               </p>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default Cart;
