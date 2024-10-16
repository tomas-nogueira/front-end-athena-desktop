import React, { useEffect, useState } from 'react';
import Card from '../Components/CardTarefaGeral';
import Style from '../Styles/Style.css';
import Header from '../Components/Header';
import { Container, Grid, Typography, Box } from '@mui/material';
import Footer from '../Components/Footer';
import HeaderDashBoards from '../Components/HeaderDashboards';
import Logo from '../Photos/logo_athena 5.png';
import Graph from '../Components/Graph';

function DashBoardTarefas() {
  const [dataUser, setDataUser] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [ongoingTasks, setOngoingTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);

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
        setDataUser(json.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (dataUser) {
      // Requisição para ver as tarefas completadas
      fetch(`http://localhost:8080/tasks/completed/userbyclass/${dataUser._id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setCompletedTasks(json.count);
        })
        .catch((error) => {
          console.log(error);
        });

      // Requisição para ver as tarefas em 48 horas
      fetch(`http://localhost:8080/tasks/dueSoon/userbyclass/${dataUser._id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setOngoingTasks(json.count); // Atualiza o estado com a quantidade de tarefas em andamento
        })
        .catch((error) => {
          console.log(error);
        });

      // Requisição para ver as tarefas atrasadas
      fetch(`http://localhost:8080/tasks/overdue/userbyclass/${dataUser._id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setOverdueTasks(json.count); // Atualiza o estado com a quantidade de tarefas atrasadas
        })
        .catch((error) => {
          console.log(error);
        });
      // Requisição para ver todas as tarefas
      fetch(`http://localhost:8080/task/getall/userbyclass/${dataUser._id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setTotalTasks(json.count); // Atualiza o estado com a quantidade total de tarefas
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataUser]);

  return (
    <>
      <Header textBar1="Home" textBar2="Minhas Notas" textBar3="Presença" textBar4="Minhas Tarefas" />
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems='center'>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100px' }} />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography sx={{ color: '#1754F0', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 30 }} variant="h6">
            SEÇÃO DE TAREFAS
            <Typography variant="body2" sx={{ color: '#676767', fontSize: 25 }}>SESI 337</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ fontSize: 30, display: 'flex', flexDirection: 'row' }}>
            Olá, <Typography variant="body1" sx={{ fontSize: 30, color: '#1754F0', fontWeight: 'bold' }}>Aluno</Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: '#676767', fontSize: 25 }}>Aluno</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 5, justifyContent: 'center', marginBottom: 10, display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card title="TAREFAS TOTAL" quantidade={totalTasks} descricao="Total de tarefas" colorBorder="#4A90E2" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card title="TAREFAS CONCLUIDAS" quantidade={completedTasks} descricao="Tarefas concluídas" colorBorder="#83E509" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card title="TAREFAS EM ANDAMENTO" quantidade={ongoingTasks} descricao="Tarefas em andamento" colorBorder="#FFA500" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card title="TAREFAS ATRASADAS" quantidade={overdueTasks} descricao="Tarefas atrasadas" colorBorder="#FF4C4C" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5, maxHeight: '500px', overflow: 'hidden' }}>
          <Typography
            sx={{
              textAlign: 'center',
              borderBottom: '2px solid #004FFF',
              color: 'black',
              fontWeight: 'bold',
              width: '50%',
              margin: '0 auto',
              padding: '8px 0',
              fontSize: 25
            }}
          >
            STATUS DE SUAS TAREFAS
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 2,
            maxHeight: '400px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <Graph
              type="pie"
              data={[
                { name: 'Concluídas', value: completedTasks, color: '#83E509' },
                { name: 'Em Andamento', value: ongoingTasks, color: '#FFA500' },
                { name: 'Atrasadas', value: overdueTasks, color: '#FF4C4C' },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashBoardTarefas;
