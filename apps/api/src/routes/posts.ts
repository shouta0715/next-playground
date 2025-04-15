import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";

const app = new Hono();

// サンプルの投稿データ
const posts = [
  { id: 1, title: "最初の投稿", content: "これは最初の投稿です" },
  { id: 2, title: "2番目の投稿", content: "これは2番目の投稿です" },
  { id: 3, title: "3番目の投稿", content: "これは3番目の投稿です" },
];

app.get("/posts", (c) => {
  return c.json({ posts });
});

export default app;
