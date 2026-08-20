import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.scss";

export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p>No products yet. Add one above.</p>;
  }
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
