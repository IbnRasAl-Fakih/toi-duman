import { cookies } from "next/headers";
import { getBackendApiUrl } from "@/lib/backend-api";

export const ACCESS_TOKEN_COOKIE = "td_access_token";
export const USER_ID_COOKIE = "td_user_id";
export const USER_ROLE_COOKIE = "td_user_role";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export type AuthSession = {
  accessToken: string;
  userId: string;
  role: string;
};

export type AuthUser = {
  id: string;
  email: string | null;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const userId = cookieStore.get(USER_ID_COOKIE)?.value;
  const role = cookieStore.get(USER_ROLE_COOKIE)?.value;

  if (!accessToken || !userId || !role) {
    return null;
  }

  return {
    accessToken,
    userId,
    role,
  };
}

export async function getCurrentUser() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  try {
    const response = await fetch(`${getBackendApiUrl()}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as AuthUser;
  } catch {
    return null;
  }
}
