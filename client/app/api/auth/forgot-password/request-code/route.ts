import { NextResponse } from "next/server";
import { getBackendApiUrl, parseBackendError } from "@/lib/backend-api";

type ForgotPasswordRequestBody = {
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ForgotPasswordRequestBody;
  const email = body.email?.trim();

  if (!email) {
    return NextResponse.json({ detail: "Email is required" }, { status: 400 });
  }

  const formData = new URLSearchParams();
  formData.set("email", email);

  const backendResponse = await fetch(
    `${getBackendApiUrl()}/auth/forgot-password/request-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      cache: "no-store",
    }
  );

  if (!backendResponse.ok) {
    const detail = await parseBackendError(backendResponse);
    return NextResponse.json({ detail }, { status: backendResponse.status });
  }

  return NextResponse.json(await backendResponse.json());
}
