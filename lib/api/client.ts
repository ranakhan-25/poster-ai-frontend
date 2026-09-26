const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  details?: Array<{
    path: string[];
    message: string;
  }>;
}

/*
 * ---------------------------------------------------------
 * Refresh Token State
 * ---------------------------------------------------------
 *
 * If multiple API requests receive 401 at the same time,
 * we should NOT call /auth/refresh multiple times.
 *
 * All requests will wait for the same refreshPromise.
 */

let refreshPromise: Promise<boolean> | null = null;

/*
 * ---------------------------------------------------------
 * Refresh Access Token
 * ---------------------------------------------------------
 *
 * The refreshToken is HttpOnly, so JavaScript cannot read it.
 * The browser automatically sends it with credentials: "include".
 *
 * Backend:
 *
 * POST /auth/refresh
 *
 * If refreshToken is valid:
 *     backend creates a new accessToken
 *     backend replaces the accessToken cookie
 */

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      /*
       * We don't need to read the access token.
       *
       * It is HttpOnly.
       *
       * Browser receives the new cookie automatically.
       */
      return response.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/*
 * ---------------------------------------------------------
 * Main API Request
 * ---------------------------------------------------------
 */

async function request<T>(
  path: string,
  options?: RequestInit,
  isRetry = false,
): Promise<ApiResponse<T>> {
  const fetchOptions = options ?? {};

  const headers = new Headers(fetchOptions.headers);

  /*
   * Do NOT manually set Content-Type for FormData.
   *
   * Browser needs to create the multipart boundary itself.
   */
  if (
    !headers.has("Content-Type") &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  /*
   * IMPORTANT:
   *
   * credentials: "include"
   * sends HttpOnly cookies:
   *
   * accessToken
   * refreshToken
   */
  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  /*
   * -------------------------------------------------------
   * Access Token Expired
   * -------------------------------------------------------
   *
   * Example:
   *
   * GET /auth/me
   *        ↓
   * 401 Access Token expired
   *        ↓
   * POST /auth/refresh
   *        ↓
   * New Access Token cookie
   *        ↓
   * Original request again
   *
   * isRetry prevents an infinite loop.
   */
  if (response.status === 401 && !isRetry && !path.includes("/auth/refresh")) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      /*
       * Access Token cookie has now been replaced.
       *
       * Retry the exact same request.
       */
      return request<T>(path, options, true);
    }
  }

  /*
   * -------------------------------------------------------
   * Parse Server Response
   * -------------------------------------------------------
   */

  let body: ApiResponse<T> | ApiError;

  try {
    body = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  /*
   * -------------------------------------------------------
   * Handle API Errors
   * -------------------------------------------------------
   */

  if (!response.ok || !body.success) {
    throw new Error(body.message ?? "Request failed");
  }

  return body as ApiResponse<T>;
}

/*
 * ---------------------------------------------------------
 * Public API Client
 * ---------------------------------------------------------
 */

export const apiClient = {
  /*
   * GET
   */
   get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: "GET",
    }),

  /*
   * POST
   */
   post: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  /*
   * POST with FormData (file uploads)
   *
   * Does NOT JSON-stringify — lets the browser set the
   * multipart boundary. Still goes through request() so
   * that 401 → refresh → retry works.
   */
   postFormData: <T>(path: string, body: FormData, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: "POST",
      body,
    }),

  /*
   * PUT
   */
   put: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  /*
   * DELETE
   */
   del: <T>(path: string, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: "DELETE",
    }),
};
