import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./router";

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

const port = Number(process.env.PORT) || 3000;
server.listen(port);

console.log(`🚀 Server listening on port ${port}`);
