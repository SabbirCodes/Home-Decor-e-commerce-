import { headers, cookies } from "next/headers";

/**
 * Resolves the absolute base URL for the current request so Server Components
 * can call our own API routes with a plain fetch().
 */
async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

/**
 * Fetch wrapper for Server Components / Server Actions calling our own API routes.
 * Forwards the incoming request's cookies so session-protected endpoints
 * (e.g. /api/orders, /api/products for admin writes) work the same way they
 * would from the browser. Defaults to no caching since this is a live store.
 */
export async function serverFetch<T = any>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    cache: init.cache ?? "no-store",
    headers: {
      ...(init.headers || {}),
      cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    if (res.status === 404) return null as T;
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed with ${res.status}`);
  }

  return res.json();
}