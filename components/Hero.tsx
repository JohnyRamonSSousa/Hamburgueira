
import React from 'react';

const Hero: React.FC = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-24 md:pt-32 flex items-center overflow-hidden pb-12 md:pb-0">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-amber-500/20 rounded-full blur-[60px] md:blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="inline-block bg-amber-500 text-stone-950 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 animate-pulse">
            10% OFF EM PEDIDOS PELO SITE
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.85] mb-6">
            SABOREIE A <br />
            <span className="text-amber-500">INTELIGÊNCIA</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Onde a maestria culinária encontra a inteligência artificial. Descubra sabores criados por algoritmos e aperfeiçoados por humanos.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
            <button 
              onClick={scrollToMenu}
              className="bg-amber-500 text-stone-950 px-8 py-4 font-bold uppercase tracking-widest rounded-full hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20 w-full sm:w-auto"
            >
              Pedir Agora
            </button>
            <button 
              onClick={scrollToAbout}
              className="border border-stone-700 px-8 py-4 font-bold uppercase tracking-widest rounded-full hover:bg-stone-800 transition-all hover:border-stone-500 w-full sm:w-auto"
            >
              Nossa História
            </button>
          </div>
        </div>

        <div className="relative group mt-8 lg:mt-0 px-4 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
          <img 
            src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=1200" 
            alt="Hambúrguer Hero" 
            className="rounded-2xl shadow-2xl burger-shadow group-hover:scale-[1.02] transition-transform duration-700 w-full"
          />
          <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-amber-500 text-stone-950 p-4 md:p-6 rounded-2xl shadow-xl animate-pulse">
            <p className="font-display text-2xl md:text-4xl leading-none">Eleito #1</p>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Tech-Burger 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
