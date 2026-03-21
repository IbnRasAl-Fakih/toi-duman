import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getBackendApiUrl, parseBackendError } from "@/lib/backend-api";

type RequestCodeBody = {
  email?: string;
};

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as RequestCodeBody;
  const email = body.email?.trim();

  if (!email) {
    return NextResponse.json({ detail: "Email is required" }, { status: 400 });
  }

  const formData = new URLSearchParams();
  formData.set("email", email);

  const backendResponse = await fetch(`${getBackendApiUrl()}/auth/email/request-code`, {
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
