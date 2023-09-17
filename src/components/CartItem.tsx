import { addOrUpdatedCart, deletedCart } from "../api/firebase";
import { ProductType } from "../types/productTypes";
import {
  AiFillPlusSquare,
  AiFillMinusSquare,
  AiFillDelete
} from "react-icons/ai";

const ICON_CLASS =
  "transiton-all cursor-pointer hover:text-brand hover:scale-105";

export default function CartItem({
  product,
  userId
}: {
  product: ProductType;
  userId: string;
}) {
  const { id, image, title, options, price } = product;
  const quantity = product && (product.quantity as number);

  const handlePlus = () => {
    addOrUpdatedCart(userId, { ...product, quantity: quantity + 1 });
  };
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdatedCart(userId, { ...product, quantity: quantity - 1 });
  };
  const handleDelete = () => {
    deletedCart(userId, id as string);
  };

  return (
    <li className="flex justify-between items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between">
        <div className="basis-3/5 px-3">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{options}</p>
          <p>{price} 원</p>
        </div>
        <div className="flex items-center text-2xl gap-2">
          <AiFillPlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <span>{quantity}</span>
          <AiFillMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <AiFillDelete className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
