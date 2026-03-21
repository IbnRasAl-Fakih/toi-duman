import { NextResponse } from "next/server";
import { getBackendApiUrl, parseBackendError } from "@/lib/backend-api";

export async function POST() {
  const formData = new URLSearchParams();
  formData.set("role", "client");

  const backendResponse = await fetch(`${getBackendApiUrl()}/auth/users`, {
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
    id: string;
    role: string;
    generated_password: string;
  };

  return NextResponse.json({
    id: data.id,
    role: data.role,
    generatedPassword: data.generated_password,
  });
}
