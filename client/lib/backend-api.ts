const DEFAULT_BACKEND_API_URL = "http://127.0.0.1:8000/api/v1";

export function getBackendApiUrl() {
  return process.env.BACKEND_API_URL ?? DEFAULT_BACKEND_API_URL;
}

export async function parseBackendError(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string };
    return data.detail ?? "Backend request failed";
  } catch {
    return "Backend request failed";
  }
}
