import { createBrowserRouter } from "react-router-dom";

import Products from "@/pages/Products/Products";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home/Home";
import Categories from "@/pages/Categories/Categories";
import NotFound from "@/pages/Shared/NotFound/NotFound";
import AboutUs from "@/pages/AboutUs/AboutUs";
import ProductsByCategory from "@/pages/Products/ProductsByCategory/ProductsByCategory";
import ProductDetails from "@/pages/Products/ProductDetails/ProductDetails";
import Cart from "@/pages/Cart/Cart";
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
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/category/:category",
        element: <ProductsByCategory />,
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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
