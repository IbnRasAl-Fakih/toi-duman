const DEFAULT_BACKEND_API_URL = "http://127.0.0.1:8000/api/v1";

export function getBackendApiUrl() {
  return process.env.BACKEND_API_URL ?? DEFAULT_BACKEND_API_URL;
}

function formatValidationIssue(issue: unknown) {
  if (!issue || typeof issue !== "object") {
    return null;
  }

  const candidate = issue as {
    msg?: unknown;
    loc?: unknown;
  };

  if (typeof candidate.msg !== "string") {
    return null;
  }

  const location = Array.isArray(candidate.loc)
    ? candidate.loc
        .filter((part): part is string | number => ["string", "number"].includes(typeof part))
        .join(".")
    : "";

  return location ? `${location}: ${candidate.msg}` : candidate.msg;
}

function normalizeBackendErrorDetail(detail: unknown): string | null {
  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    const issues = detail
      .map((issue) => formatValidationIssue(issue))
      .filter((issue): issue is string => Boolean(issue));

    if (issues.length > 0) {
      return issues.join("; ");
    }
  }

  if (detail && typeof detail === "object") {
    const formattedIssue = formatValidationIssue(detail);

    if (formattedIssue) {
      return formattedIssue;
    }
  }

  return null;
}

export async function parseBackendError(response: Response) {
  try {
    const data = (await response.json()) as { detail?: unknown };
    return normalizeBackendErrorDetail(data.detail) ?? "Backend request failed";
  } catch {
    return "Backend request failed";
  }
}
