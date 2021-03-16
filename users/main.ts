import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router/index.ts";
import validateToken from "./validator/token-validate.ts";

const app = new Application();

app.use((ctx) => {
  validateToken(ctx);
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx) => {
  ctx.response.body = "hello world";
});

await app.listen({
  port: 9000,
});
