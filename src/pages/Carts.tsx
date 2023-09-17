import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../types/productTypes";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { AuthType } from "../types/authTypes";
import Loading from "./Loading";
import CartItem from "../components/CartItem";
import Button from "../components/ui/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";

const SHIPPING = 3000;
export default function Carts() {
  const { user } = useAuthContext() as AuthType;
  const { isLoading, data: products } = useQuery<ProductType[] | undefined>(
    ["carts"],
    () => getCart(user.uid)
  );

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce((acc, product) => {
      const productQuantity = product.quantity ?? 1;
      const productTotal = product.price * productQuantity;
      return acc + productTotal;
    }, 0);

  if (isLoading) return <Loading />;
  return (
    <section className="grid gap-8 container mx-auto p-8">
      <h2 className="text-center font-bold text-2xl">장바구니</h2>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 pb-6 gap-4 grid">
            {products &&
              products.map(product => (
                <CartItem
                  key={product.id}
                  product={product}
                  userId={user.uid}
                />
              ))}
          </ul>
          <div className="flex items-center justify-center">
            <PriceCard text="상품 총액" price={totalPrice} />
            <AiFillPlusCircle className="shrink-0 text-2xl text-gray-400" />
            <PriceCard text="배송비" price={SHIPPING} />
            <FaEquals className="shrink-0 text-xl text-gray-400" />
            <PriceCard text="총가격" price={(totalPrice ?? 0) + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
