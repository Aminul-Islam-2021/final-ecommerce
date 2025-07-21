import { createBrowserRouter } from "react-router-dom";
import Home from "../main/pages/Home";
import Products from "../main/pages/Products";
import Layout from "../main/layout/Layout";
import Table1 from "../dashboard/pages/Table1";
import Table2 from "../dashboard/pages/Table2";

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
]);
