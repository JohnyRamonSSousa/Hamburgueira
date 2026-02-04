
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering && !formData.name) return;
    if (!formData.email || !formData.password) return;
    
    // Simular cadastro/login
    onLogin(formData.name || formData.email.split('@')[0]);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-500 hover:text-stone-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="font-display text-4xl mb-2">
            {isRegistering ? 'CRIAR CONTA' : 'BEM-VINDO DE VOLTA'}
          </h2>
          <p className="text-stone-500 text-sm">
            {isRegistering 
              ? 'Cadastre-se para aproveitar os 10% de desconto e finalizar seu pedido.' 
              : 'Entre para continuar com sua experiência Je Burgues.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Nome Completo</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Ex: João Silva"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">E-mail</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Senha</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all mt-4"
          >
            {isRegistering ? 'Cadastrar Agora' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-stone-800">
          <p className="text-stone-500 text-xs">
            {isRegistering ? 'Já possui uma conta?' : 'Não tem uma conta?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-2 text-amber-500 font-bold hover:underline"
            >
              {isRegistering ? 'Fazer Login' : 'Cadastrar-se'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
