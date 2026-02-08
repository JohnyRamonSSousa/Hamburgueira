
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onClearCart,
  onOpenCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.10; // 10% discount
  const total = subtotal - discount;

  const handleCheckout = () => {
    onClose();
    onOpenCheckout();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-stone-900 h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-3xl">SEU PEDIDO</h2>
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Deseja limpar todo o carrinho?')) {
                    onClearCart();
                  }
                }}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider transition-colors"
                title="Limpar carrinho"
              >
                Limpar
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-800 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
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
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-amber-500"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-amber-500"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-red-500 transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
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
              className="w-full py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 bg-amber-500 text-stone-950 hover:bg-amber-400"
            >
              Continuar para Pagamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
