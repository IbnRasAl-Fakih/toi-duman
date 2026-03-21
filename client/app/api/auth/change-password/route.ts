import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getBackendApiUrl, parseBackendError } from "@/lib/backend-api";

type ChangePasswordBody = {
  oldPassword?: string;
  newPassword?: string;
};

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ChangePasswordBody;
  const oldPassword = body.oldPassword?.trim();
  const newPassword = body.newPassword?.trim();

  if (!oldPassword || !newPassword) {
    return NextResponse.json(
      { detail: "Current and new password are required" },
      { status: 400 }
    );
  }

  const formData = new URLSearchParams();
  formData.set("old_password", oldPassword);
  formData.set("new_password", newPassword);

  const backendResponse = await fetch(`${getBackendApiUrl()}/auth/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    cache: "no-store",
  });

  if (!backendResponse.ok) {
    const detail = await parseBackendError(backendResponse);
    return NextResponse.json({ detail }, { status: backendResponse.status });
  }

  return NextResponse.json(await backendResponse.json());
}
