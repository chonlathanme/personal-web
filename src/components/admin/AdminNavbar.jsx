import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useUserStore from "../../stores/userStore";
import { CartIcon } from "../../icons";
import Avatar from "../Avatar";

const AdminNavbar = () => {
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
    <header className="bg-black h-20 flex items-center">
      <div className="h-20 flex flex-row justify-end items-center w-full px-[20%] bg-white shadow-md z-10">
        <div className="flex flex-row items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
                : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center text-black"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
                : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center text-black"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
                : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center text-black"
            }
          >
            Shop
          </NavLink>
          {role === "ADMIN" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 scale-105 border-b border-red-500 h-20 w-20 flex items-center justify-center font-bold"
                  : "hover:text-red-500 transition duration-200 transform hover:scale-105 h-20 w-20 flex items-center justify-center text-black"
              }
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
    </header>
  );
};

export default AdminNavbar;
