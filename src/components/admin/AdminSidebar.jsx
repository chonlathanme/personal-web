import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { ChartColumnStacked } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { LogOut } from "lucide-react";
import { Megaphone } from 'lucide-react';
import { Newspaper } from 'lucide-react';
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const hdlLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="bg-gray-800 min-w-64 max-w-64 text-white flex-col flex">
      <div className="h-20 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Panel
      </div>
      <nav className="flex-1 p-6 space-y-2">
        <div className="flex flex-col gap-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
            }
            style={{ transition: "transform 0.1s" }}
          >
            <LayoutDashboard />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
            }
            style={{ transition: "transform 0.1s" }}
          >
            <ChartColumnStacked />
            Category
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
            }
            style={{ transition: "transform 0.1s" }}
          >
            <ShoppingBasket />
            Products
          </NavLink>
          <NavLink
            to="/admin/page/promotions"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
            }
            style={{ transition: "transform 0.1s" }}
          >
            <Megaphone />
            Promotions
          </NavLink>
          <NavLink
            to="/admin/page/news"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
            }
            style={{ transition: "transform 0.1s" }}
          >
            <Newspaper />
            News & Activities
          </NavLink>
          <NavLink
            to="/admin/manage"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
            }
            style={{ transition: "transform 0.1s" }}
          >
            <UserRoundCog />
            Manage
          </NavLink>
        </div>
      </nav>
      <div>
        <NavLink
          onClick={hdlLogout}
          className={
            "flex flex-row items-center gap-2 hover:text-yellow-500 p-6 space-y-2"
          }
        >
          <LogOut />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
