import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { ProductType } from "../types/productTypes";
import upload from "../api/upload";
import { addNewProduct } from "../api/firebase";

export default function Admin() {
  const [product, setProduct] = useState<ProductType>(initialProduct);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return; // setProduct 호출 X
    }
    setProduct(product => ({
      ...product,
      [name]: value
      // 이미지 제외 필드 객체화
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    file &&
      upload(file) // 이미지 업로드
        .then(url => {
          // console.log(url);
          addNewProduct(product, url).then(() => {
            // db저장함수 호출
            setSuccess("성공적으로 제품이 추가되었습니다.");
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
            // 성공 메시지 띄우기 (4초 후 사라짐)
          });
        })
        .finally(() => setIsUploading(false));
    console.log(product);
  };
  return (
    <section className="container m-auto pt-20 text-center">
      <h2 className="my-4 font-bold">제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-12 my-10">
        <Input type="file" name="file" onChange={handleChange} />
        <Input
          type="text"
          name="title"
          value={product?.title ?? ""}
          text="제품명"
          required
          onChange={handleChange}
        />
        <Input
          type="number"
          name="price"
          value={product?.price ?? ""}
          text="가격"
          required
          onChange={handleChange}
        />
        <Input
          type="text"
          name="category"
          value={product?.category ?? ""}
          text="카테고리"
          required
          onChange={handleChange}
        />
        <Input
          type="text"
          name="description"
          value={product?.description ?? ""}
          text="제품설명"
          required
          onChange={handleChange}
        />
        <Input
          type="text"
          name="options"
          value={
            Array.isArray(product.options)
              ? product.options.join(", ")
              : product.options ?? ""
          }
          text="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
          type="submit"
        />
      </form>
    </section>
  );
}

export const initialProduct = {
  title: "",
  price: 0,
  category: "",
  description: "",
  // options: []
  options: ""
};
