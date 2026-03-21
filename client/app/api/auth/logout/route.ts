import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_ID_COOKIE,
  USER_ROLE_COOKIE,
} from "@/lib/auth";
import { getBackendApiUrl } from "@/lib/backend-api";

export async function POST(request: Request) {
  const refreshToken =
    request.headers
      .get("cookie")
      ?.split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${REFRESH_TOKEN_COOKIE}=`))
      ?.split("=")[1] ?? null;

  if (refreshToken) {
    try {
      await fetch(`${getBackendApiUrl()}/auth/logout`, {
        method: "POST",
        headers: {
          Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
        },
      });
    } catch {
      // We still clear local cookies even if backend logout fails.
    }
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(USER_ID_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(USER_ROLE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0,
  });

  return response;
}
