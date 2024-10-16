import React, { useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { Grid, Container, Typography } from '@mui/material';

function TarefasAlunoAll() {
  const [dataUser, setDataUser] = useState('');
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/user", {
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
      fetch(`http://localhost:8080/task/getall/userbyclass/${dataUser}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setTasks(json.tasks || []); // Armazena as tarefas no estado, garantindo que é um array
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataUser]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          SUAS TAREFAS
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {Array.isArray(tasks) && tasks.length > 0 ? ( // Verificação se tasks é um array e não está vazio
            tasks.map(task => (
              <Grid item xs={12} sm={6} md={4} key={task._id}> {/* Responsividade dos cards */}
                <CardTarefaMateria
                  id={task._id}
                  title={task.subject}
                  imageSrc="path/to/your/image.jpg" // Substitua pelo caminho correto
                  professorName={task.teacherName} // Altere conforme necessário
                  professorImage="path/to/professor/image.jpg" // Substitua pelo caminho correto
                  subject={task.subject}
                  status={task.status}
                  button="Realizar tarefa"
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">Nenhuma tarefa encontrada.</Typography> {/* Mensagem caso não haja tarefas */}
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default TarefasAlunoAll;
