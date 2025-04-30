import { initTRPC } from "@trpc/server";
import { productRouter } from "./product.router";

const t = initTRPC.create();

export const appRouter = t.router({
  product: productRouter,
});

export type AppRouter = typeof appRouter;
