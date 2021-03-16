import { verifyToken } from "../token/index.ts";
import { Bson, userCollection } from "../database/index.ts";

export default async function validateToken(ctx: any) {
  console.log(ctx, "ctx");
  const { token } = ctx.request.headers;
  if (!token) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "请提供有效的token",
    };
    return false;
  }
  try {
    const { _id, username } = await verifyToken(token);
    let result = await userCollection.findOne({
      _id: new Bson.ObjectId(_id as string),
    });
    if (result && result.username === username) {
      return true;
    }
    return false;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: "请提供有效的token",
    };
  }
}
