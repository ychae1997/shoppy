import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Carts from "./pages/Carts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <AllProducts />
      },
      {
        path: "products/new",
        element: (
          <ProtectedRoute requiredAdmin>
            <Admin />
          </ProtectedRoute>
        )
      },
      {
        path: "products/:id",
        element: <ProductDetail />
      },
      {
        path: "carts",
        element: (
          <ProtectedRoute>
            <Carts />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
