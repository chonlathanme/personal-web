import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { ChartColumnStacked } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { UserRoundCog } from "lucide-react";

const Admin = () => {
  return (
    <div className="grid grid-cols-2 gap-20 p-20 items-center w-full">
      <Link
        to="/admin/dashboard"
        className="h-60 flex flex-col border rounded-lg justify-center items-center"
      >
        <p className="text-2xl font-bold">Dashboard</p>
        <LayoutDashboard size={64} />
      </Link>
      <Link
        to="/admin/category"
        className="h-60 flex flex-col border rounded-lg justify-center items-center"
      >
        <p className="text-2xl font-bold">Category</p>
        <ChartColumnStacked size={64} />
      </Link>
      <Link
        to="/admin/products"
        className="h-60 flex flex-col border rounded-lg justify-center items-center"
      >
        <p className="text-2xl font-bold">Products</p>
        <ShoppingBasket size={64} />
      </Link>
      <Link
        to="/admin/manage"
        className="h-60 flex flex-col border rounded-lg justify-center items-center"
      >
        <p className="text-2xl font-bold">Manage</p>
        <UserRoundCog size={64} />
      </Link>
    </div>
  );
};

export default Admin;
