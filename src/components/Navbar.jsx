import React, { useEffect } from "react";
import Avatar from "./Avatar";
import { NavLink } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { useShallow } from "zustand/shallow";
import { CartIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import brandLogo from "../assets/Logo2.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user, role } = useUserStore(
    useShallow((state) => ({
      logout: state.logout,
      user: state.user,
      role: state.role,
    }))
  );

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-20 flex flex-row justify-between items-center w-full px-[20%] bg-white shadow-md z-10">
      <div className=""><img src={brandLogo} alt="" className="h-20 min-w-32" /></div>
      <div className="flex flex-row items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
              : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
              : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
              : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center"
          }
        >
          Shop
        </NavLink>
        {role === "ADMIN" && (
          <NavLink
            to="/admin"
            className="hover:text-red-500 transition duration-200 hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center"
          >
            Admin
          </NavLink>
        )}
        {user ? (
          <div className="flex items-center gap-4 relative">
            <NavLink to="user/cart" className="relative">
              <CartIcon className="w-10 h-10 hover:bg-gray-100 rounded-full transition duration-200 transform hover:scale-105" />
            </NavLink>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <Avatar
                  className="w-11 h-11 rounded-full"
                  imgSrc={user.profileImage}
                  menu={true}
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box z-10 w-52 p-2 shadow-lg bg-white"
              >
                <li>
                  <a className="hover:text-red-500">Setting</a>
                  <a className="hover:text-red-500" onClick={hdlLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="hover:text-red-500 transition duration-200"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
