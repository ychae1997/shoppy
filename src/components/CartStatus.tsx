import { AiOutlineShoppingCart } from "react-icons/ai";
import useCarts from "../hooks/useCarts";

export default function CartStatus() {
  const {
    cartQuery: { data: products }
  } = useCarts();

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
