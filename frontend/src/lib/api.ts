const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/** A single field-level validation error returned by the API. */
export interface ApiFieldError {
  field: string;
  message: string;
}

/**
 * Error thrown by {@link fetchApi}. Carries the raw field errors plus a
 * `fieldErrors` map (one readable string per field, with multiple messages
 * for the same field concatenated) so callers can surface them inline.
 */
export class ApiError extends Error {
  errors: ApiFieldError[];
  fieldErrors: Record<string, string>;

  constructor(
    message: string,
    errors: ApiFieldError[] = [],
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.fieldErrors = fieldErrors;
  }
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const rawErrors: ApiFieldError[] = Array.isArray(errorData.errors)
      ? errorData.errors
      : [];

    // Group by field, concatenating multiple messages for the same field into
    // one readable string (e.g. password length + complexity rules).
    const fieldErrors = rawErrors.reduce<Record<string, string>>(
      (acc, { field, message }) => {
        if (!field || !message) return acc;
        acc[field] = acc[field] ? `${acc[field]} ${message}` : message;
        return acc;
      },
      {},
    );

    // Prefer the detailed field messages for the top-level message; fall back
    // to the server's summary message.
    const combined = Object.values(fieldErrors).join("\n");
    const message =
      combined || errorData.message || "Something went wrong";

    throw new ApiError(message, rawErrors, fieldErrors);
  }

  return response.json();
}
