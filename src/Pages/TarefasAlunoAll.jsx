import React, { useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';

function TarefasAlunoAll() {
  const [dataUser, setDataUser] = useState('');
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("http://localhost:3030/user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((resposta) => resposta.json())
      .then((json) => {
        setDataUser(json.message._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (dataUser) {
      fetch(`http://localhost:3030/tasks/getalluser/${dataUser}`, { // Ajustado para usar dataUser
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          console.log(json);
          setTasks(json.tasks); // Armazena as tarefas no estado
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataUser]);

  return (
    <>
      {tasks.map(task => (
        <CardTarefaMateria
          key={task._id} // Chave única para cada tarefa
          title={task.subject}
          imageSrc="path/to/your/image.jpg" // Substitua pelo caminho correto
          professorName="Nome do Professor" // Altere conforme necessário
          professorImage="path/to/professor/image.jpg" // Substitua pelo caminho correto
          subject={task.subject}
          status={task.status}
        />
      ))}
    </>
  );
}

export default TarefasAlunoAll;
