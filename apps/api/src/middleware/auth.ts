import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "認証が必要です" }, 401);
  }

  const token = authHeader.split(" ")[1];

  // ここでトークンの検証を行う
  // 実際のプロジェクトでは、JWTの検証やデータベースでの確認などを行う
  if (!token.startsWith("user-") || !token.endsWith("-token")) {
    return c.json({ error: "無効なトークンです" }, 401);
  }

  await next();
};
