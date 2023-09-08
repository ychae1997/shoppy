import React from "react";
import { Link } from "react-router-dom";
import { FaShopify, FaPencilAlt } from "react-icons/fa";

export default function Header() {
  return (
    <header className="border-b border-gray-300 py-4">
      <div className="container m-auto flex justify-between">
        <h1>
          <Link to="/" className="flex items-center text-4xl text-brand">
            <FaShopify />
            Shoppy
          </Link>
        </h1>
        <nav className="flex gap-4 items-center font-semibold">
          <Link to="/products">Proudcts</Link>
          <Link to="/carts">Carts</Link>
          <Link to="/products/new">
            <span className="hidden">상품추가</span>
            <FaPencilAlt className="text-xl" />
          </Link>
          <button>Login</button>
        </nav>
      </div>
    </header>
  );
}
