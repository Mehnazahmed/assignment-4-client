import { createBrowserRouter } from "react-router-dom";

import Products from "@/pages/Products/Products";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home/Home";
import Categories from "@/pages/Categories/Categories";
import NotFound from "@/pages/Shared/NotFound/NotFound";
import AboutUs from "@/pages/AboutUs/AboutUs";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
