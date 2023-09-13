import { InputType } from "../../types/elementTypes";

export default function Input({
  type = "text",
  name = "",
  value = "",
  text = "",
  required,
  onChange
}: InputType) {
  return (
    <input
      className="border mb-2 p-2"
      type={type}
      name={name}
      placeholder={text}
      required={required ? true : false}
      onChange={onChange}
      {...(type !== "file" ? { value } : {})}
      {...(type === "file" ? { accept: "image/*" } : {})}
    />
  );
}
