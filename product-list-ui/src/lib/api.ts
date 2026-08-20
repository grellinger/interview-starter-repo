import { Product, NewProduct } from "./types";

// These call the Next.js BFF route (/api/products), not the Spring API directly.
// The BFF brokers the call server-side, so the browser never talks to the
// backend host and there is no CORS to configure.

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`);
  }
  return res.json();
}

export async function createProduct(product: NewProduct): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error(`Failed to create product (${res.status})`);
  }
  return res.json();
}
