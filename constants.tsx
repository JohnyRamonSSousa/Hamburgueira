
import { BurgerProduct, Ingredient } from './types';

export const INGREDIENTS: Ingredient[] = [
  // Pães
  { id: 'i1', name: 'Pão Brioche', price: 0, category: 'bread' },
  { id: 'i2', name: 'Pão Australiano', price: 2.00, category: 'bread' },
  { id: 'i3', name: 'Pão com Gergelim', price: 0, category: 'bread' },
  
  // Carnes
  { id: 'i4', name: 'Blend Bovino 180g', price: 15.00, category: 'meat' },
  { id: 'i5', name: 'Carne Smash 90g', price: 9.00, category: 'meat' },
  { id: 'i6', name: 'Burger de Grão de Bico', price: 12.00, category: 'meat' },
  
  // Queijos
  { id: 'i7', name: 'Cheddar Inglês', price: 4.00, category: 'cheese' },
  { id: 'i8', name: 'Mussarela', price: 3.00, category: 'cheese' },
  { id: 'i9', name: 'Gorgonzola', price: 5.50, category: 'cheese' },
  
  // Saladas
  { id: 'i10', name: 'Alface Americana', price: 1.00, category: 'salad' },
  { id: 'i11', name: 'Tomate', price: 1.00, category: 'salad' },
  { id: 'i12', name: 'Cebola Roxa', price: 1.00, category: 'salad' },
  { id: 'i13', name: 'Picles', price: 2.00, category: 'salad' },
  
  // Extras
  { id: 'i14', name: 'Bacon Crocante', price: 5.00, category: 'extra' },
  { id: 'i15', name: 'Ovo Frito', price: 3.00, category: 'extra' },
  { id: 'i16', name: 'Cebola Caramelizada', price: 4.00, category: 'extra' },
  { id: 'i17', name: 'Dobro de Carne', price: 12.00, category: 'extra' },

  // Molhos
  { id: 'i18', name: 'Maionese da Casa', price: 0, category: 'sauce' },
  { id: 'i19', name: 'Barbecue Defumado', price: 2.00, category: 'sauce' },
  { id: 'i20', name: 'Molho Spicy', price: 2.00, category: 'sauce' }
];

export const MENU_ITEMS: BurgerProduct[] = [
  // Hamburgueres
  {
    id: 'b1',
    name: 'O Clássico IA',
    description: '180g de angus negro, cheddar maturado, cebolas caramelizadas e nosso molho tech secreto.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'gourmet'
  },
  {
    id: 'b2',
    name: 'Protocolo Smash',
    description: 'Hambúrguer duplo de 90g com crosta, queijo americano, picles e mostarda.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800',
    category: 'smash'
  },
  {
    id: 'b3',
    name: 'Matrix de Bacon',
    description: 'Bacon triplamente defumado, mel, cebolas crocantes e queijo jack.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=800',
    category: 'gourmet'
  },
  {
    id: 'b4',
    name: 'Mega Byte',
    description: 'Quatro carnes smash de 60g, muito cheddar, bacon bits e molho barbecue.',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&q=80&w=800',
    category: 'smash'
  },
  {
    id: 'b5',
    name: 'Firewall Spicy',
    description: 'Blend bovino, queijo pepper jack, jalapeños defumados e maionese de sriracha.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1582196016295-f8c499d33d1f?auto=format&fit=crop&q=80&w=800',
    category: 'classic'
  },
  {
    id: 'b6',
    name: 'Cloud Veggie',
    description: 'Hambúrguer de grão de bico, cogumelos, rúcula e creme de tofu com ervas.',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=800',
    category: 'classic'
  },

  // Salgados
  {
    id: 's_n1',
    name: 'Coxinha Tech',
    description: 'Massa de batata ultra cremosa com recheio de frango defumado e catupiry.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n2',
    name: 'Kibe de Cripto',
    description: 'Kibe tradicional frito na hora, recheado com carne e hortelã fresca.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1608447706243-7935700778f3?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n3',
    name: 'Enroladinho de Presunto',
    description: 'Massa leve com presunto, mussarela e orégano.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n4',
    name: 'Empada de Palmito',
    description: 'Massa podre que derrete na boca com recheio cremoso de palmito.',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },

  // Acompanhamentos
  {
    id: 's1',
    name: 'Batatas Quânticas',
    description: 'Batatas belgas fritas duas vezes com sal de alecrim.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },
  {
    id: 's2',
    name: 'Onion Rings Binary',
    description: 'Anéis de cebola empanados em panko com páprica defumada.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883511d?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },

  // Sucos e Bebidas
  {
    id: 'd1',
    name: 'Limonada Neon',
    description: 'Limonada fresca com um toque de chá de clitória (butterfly pea tea).',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd2',
    name: 'Suco de Laranja Real',
    description: '100% natural, espremido na hora. Sem adição de açúcar.',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd3',
    name: 'Abacaxi com Hortelã',
    description: 'Refrescante e digestivo, perfeito para acompanhar seu burger.',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1563229871-841846ffb71a?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd4',
    name: 'Pink Lemonade',
    description: 'Limonada com frutas vermelhas e gelo picado.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  }
];
