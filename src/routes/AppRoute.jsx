import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Layout from "../layouts/Layout";
import useUserStore from "../stores/userStore";
import ProtectedRoute from "../components/ProtectRoute";
import Cart from "../pages/User/Cart";
import History from "../pages/User/History";
import Checkout from "../pages/User/Checkout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import Category from "../pages/Admin/Category";
import Products from "../pages/Admin/Products";
import Manage from "../pages/Admin/Manage";
import UserLayout from "../layouts/UserLayout";
import HomeUser from "../pages/User/HomeUser";
import Admin from "../pages/Admin/Admin";
import Promotions from "../pages/Admin/Promotions";
import News from "../pages/Admin/News";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
  {
    path: "admin",
    element: <ProtectedRoute element={<AdminLayout />} />,
    children: [
      { index: true, element: <Admin /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "products", element: <Products /> },
      { path: "page/promotions", element: <Promotions /> },
      { path: "page/news", element: <News /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRoute() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
