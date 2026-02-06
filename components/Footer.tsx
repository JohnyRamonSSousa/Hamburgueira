
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer id="contact" className="py-20 border-t border-stone-800 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <span className="font-display text-xl tracking-tighter">JE <span className="text-amber-500">BURGUES</span></span>
          </div>
          <p className="text-stone-500 max-w-sm mb-8">
            A intersecção entre as artes culinárias de alto padrão e ingredientes premium. Nós não apenas cozinhamos; criamos experiências perfeitas.
          </p>

          <div className="mb-8">
            <h4 className="text-stone-300 font-bold text-sm uppercase tracking-widest mb-4">Inscreva-se na nossa newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-stone-900 border border-stone-800 rounded-lg px-4 py-2 flex-1 text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 text-stone-950 px-6 py-2 rounded-lg font-bold text-xs uppercase hover:bg-amber-400 transition-colors whitespace-nowrap"
              >
                {subscribed ? 'Inscrito!' : 'Enviar'}
              </button>
            </form>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-500 transition-all">
              <span className="sr-only">Twitter</span>
              𝕏
            </a>
            <a href="#" className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-500 transition-all">
              <span className="sr-only">Instagram</span>
              IG
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-stone-100">Links Rápidos</h4>
          <ul className="space-y-4 text-sm text-stone-500 font-semibold">
            <li><a href="#menu" className="hover:text-amber-500 transition-colors">Cardápio Completo</a></li>
            <li><a href="#about" className="hover:text-amber-500 transition-colors">Sobre Nós</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Localização</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Carreiras</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-stone-100">Contato</h4>
          <ul className="space-y-4 text-sm text-stone-500 font-semibold">
            <li>ola@jeburgues.com.br</li>
            <li>+55 (11) 9999-9999</li>
            <li>São Paulo, SP</li>
            <li className="text-amber-500">Aberto 24/7 para pedidos</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-stone-900 text-center text-[10px] text-stone-600 font-bold uppercase tracking-[0.2em]">
        &copy; 2024 Je Burgues Systems Inc. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
