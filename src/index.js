import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);