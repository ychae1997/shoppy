import { useNavigate } from "react-router-dom";
import { ProductType } from "../types/productTypes";

export default function ProductCard({ product }: { product: ProductType }) {
  const { id, title, image, category, price } = product;
  const navigate = useNavigate();
  return (
    <li
      className="rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/products/${id}`, { state: { product } })}>
      <div className="overflow-hidden">
        <img
          className="w-full  transition-all hover:scale-110"
          src={image}
          alt={title}
        />
      </div>
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className="px-2 mb-2 text-gray-400">{category}</p>
    </li>
  );
}
