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
import NotificationCard from './Components/NotificationCard';

import ProtectedRoute from './Components/ProtectedRoute'; 
import AccessDenied from './Pages/AccessDenied';
import AviseClass from './Pages/AviseClass'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/tarefas/aluno",
    element: <ProtectedRoute element={<DashBoardTarefasAluno />} requiredRole="aluno" />,
  },
  {
    path: "/dashboard/tarefas/professor",
    element: <ProtectedRoute element={<DashBoardTarefasProfessor />} requiredRole="professor" />,
  },
  {
    path: "/cadastro/tarefas",
    element: <ProtectedRoute element={<CadastroTarefas />} requiredRole="professor" />, 
  },
  {
    path: "/dashboard/diretoria",
    element: <DashBoardDiretoria />, 
  },
  {
    path: "/dashboard/aluno",
    element: <ProtectedRoute element={<DashBoardAluno />} requiredRole="aluno" />,
  },
  {
    path: "/tarefa/:id",
    element: <ProtectedRoute element={<Tarefa />} requiredRole="aluno" />, 
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "/cadastro/escola",
    element: <CadastroEscola />,
  },
  {
    path: "/login/escola",
    element: <LoginEscola />,
  },
  {
    path: "/cadastro/classe",
    element: <ProtectedRoute element={<CadastroClasse />} requiredRole="admin" />,
  },
  {
    path: "/dashboard/escola",
    element: <ProtectedRoute element={<DashBoardEscola />} requiredRole="admin" />,
  },
  {
    path: "/reqpendentes/escola",
    element: <ProtectedRoute element={<PendingRequestsEscola />} requiredRole="admin" />,
  },
  {
    path: "/dashboard/tarefas/aluno/all",
    element: <ProtectedRoute element={<TarefasAlunoAll />} requiredRole="aluno" />,
  },
  {
    path: "/respostastarefa/:id",
    element: <ProtectedRoute element={<RespostasTarefa />} requiredRole="aluno" />,
  },
  {
    path: "/notas/professor",
    element: <ProtectedRoute element={<NotasProfessor />} requiredRole="professor" />,
  },
  {
    path: "/aviso/diretor",
    element: <AviseClass/>
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