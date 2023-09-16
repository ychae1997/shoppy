import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  const {
    state: {
      product: { image, title, price, description, options, category }
    }
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.target);
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
          <Button text="장바구니에 추가" onClick={handleClick}></Button>
        </div>
      </figure>
    </section>
  );
}
