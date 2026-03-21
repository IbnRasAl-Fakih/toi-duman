import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_ID_COOKIE,
  USER_ROLE_COOKIE,
} from "@/lib/auth";
import { getBackendApiUrl, parseBackendError } from "@/lib/backend-api";

type LoginRequestBody = {
  userId?: string;
  password?: string;
};

function getRefreshTokenFromHeaders(response: Response) {
  const headersWithCookies = response.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookieHeaders =
    typeof headersWithCookies.getSetCookie === "function"
      ? headersWithCookies.getSetCookie()
      : [];

  const refreshCookie = setCookieHeaders.find((header) =>
    header.startsWith(`${REFRESH_TOKEN_COOKIE}=`)
  );

  if (!refreshCookie) {
    return null;
  }

  const match = refreshCookie.match(
    new RegExp(`${REFRESH_TOKEN_COOKIE}=([^;]+)`)
  );

  return match?.[1] ?? null;
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequestBody;
  const userId = body.userId?.trim();
  const password = body.password?.trim();

  if (!userId || !password) {
    return NextResponse.json(
      { detail: "User ID and password are required" },
      { status: 400 }
    );
  }

  const formData = new URLSearchParams();
  formData.set("user_id", userId);
  formData.set("password", password);

  const backendResponse = await fetch(`${getBackendApiUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    cache: "no-store",
  });

  if (!backendResponse.ok) {
    const detail = await parseBackendError(backendResponse);
    return NextResponse.json({ detail }, { status: backendResponse.status });
  }

  const data = (await backendResponse.json()) as {
    access_token: string;
    user_id: string;
    role: string;
  };

  const response = NextResponse.json({
    success: true,
    user: {
      id: data.user_id,
      role: data.role,
    },
  });

  response.cookies.set(ACCESS_TOKEN_COOKIE, data.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60,
  });
  response.cookies.set(USER_ID_COOKIE, data.user_id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60,
  });
  response.cookies.set(USER_ROLE_COOKIE, data.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60,
  });

  const refreshToken = getRefreshTokenFromHeaders(backendResponse);

  if (refreshToken) {
    response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  return response;
}
