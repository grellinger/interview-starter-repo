export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
}

export type NewProduct = Omit<Product, "id">;
