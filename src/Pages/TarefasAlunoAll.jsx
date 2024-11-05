import React, { useContext, useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { Grid, Container, Typography, Box, TextField, MenuItem } from '@mui/material';
import { TaskContext } from '../Context/taskProvider';
import { AuthContext } from '../Context/authProvider';
import Footer from '../Components/Footer';
import ChatForm from '../Components/ChatForm';
import Loading from '../Components/loading'

function TarefasAlunoAll() {
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const { totalTasksContent, completedTasksContent, delayTasksContent, inProgressContent, totalTasks } = useContext(TaskContext);
  const { dadosUser } = useContext(AuthContext);

  // Verifica se os dados do usuário estão carregados e se o papel (role) e o ID existem
  if (!dadosUser || !dadosUser.message || !dadosUser.message.role || !dadosUser.message._id || !totalTasks) {
    return <Loading />; // Exibe o carregamento se os dados não estiverem prontos
  }

  const filteredContent = () => {
    let content = [];

    // Filtra por status
    switch (filterStatus) {
      case 'em andamento':
        content = inProgressContent;
        break;
      case 'atrasada':
        content = delayTasksContent;
        break;
      case 'pronto':
        content = completedTasksContent;
        break;
      default:
        content = totalTasksContent;
    }

    // Filtra por matéria
    if (filterSubject) {
      content = content.filter(task => task.subject === filterSubject);
    }

    return content;
  };

  return (
    <>
      <Header textBar1="HOME" textBar2={"Minhas tarefas"} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}
        >
          Suas Tarefas
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mb: 4,
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TextField
            select
            label="Filtrar por Matéria"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            variant="outlined"
            sx={{ width: '30%' }}
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            <MenuItem value="História">História</MenuItem>
            <MenuItem value="Matemática">Matemática</MenuItem>
            <MenuItem value="Língua Portuguesa">Língua Portuguesa</MenuItem>
            <MenuItem value="Biologia">Biologia</MenuItem>
            <MenuItem value="Física">Física</MenuItem>
            <MenuItem value="Química">Química</MenuItem>
            <MenuItem value="Geografia">Geografia</MenuItem>
            <MenuItem value="Educação_Física">Educação Física</MenuItem>
            <MenuItem value="Artes">Artes</MenuItem>
          </TextField>

          <TextField
            select
            label="Filtrar por Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            variant="outlined"
            sx={{ width: '30%' }}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value="em andamento">Em Andamento</MenuItem>
            <MenuItem value="atrasada">Atrasada</MenuItem>
            <MenuItem value="pronto">Pronto</MenuItem>
          </TextField>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(filteredContent()) && filteredContent().length > 0 ? (
            filteredContent().map(task => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={task._id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <CardTarefaMateria
                  id={task._id}
                  title={task.subject}
                  imageSrc="path/to/your/image.jpg"
                  professorName={`Professor(a) ${task.teacherName}`}
                  professorImage={task.teacherImage ? task.teacherImage : "https://w7.pngwing.com/pngs/794/935/png-transparent-professor-teacher-teacher-class-hand-boy-thumbnail.png"}
                  subject={task.subject}
                  status={task.studentTaskStatus}
                  button="Realizar tarefa"
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '300px' }}
              >
                <Typography variant="h6" align="center" sx={{ color: '#777' }}>
                  Nenhuma tarefa encontrada.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <ChatForm userId={dadosUser.message._id} userType={dadosUser.message.role} />
      <Footer />
    </>
  );
}

export default TarefasAlunoAll;
