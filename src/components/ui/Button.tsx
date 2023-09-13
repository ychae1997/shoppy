import { ButtonType } from "../../types/elementTypes";

export default function Button({ text, onClick, type = "button" }: ButtonType) {
  return (
    <button
      className="bg-brand text-white px-4 py-2 rounded-md hover:brightness-110"
      type={type}
      onClick={onClick}>
      {text}
    </button>
  );
}
