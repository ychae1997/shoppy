import { PriceCardType } from "../types/elementTypes";

export default function PriceCard({ text, price }: PriceCardType) {
  return (
    <div className="bg-gray-50 p-8 mx-2 rounded-2xl text-center basis-4/12">
      <p className="text-lg md:text-xl">{text}</p>
      <p className="font-bold text-brand text-xl md:text-2xl">{price}</p>
    </div>
  );
}
