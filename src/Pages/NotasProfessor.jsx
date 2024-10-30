import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';  // Usei Row e Col para layout responsivo
import { Grid, Container, Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { AuthContext } from '../Context/authProvider';  
import { TaskContext } from '../Context/taskProvider';
import ChatForm from '../Components/ChatForm';

function NotasProfessor() {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { dadosUser } = useContext(AuthContext);
  const { totalTasksContent } = useContext(TaskContext);


  return (
    <>
      <Header textBar1="Home" textBar2="DASHBOARD" textBar3="Cadastrar tarefas"/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(totalTasksContent) && totalTasksContent.length > 0 ? (
            totalTasksContent.map(task => (
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
                  Nenhuma tarefa encontrada.
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
