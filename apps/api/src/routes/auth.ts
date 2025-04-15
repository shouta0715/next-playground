import { Hono } from "hono";
import { setCookie } from "hono/cookie";

const app = new Hono();

// サンプルのユーザーデータ
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.post("/login", async (c) => {
  const { username, password } = await c.req.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return c.json(
      { error: "ユーザー名またはパスワードが正しくありません" },
      401
    );
  }

  // トークンを生成（実際のプロジェクトではJWTなどを使用）
  const token = `user-${user.id}-token`;
  setCookie(c, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return c.json({ message: "ログイン成功", token });
});

app.post("/logout", (c) => {
  // Cookieを削除
  setCookie(c, "auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 0,
    path: "/",
  });

  return c.json({ message: "ログアウト成功" });
});

export default app;
