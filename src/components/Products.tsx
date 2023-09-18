import { getProducts } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import Loading from "../pages/Loading";
import Error from "../pages/Error";
import ProductCard from "./ProductCard";
import { ProductType } from "../types/productTypes";

export default function Products() {
  const {
    isLoading,
    error,
    data: products
  } = useQuery<ProductType[] | undefined>(["products"], getProducts, {
    staleTime: 1000 * 60
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      <article className="container mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {products &&
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ul>
      </article>
    </>
  );
}
