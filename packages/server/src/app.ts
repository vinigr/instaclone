import Koa, { Request } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "kcors";
import { GraphQLError } from "graphql";
import { graphqlHTTP, OptionsData } from "koa-graphql";
import koaPlayground from "graphql-playground-middleware-koa";

import { schema } from "./graphql/schema/schema";
import { getContext } from "./context";
import { getUser } from "./auth";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(cors());

app.on("error", err => {
  // eslint-disable-next-line
  console.log("app error: ", err);
});

router.get("/", async ctx => {
  ctx.body = "Welcome to Instaclone";
});

const graphqlSettingsPerReq = async (req: Request) => {
  const { user } = await getUser(req.header.authorization);

  return {
    graphiql: process.env.NODE_ENV !== "production",
    schema,
    context: await getContext({
      req,
      user,
    }),
    customFormatErrorFn: (error: GraphQLError) => {
      // eslint-disable-next-line
      console.log(error.message);
      // eslint-disable-next-line
      console.log(error.locations);
      // eslint-disable-next-line
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  } as OptionsData;
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all("/graphql", graphqlServer);
router.all("/playground", koaPlayground({ endpoint: "/graphql" }));

app.use(router.routes()).use(router.allowedMethods());

export default app;
