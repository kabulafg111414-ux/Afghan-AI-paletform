const BACKEND_ORIGIN = "https://afghan-ai-paletform.onrender.com";
const API_PATHS = new Set(["/api/health", "/api/chat", "/api/translate"]);

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);

    if (incoming.pathname.startsWith("/api/")) {
      if (!API_PATHS.has(incoming.pathname)) {
        return Response.json({ error: "Not found" }, { status: 404 });
      }

      const target = new URL(incoming.pathname + incoming.search, BACKEND_ORIGIN);
      const headers = new Headers(request.headers);
      headers.delete("host");
      headers.delete("content-length");

      try {
        const upstreamRequest = new Request(target, {
          method: request.method,
          headers,
          body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
          redirect: "manual",
        });
        const upstream = await fetch(upstreamRequest);
        const responseHeaders = new Headers(upstream.headers);
        responseHeaders.set("Cache-Control", "no-store");
        return new Response(upstream.body, {
          status: upstream.status,
          statusText: upstream.statusText,
          headers: responseHeaders,
        });
      } catch {
        return Response.json(
          { error: "AI backend is temporarily unavailable" },
          { status: 502, headers: { "Cache-Control": "no-store" } },
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
