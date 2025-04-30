import { ProductEntity } from "../../domain/entities/ProductEntity";
import prisma from "../../infrastructure/database/prisma";
import { ProductMapper } from "../../infrastructure/mappers/ProductMapper";

export class ProductService {
  async findAll(): Promise<ProductEntity[]> {
    const products = await prisma.product.findMany();
    return products.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async create(data: {
    name: string;
    description?: string;
    price: number;
  }): Promise<ProductEntity> {
    const product = await prisma.product.create({
      data,
    });
    return ProductMapper.toDomain(product);
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
    }
  ): Promise<ProductEntity> {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return ProductMapper.toDomain(product);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
