import { useQuery } from "@tanstack/react-query";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductType } from "../types/productTypes";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { AuthType } from "../types/authTypes";
export default function CartStatus() {
  const { user } = useAuthContext() as AuthType;
  const { data: products } = useQuery<ProductType[] | undefined>(
    ["carts"],
    () => getCart(user.uid)
  );
  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-3xl" />
      {products && (
        <p className="w-5 h-5 text-center bg-brand text-white text-sm rounded-full absolute -top-2 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
}
