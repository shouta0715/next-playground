import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

export const authMiddleware = async (c: Context, next: Next) => {
  const authToken = getCookie(c, "auth_token");

  if (!authToken) {
    return c.json({ error: "認証が必要です" }, 401);
  }

  if (!authToken.startsWith("user-") || !authToken.endsWith("-token")) {
    return c.json({ error: "無効なトークンです" }, 401);
  }

  await next();
};
