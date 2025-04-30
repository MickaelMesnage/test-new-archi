import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../api/src/infrastructure/router";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export type Input = inferRouterInputs<AppRouter>;
export type Output = inferRouterOutputs<AppRouter>;
