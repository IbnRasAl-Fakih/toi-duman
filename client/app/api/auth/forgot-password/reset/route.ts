import { NextResponse } from "next/server";
import { getBackendApiUrl, parseBackendError } from "@/lib/backend-api";

type ResetPasswordBody = {
  email?: string;
  code?: string;
  newPassword?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ResetPasswordBody;
  const email = body.email?.trim();
  const code = body.code?.trim();
  const newPassword = body.newPassword?.trim();

  if (!email || !code || !newPassword) {
    return NextResponse.json(
      { detail: "Email, code and new password are required" },
      { status: 400 }
    );
  }

  const formData = new URLSearchParams();
  formData.set("email", email);
  formData.set("code", code);
  formData.set("new_password", newPassword);

  const backendResponse = await fetch(`${getBackendApiUrl()}/auth/forgot-password/reset`, {
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

  return NextResponse.json(await backendResponse.json());
}
