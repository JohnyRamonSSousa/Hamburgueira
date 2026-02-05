
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
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    category: 'gourmet'
  },
  {
    id: 'b2',
    name: 'Protocolo Smash',
    description: 'Hambúrguer duplo de 90g com crosta, queijo americano, picles e mostarda.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800',
    category: 'smash'
  },
  {
    id: 'b5',
    name: 'Firewall Spicy',
    description: 'Blend bovino, queijo pepper jack, jalapeños defumados e maionese de sriracha.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
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
  {
    id: 'b7',
    name: 'Binary Barbecue',
    description: 'Blend bovino 200g, queijo cheddar, bacon, molho barbecue e cebola crispy.',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'gourmet'
  },
  {
    id: 'b8',
    name: 'Chicken Code',
    description: 'Filé de frango empanado, maionese temperada, alface e tomate.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=800',
    category: 'classic'
  },

  // Salgados
  {
    id: 's_n1',
    name: 'Coxinha Tech',
    description: 'Massa de batata ultra cremosa com recheio de frango defumado e catupiry.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n2',
    name: 'Kibe de Cripto',
    description: 'Kibe tradicional frito na hora, recheado com carne e hortelã fresca.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n3',
    name: 'Enroladinho de Presunto',
    description: 'Massa leve com presunto, mussarela e orégano.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n4',
    name: 'Empada de Palmito',
    description: 'Massa podre que derrete na boca com recheio cremoso de palmito.',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n5',
    name: 'Pastel de Queijo',
    description: 'Pastel crocante recheado com queijo derretido.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },
  {
    id: 's_n6',
    name: 'Risoles de Carne',
    description: 'Risoles crocantes com recheio de carne moída temperada.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&q=80&w=800',
    category: 'snacks'
  },

  // Acompanhamentos
  {
    id: 's1',
    name: 'Batatas Quânticas',
    description: 'Batatas belgas fritas duas vezes com sal de alecrim.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },
  {
    id: 's2',
    name: 'Onion Rings Binary',
    description: 'Anéis de cebola empanados em panko com páprica defumada.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },
  {
    id: 's3',
    name: 'Nuggets Tech',
    description: 'Nuggets de frango crocantes servidos com molho especial.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },
  {
    id: 's4',
    name: 'Mandioca Frita',
    description: 'Mandioca crocante por fora e macia por dentro.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },

  // Sucos e Bebidas
  {
    id: 'd1',
    name: 'Limonada Neon',
    description: 'Limonada fresca com um toque de chá de clitória (butterfly pea tea).',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd2',
    name: 'Suco de Laranja Real',
    description: '100% natural, espremido na hora. Sem adição de açúcar.',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd3',
    name: 'Abacaxi com Hortelã',
    description: 'Refrescante e digestivo, perfeito para acompanhar seu burger.',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd4',
    name: 'Pink Lemonade',
    description: 'Limonada com frutas vermelhas e gelo picado.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd5',
    name: 'Milkshake de Chocolate',
    description: 'Cremoso milkshake de chocolate com chantilly.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd6',
    name: 'Refrigerante',
    description: 'Coca-Cola, Guaraná ou Sprite 350ml.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  },
  {
    id: 'd7',
    name: 'Água de Coco',
    description: 'Água de coco natural gelada.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=800',
    category: 'drinks'
  }
];
