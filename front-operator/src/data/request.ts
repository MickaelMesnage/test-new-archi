import { trpc, type Output } from "src/utils/trpc";

export const productGetAllQuery = () => ({
  queryKey: ["products"],
  queryFn: async (): Promise<Output["product"]["getAll"]> =>
    await trpc.product.getAll.query(),
});
