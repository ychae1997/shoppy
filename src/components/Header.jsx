import React from 'react';
import { Link } from 'react-router-dom';
import { FaShopify, FaPencilAlt } from 'react-icons/fa';


export default function Header() {
  return (
    <header>
      <h1><Link to='/'>
        <FaShopify />
        Shoppy</Link></h1>
      <nav>
        <Link to='/products'>Proudcts</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>
          <span>상품추가</span>
          <FaPencilAlt />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}

