import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login';
import DashBoardTarefasAluno from './Pages/DashBoardTarefasAluno';
import DashBoardTarefasProfessor from './Pages/DashBoardTarefasProfessor';
import CadastroTarefas from './Pages/CadastroTarefas';
import DashBoardDiretoria from './Pages/DashBoardDiretoria';
import NotFound from './Pages/NotFound';
import DashBoardAluno from './Pages/DashBoardAluno';
import Tarefa from './Components/Tarefa';
import AuthProvider from './Context/authProvider';
import CadastroEscola from './Pages/CadastroEscola';
import CadastroClasse from './Pages/CadastroClasse';
import DashBoardEscola from './Pages/DashBoardEscola';
import LoginEscola from './Pages/LoginEscola';
import PendingRequestsEscola from './Pages/PendingRequestsEscola';
import TarefasAlunoAll from './Pages/TarefasAlunoAll';
import NotasProfessor from './Pages/NotasProfessor';
import RespostasTarefa from './Components/RespostasTarefa';
import ProtectedRoute from './Components/ProtectedRoute';
import AccessDenied from './Pages/AccessDenied';
import HomeProfessor from './Pages/HomeProfessor';
import AviseClass from './Pages/AviseClass';
import HomeAluno from './Components/HomeAluno';
import EditPerfil from './Pages/EditPerfil';
import TaskProvider from './Context/taskProvider';
import HomeDiretoria from './Pages/HomeDiretoria';
import FaceRecognitionPage from './Pages/FaceRecognitionPage';
import Presenca from './Pages/Presenca';
import NotasAluno from './Pages/NotasAluno'
import PresencaEscola from './Pages/PresencaEscola';

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
    element: <DashBoardEscola />,
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
    element: <ProtectedRoute element={<RespostasTarefa />} requiredRole="professor" />,
  },
  {
    path: "/notas/professor",
    element: <ProtectedRoute element={<NotasProfessor />} requiredRole="professor" />,
  },
  {
    path: "/notas/aluno",
    element: <ProtectedRoute element={<NotasAluno />} requiredRole="estudante" />,
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
    path: "/home/aluno",
    element: <HomeAluno/>
  },
  {
    path:"/user/perfil",
    element: <EditPerfil />
  },
  {
    path:"/home/diretoria",
    element: <HomeDiretoria />
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/presenca",
    element: <Presenca />,
  },
  {
    path: "/cadastrar-face/user",
    element: <FaceRecognitionPage />,
  },
  {
    path: "/presenca/escola",
    element: <PresencaEscola />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </TaskProvider>
    </AuthProvider>
  </>
);
