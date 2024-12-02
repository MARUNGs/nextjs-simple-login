import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";

const publicUrl = new Set(["/create-account", "/login"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { url } = request;
  const session = await getSession();
  const exists = publicUrl.has(pathname);

  // 로그인하지 않은 유저이면서 허용되지 않은 url로 접근했을 때 home('/')으로 이동
  if (!session.id && !exists) {
    return NextResponse.redirect(new URL("/login", url));
  }

  // 이미 로그인한 유저는 로그아웃을 제외한 공개 URL에 접근할 이유가 없으므로 프로필 페이지로 이동
  // 변경 :: 메인화면으로 이동
  if (session.id && exists) {
    return NextResponse.redirect(new URL("/", url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
