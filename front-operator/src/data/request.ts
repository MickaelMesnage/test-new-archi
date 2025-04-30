import { trpc, type Output } from "src/utils/trpc";

export const productGetAllQuery = () => ({
  queryKey: ["products"],
  queryFn: (): Promise<Output["product"]["getAll"]> =>
    trpc.product.getAll.query(),
});
