import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';
import DashBoardTarefas from './Pages/DashBoardTarefas';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/dashboartarefas",
    element: <DashBoardTarefas/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);