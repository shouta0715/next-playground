import { Hono } from "hono";
import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3",
    allowHeaders: ["Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Authorization"],
    credentials: true,
  })
);

// ルートの統合
app.route("/auth", authRoutes);
app.route("/", postsRoutes);

export default app;
