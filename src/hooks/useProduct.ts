import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";
import { ProductType } from "./../types/productTypes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type productsQueryType = ProductType[] | undefined;
type addProductType = { product: ProductType; url: string };

export default function useProduct() {
  // * getProdcuts
  const productsQuery = useQuery<productsQueryType>(
    ["products"], // 동일 키 사용
    fetchProducts,
    {
      staleTime: 1000 * 60
    }
  );

  // * addProduct
  const client = useQueryClient();
  const addProduct = useMutation(
    ({ product, url }: addProductType) => addNewProduct(product, url),
    // 어떤 함수를 인자로 받아 변경할 건지 선택
    { onSuccess: () => client.invalidateQueries(["products"]) }
    // invalidate -> product키를 가진 캐싱값 refetch
  );

  return { productsQuery, addProduct };
}
