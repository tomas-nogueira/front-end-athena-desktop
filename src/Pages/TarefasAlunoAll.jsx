import React, { useContext, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { Grid, Container, Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import { TaskContext } from '../Context/taskProvider';

function TarefasAlunoAll() {
  // Filtro para status e matéria
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Desestruturando os arrays do contexto
  const { totalTasksContent, completedTasksContent, delayTasksContent, inProgressContent } = useContext(TaskContext);

  // Função para determinar qual conteúdo exibir com base no filtro de status
  const filteredContent = () => {
    console.log(delayTasksContent)
    switch (filterStatus) {
      case 'em andamento':
        return inProgressContent;
      case 'atrasada':
        return delayTasksContent;
      case 'pronto':
        return completedTasksContent;
      default:
        return totalTasksContent;
    }
  };

  return (
    <>
      <Header />
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
            <MenuItem value="Português">Português</MenuItem>
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

          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              padding: '10px 24px', 
              fontWeight: 'bold',
              borderRadius: '8px'
            }}
          >
            Aplicar Filtros
          </Button>
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
          status={task.studentTaskStatus} // Use o status filtrado do estudante
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
    </>
  );
}

export default TarefasAlunoAll;
