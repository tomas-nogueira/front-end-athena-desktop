import React, { useEffect, useState } from 'react';
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
import Loading from './Components/loading';
import CadastroExperiencia from './Pages/CadastroExperiencia';

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
  // {
  //   path: "/cadastro/escola",
  //   element: <CadastroEscola />,
  // },
  {
    path: "/login/escola",
    element: <LoginEscola />,
  },
  {
    path: "/xp",
    element: <CadastroExperiencia/>,
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
    path: "/aviso",
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
  {
    path: "/loading",
    element: <Loading />,
  },
]);


//CÓDIGO PARA DESABILITAR A INSPEÇÃO DA PÁGINA E IMPEDIR O USER DE USAR O SISTEMA EM RESOLUÇÕES ABAIXO DE 1920X1080
// function RootComponent() {
//   const [isResolutionValid, setIsResolutionValid] = useState(true);

//   useEffect(() => {
//     const checkResolution = () => {
//       // Define uma margem de segurança na resolução mínima
//       const isValid = window.innerWidth >= 1800 && window.innerHeight >= 900;
//       setIsResolutionValid(isValid);
//     };

//     const disableInspection = () => {
//       // Bloqueia o menu de contexto
//       document.addEventListener('contextmenu', (e) => e.preventDefault());

//       // Bloqueia atalhos comuns do DevTools
//       document.addEventListener('keydown', (e) => {
//         if (
//           e.key === 'F12' ||
//           (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
//           (e.ctrlKey && e.key === 'U')
//         ) {
//           e.preventDefault();
//         }
//       });

//     };

//     checkResolution();
//     disableInspection();

//     // Eventos de redimensionamento para verificar resolução
//     window.addEventListener('resize', checkResolution);

//     return () => {
//       // Remove eventos ao desmontar o componente
//       document.removeEventListener('contextmenu', (e) => e.preventDefault());
//       document.removeEventListener('keydown', (e) => {});
//       window.removeEventListener('resize', checkResolution);
//     };
//   }, []);

//   return (
//     <AuthProvider>
//       <TaskProvider>
//         {isResolutionValid ? (
//           <RouterProvider router={router} />
//         ) : (
//           <div style={{ padding: '20px', textAlign: 'center', color: '#ff0000' }}>
//             <h1>Resolução de tela inadequada</h1>
//             <p>
//               O sistema Athena não foi projetado para resoluções menores que 1920x1080.
//               A adaptabilidade para outras resoluções está em desenvolvimento. Para uma
//               experiência ideal, por favor, utilize a resolução recomendada.
//             </p>
//           </div>
//         )}
//       </TaskProvider>
//     </AuthProvider>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RootComponent />);

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