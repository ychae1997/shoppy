import useProduct from "../hooks/useProduct";
import ProductCard from "./ProductCard";
import Loading from "../pages/Loading";
import Error from "../pages/Error";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products }
  } = useProduct();

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
