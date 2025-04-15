import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const checkAuth = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  if (!authToken) {
    redirect("/login");
  }
  return authToken;
};
