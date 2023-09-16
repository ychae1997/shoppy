import { Link } from "react-router-dom";
import { FaShopify, FaPencilAlt } from "react-icons/fa";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { AuthType } from "../types/authTypes";

export default function Header() {
  const { user, login, logout } = useAuthContext() as AuthType;

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
          {!user && <Button text="login" onClick={login} />}
          {user && <Button text="logout" onClick={logout} />}
        </nav>
      </div>
    </header>
  );
}
