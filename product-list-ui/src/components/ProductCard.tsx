import { Product } from "@/lib/types";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card}>
      <h3>{product.name}</h3>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
    </div>
  );
}
