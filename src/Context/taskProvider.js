import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from '../Context/authProvider';
import { message as antdMessage } from 'antd';

export const TaskContext = createContext();

function TaskProvider({ children }) {
  const { dadosUser } = useContext(AuthContext);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [delayTasks, setDelayTasks] = useState(0);
  const [dueSoon, setDueSoon] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [ungradedTasks, setUngradedTasks] = useState(0);

  const [totalTasksContent, setTotalTasksContent] = useState([]);
  const [completedTasksContent, setCompletedTasksContent] = useState([]);
  const [delayTasksContent, setDelayTasksContent] = useState([]);
  const [dueSoonContent, setDueSoonContent] = useState([]);
  const [inProgressContent, setInProgressContent] = useState([]);
  const [gradedTasksContent, setGradedTasksContent] = useState([])

  const [completedTasksClass, setCompletedTasksClass] = useState(0);
  const [delayTasksClass, setDelayTasksClass] = useState(0);
  const [inProgressTasksClass, setInProgressTasksClass] = useState(0);


  const [dataTask, setDataTask] = useState(null)//Estado para pegar os dados da tarefa individualmente
  const [classes, setClasses] = useState([])

  const [tarefaEnviada, setTarefaEnviada] = useState(false)
  const [tarefaCriada, setTarefaCriada] = useState(false)
  const [tarefaAvaliada, setTarefaAvaliada] = useState(false)

  const [tasksResponses, setTaskResponses] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (dadosUser && dadosUser.message) {
      if (dadosUser.message.role === "estudante") {
        const studentId = dadosUser.message._id;

        // Todas as Tarefas
        fetch(`http://localhost:3030/task/getall/userbyclass/${studentId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            // Filtrar as tarefas para pegar apenas o status do estudante
            const filteredTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setTotalTasksContent(filteredTasks);
            setTotalTasks(filteredTasks.length);
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
            const filteredCompletedTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setCompletedTasksContent(filteredCompletedTasks);
            setCompletedTasks(filteredCompletedTasks.length);
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
            const filteredDelayTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setDelayTasksContent(filteredDelayTasks);
            setDelayTasks(filteredDelayTasks.length);
          })
          .catch((error) => console.log(error));

        // Tarefas que vão vencer em breve
        fetch(`http://localhost:3030/tasks/duesoon-user/${studentId}`, {
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
            setDueSoon(filteredDueSoonTasks.length);
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
            const filteredInProgressTasks = json.tasks.map(task => {
              const studentStatus = task.studentStatus.find(status => status.studentId === studentId);
              return { ...task, studentTaskStatus: studentStatus ? studentStatus.status : 'Status não encontrado' };
            });
            setInProgressContent(filteredInProgressTasks);
            setInProgress(filteredInProgressTasks.length);
          })
          .catch((error) => console.log(error));

          //Pegar tarefas avaliadas
          fetch(`http://localhost:3030/tasks/usergrade/${studentId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then((resposta) => resposta.json())
            .then((json) => {
              console.log(json)
              if(json.grades){
                setGradedTasksContent(json)
              }
            })
            .catch((error) => console.log(error));


      }

      // Lógica para professor
      if (dadosUser.message.role === "professor") {
        if (dadosUser.message.role === "professor") {
          const professorId = dadosUser.message._id;
          
        //Pegando todas as tarefas do professor
        fetch(`http://localhost:3030/tasks/getalluser/${professorId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setTotalTasksContent(json.tasks);
            // Contando o total de studentResponses com graded = false
            const ungradedTaskslength = json.tasks.reduce((accumulator, task) => {
              // Verifica se existem studentResponses e filtra por graded = false
              if (task.studentResponses) {
                  const unratedResponsesCount = task.studentResponses.filter(response => !response.graded).length;
                  return accumulator + unratedResponsesCount;
              }
              return accumulator; // Retorna o acumulador se não houver respostas
          }, 0);
          setUngradedTasks(ungradedTaskslength); // Atualiza o estado com o total
          setCompletedTasksClass(json.countCompleted)
          setDelayTasksClass(json.countLate)
          setInProgressTasksClass(json.countOngoing)
          })
          .catch((error) => console.log(error));
        }
      }
    }
  }, [dadosUser]);

  function EnivarRespostaTask(id, dissertativeResponse, selectedValue){
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3030/tasks/response`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        idTask: id,
        responseContent: dissertativeResponse || null,
        selectedAlternative: selectedValue || null,
      })
    })
      .then((resposta) => resposta.json())
      .then((json) => {
        if(json.message === "Resposta enviada com sucesso."){
          antdMessage.success('Sua tarefa foi enviada com sucesso! Você será notificado quando a avaliação estiver disponível!');
          setTarefaEnviada(true)
        }
        else{
          antdMessage.error(json.message)
          setTarefaEnviada(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  //Função para pegar os dados individuais da tarefa
  function GetDataTaskById(id){
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3030/tasks/getId/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((resposta) => resposta.json())
      .then((json) => {
        setDataTask(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Função para pegar as classes que o professor da aula
  function GetClassProfessorById(){
    fetch(`http://localhost:3030/class/${dadosUser.message.IdSchool}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      setClasses(json.message);
    })
    .catch((error) => {
      console.error("Erro ao buscar classes:", error);
    });
  }

  function CadastrarTask(subject, content, dueDate , recipients, IdClass, tipoQuestao, alternativas){
    const token = localStorage.getItem('token');
    fetch("http://localhost:3030/tasks/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subject: subject,
        content: content,
        dueDate: dueDate,
        recipients: recipients,
        attachment: 20,
        IdTeacher: dadosUser.message._id,
        status: "em andamento",
        IdClass: IdClass,
        school: dadosUser.message.IdSchool,
        alternatives: tipoQuestao === 'alternativa' ? alternativas : [],
      })
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      if(json.message === "Tarefa criada com sucesso." && json.task)
      {
        antdMessage.success(json.message);
        setTarefaCriada(true)
      }
      else
        {
          antdMessage.error(json.message)
          setTarefaCriada(false)
        }
    })
    .catch((error) => {
      console.error("Erro ao cadastrar tarefa:", error);
    });
  }

  function getResponsesByTaskById(id){
    fetch(`http://localhost:3030/tasks/responsesbytask/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTaskResponses(json);
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
    }

  function CorrectionTask(studentId, idTask, feedback, grade){
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3030/tasks/correction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        idStudent: studentId, // ID do estudante
        idTask: idTask, // ID da tarefa
        feedback,
        grade,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === "Response updated successfully") {
          antdMessage.success("Avaliação enviada com sucesso!");
          setTarefaAvaliada(true)
        } else {
          antdMessage.error("Erro ao enviar avaliação: " + json.message);
          setTarefaAvaliada(false)
        }
      })
      .catch((error) => {
        console.error('Erro ao enviar avaliação:', error);
        antdMessage.error('Erro ao enviar avaliação.');
      });
  }

  function GetTasksByClass(idClass){
    fetch(`http://localhost:3030/tasks/getalltasksclass/${idClass}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setCompletedTasksClass(json.countCompleted)
        setDelayTasksClass(json.countLate)
        setInProgressTasksClass(json.countOngoing)
      })
      .catch((error) => {
        console.log(error)
      });

  }

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
      inProgressContent,
      EnivarRespostaTask,
      GetDataTaskById,
      GetClassProfessorById,
      CadastrarTask,
      tarefaEnviada,
      tarefaCriada,
      setTarefaCriada,
      dataTask,
      classes,
      getResponsesByTaskById,
      tasksResponses,
      loading,
      CorrectionTask,
      tarefaAvaliada,
      gradedTasksContent,
      ungradedTasks,
      GetTasksByClass,
      completedTasksClass,
      delayTasksClass,
      inProgressTasksClass
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
