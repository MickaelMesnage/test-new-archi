import { Prisma } from "@prisma/client";
import { ProductEntity } from "../../domain/entities/ProductEntity";
export class ProductMapper {
  static toDomain(prismaProduct: Prisma.ProductGetPayload<{}>): ProductEntity {
    return new ProductEntity(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.description,
      prismaProduct.price,
      prismaProduct.createdAt,
      prismaProduct.updatedAt
    );
  }

  static toResponseDto(product: ProductEntity) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
