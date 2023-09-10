import { ButtonType } from "../../types/buttonTypes";

export default function Button({ text, onClick }: ButtonType) {
  return (
    <button
      className="bg-brand text-white px-4 py-2 rounded-md hover:brightness-110"
      onClick={onClick}>
      {text}
    </button>
  );
}
