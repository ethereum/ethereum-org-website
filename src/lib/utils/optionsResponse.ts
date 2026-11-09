type RouteMethod = "GET" | "HEAD" | "POST"

export function createOptionsResponse(
  methods: readonly RouteMethod[]
): Response {
  return new Response(null, {
    status: 204,
    headers: { Allow: [...methods, "OPTIONS"].join(", ") },
  })
}
