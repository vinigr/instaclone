import { Request } from "koa";

import { UserDocument } from "./modules/user/UserModel";

type ContextVars = {
  user?: UserDocument | null;
  req?: Request;
};

export const getContext = async (ctx: ContextVars) => {
  return {
    req: ctx.req,
    user: ctx.user,
  };
};
