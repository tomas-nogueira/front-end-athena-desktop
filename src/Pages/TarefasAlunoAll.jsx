import React, { useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { Grid, Container, Typography, Box, TextField, MenuItem, Button } from '@mui/material';

function TarefasAlunoAll() {
  const [dataUser, setDataUser] = useState('');
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

  // Filtro (não funcional ainda)
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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
      fetch(`http://localhost:3030/task/getall/userbyclass/${dataUser}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setTasks(json.tasks || []); // Armazena as tarefas no estado, garantindo que é um array
          console.log(json)
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
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 'bold', mb: 4, color: '#333' }} // Destaque na tipografia
        >
          Suas Tarefas
        </Typography>

        {/* Filtro de Tarefas */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{
            mb: 4, // Aumenta a margem inferior
            backgroundColor: '#f5f5f5', // Fundo claro para destacar os filtros
            padding: '16px', // Espaçamento interno para dar mais conforto visual
            borderRadius: '8px', // Bordas arredondadas
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra para destacar a seção de filtros
          }}
        >
          <TextField
            select
            label="Filtrar por Matéria"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            variant="outlined"
            sx={{ width: '30%' }} // Largura de 30% para manter o layout compacto
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            <MenuItem value="História">História</MenuItem>
            <MenuItem value="Matemática">Matemática</MenuItem>
            <MenuItem value="Português">Português</MenuItem>
            {/* Adicione mais matérias conforme necessário */}
          </TextField>

          <TextField
            select
            label="Filtrar por Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            variant="outlined"
            sx={{ width: '30%' }} // Largura de 30% para manter o layout compacto
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value="em andamento">Em Andamento</MenuItem>
            <MenuItem value="pronto">Pronto</MenuItem>
            {/* Adicione mais status conforme necessário */}
          </TextField>

          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              padding: '10px 24px', 
              fontWeight: 'bold',
              borderRadius: '8px' // Bordas arredondadas para o botão também
            }}
          >
            Aplicar Filtros
          </Button>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(tasks) && tasks.length > 0 ? ( // Verificação se tasks é um array e não está vazio
            tasks.map(task => (
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
                  '&:hover': { transform: 'scale(1.05)' } // Efeito de hover
                }}
              >
              <CardTarefaMateria
                id={task._id}
                title={task.subject}
                imageSrc="path/to/your/image.jpg" // Substitua pelo caminho correto
                professorName={`Professor(a) ${task.teacherName}`} // Altere conforme necessário
                professorImage={task.teacherImage ? task.teacherImage : "https://w7.pngwing.com/pngs/794/935/png-transparent-professor-teacher-teacher-class-hand-boy-thumbnail.png"} // Verifica se a imagem do professor existe
                subject={task.subject}
                status={task.status}
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
                sx={{ height: '300px' }} // Centraliza a mensagem e ajusta o espaço
              >
                <Typography variant="h6" align="center" sx={{ color: '#777' }}>
                  Nenhuma tarefa encontrada.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default TarefasAlunoAll;
