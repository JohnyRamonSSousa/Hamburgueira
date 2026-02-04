
export interface BurgerProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classic' | 'smash' | 'gourmet' | 'sides' | 'drinks' | 'snacks' | 'custom';
}

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  category: 'bread' | 'meat' | 'cheese' | 'salad' | 'sauce' | 'extra';
}

export interface CartItem extends BurgerProduct {
  quantity: number;
  customIngredients?: string[];
}

export interface User {
  name: string;
  email: string;
  registeredAt: Date;
}

export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivered';
}
