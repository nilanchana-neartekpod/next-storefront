import Link from "next/link";
import { getProducts } from "../utils/shopify";
export default async function Products() {
  const data = await getProducts();
  const products = data?.products?.edges;
  
  return (
    <div className="productsList">
      {products && products.map((product) => (
        <div>
          <Link href={`/products/${product.node.handle}`} key={product.node.id}>{product.node.title}-{product.node.priceRange.minVariantPrice.amount}</Link>
        </div>
      ))}
    </div>
  )
}