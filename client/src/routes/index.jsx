import { createBrowserRouter } from "react-router-dom";
import Home from "../main/pages/Home";
import Products from "../main/pages/Products";
import Layout from "../main/layout/Layout";
import Table1 from "../dashboard/dbPages/Table1";
import Table2 from "../dashboard/dbPages/Table2";
import LayoutDB from "../dashboard/dbLayout/LayoutDB";
import Dashboard from "../dashboard/dbPages/Dashboard";
import Category from "../dashboard/dbComponents/Category";
import CreateProduct from "../dashboard/dbComponents/CreateProduct";
import AllProducts from "../dashboard/dbPages/AllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "/dashboard/table1",
        element: <Table1 />,
      },
      {
        path: "/dashboard/table2",
        element: <Table2 />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutDB />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
    ],
  },
]);
