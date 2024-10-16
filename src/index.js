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
import Tarefa from './Components/Tarefa';
import AuthProvider from './Context/authProvider';
import CadastroEscola from './Pages/CadastroEscola';
import CadastroClasse from './Pages/CadastroClasse';
import DashBoardEscola from './Pages/DashBoardEscola';
import LoginEscola from './Pages/LoginEscola'
import PendingRequestsEscola from './Pages/PendingRequestsEscola';
import TarefasAlunoAll from './Pages/TarefasAlunoAll'
import NotasProfessor from './Components/NotasProfessor';
import RespostasTarefa from './Components/RespostasTarefa';

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
    path: "/cadastro/tarefas",
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
    path: "/tarefa/:id",
    element: <Tarefa/>,
  },
  {
    path: "/cadastro/escola",
    element: <CadastroEscola/>,
  },
  {
    path: "/login/escola",
    element: <LoginEscola/>,
  },
  {
    path: "/cadastro/classe",
    element: <CadastroClasse/>,
  },
  {
    path: "/dashboard/escola",
    element: <DashBoardEscola/>,
  },
  {
    path: "/reqpendentes/escola",
    element: <PendingRequestsEscola/>,
  },
  {
    path: "/dashboard/tarefas/aluno/all",
    element: <TarefasAlunoAll/>,
  },
  {
    path: "/respostastarefa/:id",
    element: <RespostasTarefa/>,
  },
  {
    path: "/notas/professor",
    element: <NotasProfessor/>,
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