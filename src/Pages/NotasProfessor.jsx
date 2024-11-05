import React, { useContext, useState } from 'react';
import { Grid, Container, Typography, Box, TextField, MenuItem } from '@mui/material';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { AuthContext } from '../Context/authProvider';  
import { TaskContext } from '../Context/taskProvider';
import ChatForm from '../Components/ChatForm';

function NotasProfessor() {
  const { dadosUser } = useContext(AuthContext);
  const { totalTasksContent } = useContext(TaskContext);
  
  const [filterSubject, setFilterSubject] = useState('');
  const [filterResponses, setFilterResponses] = useState('comRespostas'); // Novo estado para filtro de respostas
  
  // Função para filtrar as tarefas com base no assunto e se possuem respostas
  const filteredTasks = () => {
    return totalTasksContent.filter(task => {
      const hasResponses = task.studentResponses.length > 0; // Tarefa com respostas
      const matchesSubject = filterSubject ? task.subject === filterSubject : true; // Filtra por matéria
      
      // Filtra baseado na escolha do filtro de respostas
      const matchesResponseFilter = filterResponses === 'todas' || 
        (filterResponses === 'comRespostas' && hasResponses);
      return matchesSubject && matchesResponseFilter; // Retorna tarefas que correspondem aos filtros
    });
  };

  return (
    <>
      <Header textBar1="Home" textBar2="DASHBOARD" textBar3="Cadastrar tarefas"/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
            label="Filtrar por Respostas"
            value={filterResponses}
            onChange={(e) => setFilterResponses(e.target.value)}
            variant="outlined"
            sx={{ width: '30%' }}
          >
            <MenuItem value="todas">
              <em>Todas</em>
            </MenuItem>
            <MenuItem value="comRespostas">Com Respostas</MenuItem>
          </TextField>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(filteredTasks()) && filteredTasks().length > 0 ? (
            filteredTasks().map(task => (
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
                  subject={task.subject}
                  respostas={task.studentResponses.length}
                  studentResponses={task.studentResponses}
                  button="Ver respostas"
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
                  Nenhuma tarefa encontrada com resposta.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <ChatForm userType={dadosUser.role} userId={dadosUser._id} />
    </>
  );
}

export default NotasProfessor;
