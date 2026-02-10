import React, { useState } from 'react';
import { signUp, login } from '../services/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string, isRegistering: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        if (!formData.name) {
          setError('Por favor, informe seu nome.');
          setLoading(false);
          return;
        }
        await signUp(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }

      const userName = formData.name || formData.email.split('@')[0];
      onLogin(userName, formData.email, isRegistering);
      onClose();
    } catch (err: any) {
      console.error('Erro na autenticação:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('E-mail ou senha incorretos.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Ocorreu um erro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-6 right-6 text-stone-500 hover:text-stone-300 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="font-display text-4xl mb-2 uppercase">
            {isRegistering ? 'CRIAR CONTA' : 'BEM-VINDO'}
          </h2>
          <p className="text-stone-500 text-sm">
            {isRegistering
              ? 'Cadastre-se para aproveitar os 10% de desconto e finalizar seu pedido.'
              : 'Entre para continuar com sua experiência Je Burgues.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Nome Completo</label>
              <input
                type="text"
                required
                disabled={loading}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
                placeholder="Ex: João Silva"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">E-mail</label>
            <input
              type="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Senha</label>
            <input
              type="password"
              required
              disabled={loading}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                {isRegistering ? 'Cadastrando...' : 'Entrando...'}
              </>
            ) : (
              isRegistering ? 'Cadastrar Agora' : 'Entrar'
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-stone-800">
          <p className="text-stone-500 text-xs">
            {isRegistering ? 'Já possui uma conta?' : 'Não tem uma conta?'}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              disabled={loading}
              className="ml-2 text-amber-500 font-bold hover:underline disabled:opacity-50"
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
