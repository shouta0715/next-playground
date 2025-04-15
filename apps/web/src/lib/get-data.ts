import { env } from "@/env";
import { checkAuth } from "./check-auth";

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export const getData = async (): Promise<
  Result<{
    posts: { id: number; title: string; content: string }[];
  }>
> => {
  const authToken = await checkAuth();

  try {
    const response = await fetch(`${env.API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "データの取得に失敗しました",
    };
  }
};
