import { Hono } from "hono";
import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";

const app = new Hono();

// ルートの統合
app.route("/auth", authRoutes);
app.route("/", postsRoutes);

export default app;
