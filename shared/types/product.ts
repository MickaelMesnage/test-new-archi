export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
};

export type UpdateProductInput = Partial<CreateProductInput>;
