import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "~/routes/page";

import BoardListPage from "~/routes/board/board";
import BoardDetailPage from "~/routes/board/detail/detail";
import Layout from "~/routes/layout";
import Login from "~/routes/login";
import Register from "~/routes/register";
import WritePage from "~/routes/board/writeBoard";
import ModifyPage from "~/routes/board/detail/modify";

export const mainRoutes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        index: true,
        element: <MainPage />,
      },
      {
        path: "/modify",
        children: [
          {
            path: "",
            element: <ModifyPage />,
            index: true,
          },

          {
            path: ":boardId",
            element: <ModifyPage />,
            index: true,
          },
        ],
      },
      {
        path: "/writePage",
        index: true,
        element: <WritePage />,
      },
      {
        path: "/login",
        index: true,
        element: <Login/>,
      },
      {
        path: "/register",
        index: true,
        element: <Register/>,
      },
      
      {
        path: "/board",
        children: [
          {
            path: "",
            element: <BoardListPage />,
            index: true,
          },

          {
            path: ":boardId",
            element: <BoardDetailPage />,
            index: true,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(mainRoutes);

export default router;