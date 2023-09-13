import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { ProductType } from "../types/productTypes";
import upload from "../api/upload";
import { addNewProduct } from "../api/firebase";

export default function Admin() {
  const [product, setProduct] = useState<ProductType>({
    title: "",
    price: 0,
    category: "",
    description: "",
    options: ""
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return; // setProduct 호출 X
    }
    setProduct(product => ({
      ...product,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    file &&
      upload(file).then(url => {
        console.log(url);
        addNewProduct(product, url);
      });
    console.log(product);
  };
  return (
    <section className="container m-auto pt-20">
      <h2 className="mb-10">제품 등록</h2>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit} className="flex flex-col mb-10">
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
          value={product?.options ?? ""}
          text="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button text="등록하기" type="submit" />
      </form>
    </section>
  );
}
