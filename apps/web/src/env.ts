import { createEnv } from "valibot-env/nextjs";
import * as v from "valibot";

export const env = createEnv({
  schema: {
    private: {
      API_URL: v.pipe(v.string(), v.url()),
    },
  },
  values: {
    API_URL: process.env.API_URL,
  },
});
