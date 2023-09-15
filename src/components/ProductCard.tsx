import { ProductType } from "../types/productTypes";

export default function ProductCard({ product }: { product: ProductType }) {
  const { id, title, image, category, price } = product;
  return (
    <li className="rounded-lg shadow-md overflow-hidden cursor-pointer">
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className="px-2 mb-2 text-gray-400">{category}</p>
    </li>
  );
}
