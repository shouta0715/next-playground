import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  // 認証ページにアクセスしており、すでにログインしている場合
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 認証が必要なページにアクセスしており、ログインしていない場合
  if (!isAuthPage && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
