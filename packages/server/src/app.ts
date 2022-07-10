import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", async ctx => {
  ctx.body = "Welcome to Instaclone";
});

app.use(router.routes());

app.use(ctx => {
  ctx.body = "Não encontrado";
  ctx.status = 404;
});

export default app;
