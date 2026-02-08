
import React, { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-tighter">JE <span className="text-amber-500">BURGUES</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-stone-400">
            <a href="#menu" className="hover:text-amber-500 transition-colors">Cardápio</a>
            <a href="#about" className="hover:text-amber-500 transition-colors">Sobre</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">Contato</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-300 hover:text-amber-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-stone-300 hover:text-amber-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[45] bg-stone-950 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6 space-y-8">
          <a href="#menu" onClick={toggleMenu} className="font-display text-4xl hover:text-amber-500 transition-colors border-b border-stone-800 pb-4">Cardápio</a>
          <a href="#about" onClick={toggleMenu} className="font-display text-4xl hover:text-amber-500 transition-colors border-b border-stone-800 pb-4">Sobre</a>
          <a href="#contact" onClick={toggleMenu} className="font-display text-4xl hover:text-amber-500 transition-colors border-b border-stone-800 pb-4">Contato</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
