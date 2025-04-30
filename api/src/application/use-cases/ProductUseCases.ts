import { ProductEntity } from "../../domain/entities/ProductEntity";
import { ProductService } from "../services/ProductService";

export class ProductUseCases {
  constructor(private productService: ProductService) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  async getProductById(id: string): Promise<ProductEntity | null> {
    return this.productService.findById(id);
  }

  async createProduct(data: {
    name: string;
    description?: string;
    price: number;
  }): Promise<ProductEntity> {
    const product = ProductEntity.create(data);
    if (!product.isValid()) {
      throw new Error("Invalid product data");
    }
    return this.productService.create(data);
  }

  async updateProduct(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
    }
  ): Promise<ProductEntity> {
    const existingProduct = await this.productService.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    return this.productService.update(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    const existingProduct = await this.productService.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    await this.productService.delete(id);
  }
}
