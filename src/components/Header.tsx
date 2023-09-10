import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShopify, FaPencilAlt } from "react-icons/fa";
import { login, logout, onUserStateChange } from "../api/firebase";
import { NullableUser } from "../types/authTypes";
import User from "./User";

export default function Header() {
  const [user, setUser] = useState<NullableUser>(null);
  useEffect(() => {
    onUserStateChange((user: NullableUser) => {
      console.log(user);
      setUser(user);
    });
  }, []);

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
          {user && <Link to="/carts">Carts</Link>}
          {user?.isAdmin && (
            <Link to="/products/new">
              <span className="hidden">상품추가</span>
              <FaPencilAlt className="text-xl" />
            </Link>
          )}
          {user && <User user={user} />}
          {!user && <button onClick={login}>Login</button>}
          {user && <button onClick={logout}>Logout</button>}
        </nav>
      </div>
    </header>
  );
}
