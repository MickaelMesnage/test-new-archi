import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { ProductService } from "../../application/services/ProductService";
import { ProductUseCases } from "../../application/use-cases/ProductUseCases";
import { ProductMapper } from "../mappers/ProductMapper";

const t = initTRPC.create();

const productService = new ProductService();
const productUseCases = new ProductUseCases(productService);

export const productRouter = t.router({
  getAll: t.procedure.query(async () => {
    const products = await productUseCases.getAllProducts();
    return products.map(ProductMapper.toResponseDto);
  }),

  getById: t.procedure.input(z.string()).query(async ({ input }) => {
    const product = await productUseCases.getProductById(input);
    return product ? ProductMapper.toResponseDto(product) : null;
  }),

  create: t.procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await productUseCases.createProduct(input);
      return ProductMapper.toResponseDto(product);
    }),

  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const product = await productUseCases.updateProduct(id, data);
      return ProductMapper.toResponseDto(product);
    }),

  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    await productUseCases.deleteProduct(input);
    return true;
  }),
});
