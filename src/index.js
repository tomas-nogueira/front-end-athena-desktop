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
import HomeProfessor from './Pages/HomeProfessor';
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
    element: <ProtectedRoute element={<DashBoardTarefasAluno />} requiredRole="estudante" />,
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
    element: <ProtectedRoute element={<DashBoardAluno />} requiredRole="estudante" />,
  },
  {
    path: "/tarefa/:id",
    element: <ProtectedRoute element={<Tarefa />} requiredRole="estudante" />, 
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
    element: <CadastroClasse />,
  },
  {
    path: "/dashboard/escola",
    element: <DashBoardEscola /> ,
  },
  {
    path: "/reqpendentes/escola",
    element: <PendingRequestsEscola />,
  },
  {
    path: "/dashboard/tarefas/aluno/all",
    element: <ProtectedRoute element={<TarefasAlunoAll />} requiredRole="estudante" />,
  },
  {
    path: "/respostastarefa/:id",
    element: <ProtectedRoute element={<RespostasTarefa />} requiredRole="estudante" />,
  },
  {
    path: "/notas/professor",
    element: <ProtectedRoute element={<NotasProfessor />} requiredRole="professor" />,
  },
  {
    path: '/home/professor',
    element: <HomeProfessor/>
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