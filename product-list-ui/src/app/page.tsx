"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import AddProduct from "@/components/AddProduct";
import ProductList from "@/components/ProductList";
import styles from "./page.module.scss";

export default function HomePage() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  return (
    <main className={styles.page}>
      <h1>Products</h1>
      <AddProduct />
      {isLoading && <p>Loading products…</p>}
      {isError && <p className={styles.error}>{(error as Error).message}</p>}
      {products && <ProductList products={products} />}
    </main>
  );
}
