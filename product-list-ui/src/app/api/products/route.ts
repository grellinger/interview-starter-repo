import { NextResponse } from "next/server";

// Backend-for-frontend (BFF) route. The browser calls /api/products and this
// server-side handler proxies to the Spring Boot API. Point it elsewhere with
// the SPRING_API_URL env var (see .env.local.example).
const SPRING_API_URL =
  process.env.SPRING_API_URL ?? "http://localhost:8080/api/products";

export async function GET() {
  const res = await fetch(SPRING_API_URL, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(SPRING_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
