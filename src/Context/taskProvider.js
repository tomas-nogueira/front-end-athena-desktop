import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from '../Context/authProvider';

export const TaskContext = createContext();

function TaskProvider({ children }) {
  const { dadosUser } = useContext(AuthContext);

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [delayTasks, setDelayTasks] = useState(0);
  const [dueSoon, setDueSoon] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  const [totalTasksContent, setTotalTasksContent] = useState([]);
  const [completedTasksContent, setCompletedTasksContent] = useState([]);
  const [delayTasksContent, setDelayTasksContent] = useState([]);
  const [dueSoonContent, setDueSoonContent] = useState([]);
  const [inProgressContent, setInProgressContent] = useState([]);

  useEffect(() => {
    if (dadosUser && dadosUser.message) {
      if (dadosUser.message.role === "estudante") {
        const studentId = dadosUser.message._id; // Obtém o ID do estudante

        // Todas as Tarefas
        fetch(`http://localhost:3030/task/getall/userbyclass/${studentId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setTotalTasks(json.count);
            // Filtrar as tarefas para pegar apenas o status do estudante
            const filteredTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setTotalTasksContent(filteredTasks);
          })
          .catch((error) => console.log(error));

        // Tarefas Completas
        fetch(`http://localhost:3030/tasks/completed-user/${studentId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setCompletedTasks(json.count);
            const filteredCompletedTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setCompletedTasksContent(filteredCompletedTasks);
            console.log(filteredCompletedTasks)
          })
          .catch((error) => console.log(error));

        // Tarefas em atraso
        fetch(`http://localhost:3030/tasks/delay/${studentId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setDelayTasks(json.count);
            const filteredDelayTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setDelayTasksContent(filteredDelayTasks);
          })
          .catch((error) => console.log(error));

        // Tarefas que vão vencer em breve
        fetch(`http://localhost:3030/tasks/duesoon/${studentId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setDueSoon(json.count);
            const filteredDueSoonTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setDueSoonContent(filteredDueSoonTasks);
          })
          .catch((error) => console.log(error));

        // Tarefas em progresso
        fetch(`http://localhost:3030/tasks/inprogress/${studentId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setInProgress(json.count);
            const filteredInProgressTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setInProgressContent(filteredInProgressTasks);
          })
          .catch((error) => console.log(error));
      }

      // Lógica para professor (a ser preenchida)
      if (dadosUser.message.role === "professor") {
        // Lógica de professor
      }
    }
  }, [dadosUser]);

  return (
    <TaskContext.Provider value={{
      totalTasks,
      completedTasks,
      delayTasks,
      dueSoon,
      inProgress,
      totalTasksContent,
      completedTasksContent,
      delayTasksContent,
      dueSoonContent,
      inProgressContent
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
