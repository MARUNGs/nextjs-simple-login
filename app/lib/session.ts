import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

/**
 * [공통] 세션관리 - 사용자 로그인 처리
 */
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "tweet-session",
    password: process.env.COOKIE_PASSWORD!,
  });
}
