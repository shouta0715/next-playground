import { env } from "@/env";

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
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const response = await fetch(`http://localhost:8787/posts`, {
      credentials: "include",
      cache: "no-store",
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
