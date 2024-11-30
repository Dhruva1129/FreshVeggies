export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Vegetable {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  unit: string;
  stock: number;
}

export interface CartItem {
  vegetable: Vegetable;
  quantity: number;
}