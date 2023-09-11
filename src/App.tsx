import React from "react";
import "./assets/styles/App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./components/context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
    </AuthContextProvider>
  );
}
