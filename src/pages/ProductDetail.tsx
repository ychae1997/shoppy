import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { AuthType } from "../types/authTypes";
import { addOrUpdatedCart } from "../api/firebase";

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, price, description, options, category }
    }
  } = useLocation();

  // * 옵션선택
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  // * 장바구니 추가
  const { user } = useAuthContext() as AuthType;
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const userId = user && user.uid;
    const product = { id, image, title, price, options: selected, quantity: 1 };
    setIsUploading(true);
    addOrUpdatedCart(userId, product) //
      .then(() => {
        setSuccess("장바구니에 제품이 추가되었습니다.");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className="container mx-auto">
      <p className="py-3 text-gray-500">{category}</p>
      <figure className="flex gap-4 flex-col md:flex-row">
        <img className="w-full basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-2">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            {price}
          </p>
          <p className="text-lg py-4">{description}</p>
          <div className="flex items-center mb-4">
            <label className="text-brand font-bold" htmlFor="select">
              옵션
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}>
              {options &&
                options.map((option: string, index: number) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          {success && <p className="my-2">✅ {success}</p>}
          <Button
            text={isUploading ? "장바구니 추가중..." : "장바구니에 추가"}
            disabled={isUploading}
            onClick={handleClick}
          />
        </div>
      </figure>
    </section>
  );
}
