import React from "react";
import { Outlet } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";

export default function App() {
  return (
    <div>
      <BurgerMenu />
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}
