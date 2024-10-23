import React, { useContext, useEffect, useState } from 'react';
import Card from '../Components/CardTarefaGeral';
import Style from '../Styles/Style.css';
import Header from '../Components/Header';
import { Container, Grid, Typography, Box } from '@mui/material';
import Footer from '../Components/Footer';
import HeaderDashBoards from '../Components/HeaderDashboards';
import Logo from '../Photos/logo_athena 5.png';
import Graph from '../Components/Graph';
import { TaskContext } from '../Context/taskProvider';
import { AuthContext } from '../Context/authProvider';

function DashBoardTarefas() {  
  const { dadosUser } = useContext(AuthContext);

  const { totalTasks, completedTasks, delayTasks, dueSoon, inProgress } = useContext(TaskContext);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header textBar1="HOME" textBar2="Minhas Notas" textBar3="Presença" />
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems='center'>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100px' }} />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography sx={{ color: '#1754F0', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 30 }} variant="h6">
            SEÇÃO DE TAREFAS
            <Typography component="span" variant="body2" sx={{ color: '#676767', fontSize: 25 }}>SESI 337</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ fontSize: 30, display: 'flex', flexDirection: 'row' }}>
            Olá, <Typography component="span" variant="body1" sx={{ fontSize: 30, color: '#1754F0', fontWeight: 'bold' }}>Aluno</Typography>
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#676767', fontSize: 25 }}>Aluno</Typography>
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
              <Card title="TAREFAS EM ANDAMENTO" quantidade={inProgress} descricao="Tarefas em andamento" colorBorder="#FFA500" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card title="TAREFAS ATRASADAS" quantidade={delayTasks} descricao="Tarefas atrasadas" colorBorder="#FF4C4C" />
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
                { name: 'Em Andamento', value: inProgress, color: '#FFA500' },
                { name: 'Atrasadas', value: delayTasks, color: '#FF4C4C' },
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
