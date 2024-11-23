import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="fixed top-20 w-full px-[20%] h-[calc(100vh-5rem)]  overflow-y-auto">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}
