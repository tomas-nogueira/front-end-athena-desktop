import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';
import DashBoardTarefasAluno from './Pages/DashBoardTarefasAluno';
import DashBoardTarefasProfessor from './Pages/DashBoardTarefasProfessor';
import CadastroTarefas from './Pages/CadastroTarefas'
import DashBoardDiretoria from './Pages/DashBoardDiretoria';
import NotFound from './Pages/NotFound';
import DashBoardAluno from './Pages/DashBoardAluno';
import Tarefa from './Pages/Tarefa';
import AuthProvider from './Context/authProvider';

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
    path: "/dashboard/tarefas/aluno",
    element: <DashBoardTarefasAluno/>,
  },
  {
    path: "/dashboard/tarefas/professor",
    element: <DashBoardTarefasProfessor/>,
  },
  {
    path: "/cadastrotarefas",
    element: <CadastroTarefas/>,
  },
  {
    path: "/dashboard/diretoria",
    element: <DashBoardDiretoria/>,
  },
  {
    path: "/dashboard/aluno",
    element: <DashBoardAluno/>,
  },
  {
    path: "/tarefa",
    element: <Tarefa/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>  </>
);