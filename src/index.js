import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';
import DashBoardTarefasAluno from './Pages/DashBoardTarefasAluno';
import DashBoardTarefasProfessor from './Pages/DashBoardTarefasProfessor';
import CadastroTarefas from './Pages/CadastroTarefas'
import DashBoardDiretoria from './Pages/DashBoardDiretoria';

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
    path: "/dashboardtarefasaluno",
    element: <DashBoardTarefasAluno/>,
  },
  {
    path: "/dashboardtarefasprofessor",
    element: <DashBoardTarefasProfessor/>,
  },
  {
    path: "/cadastrotarefas",
    element: <CadastroTarefas/>,
  },
  {
    path: "/dashboarddiretoria",
    element: <DashBoardDiretoria/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);