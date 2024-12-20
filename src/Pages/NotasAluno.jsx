import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import { TaskContext } from '../Context/taskProvider';
import { Grid, Container, Typography } from '@mui/material';
import CardNota from '../Components/CardNota'; // Certifique-se de importar seu componente
import ChatForm from '../Components/ChatForm';
import { AuthContext } from '../Context/authProvider';
import Loading from '../Components/loading';

function NotasAluno() {
    const { dadosUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { gradedTasksContent } = useContext(TaskContext);


    if (gradedTasksContent === null) {
        return (
            <>
                <Header textBar1="HOME" textBar2="dashboard" />
                <Container sx={{ padding: 5 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bolder' }}>
                        SUAS NOTAS
                    </Typography>
                    <Grid container spacing={2} sx={{ borderRadius: 5, padding: 5, alignItems: 'center' }} maxWidth="lg">
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">Não há tarefas avaliadas</Typography>
                        </Grid>
                    </Grid>
                </Container>
                <ChatForm userType={dadosUser.message.role} userId={dadosUser.message._id} />
            </>
        );
    }

  if (!dadosUser || !dadosUser.message || !gradedTasksContent.grades) {
    return <Loading />;
  }
    if (error) {
        return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
    }

    return (
        <>
            <Header textBar1="HOME" textBar2="dashboard" />
            <Container sx={{ padding: 5 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bolder' }}>
                    SUAS NOTAS
                </Typography>
                <Grid container spacing={2} sx={{ borderRadius: 5, padding: 5, alignItems: 'center' }} maxWidth="lg">
                    {gradedTasksContent.grades.length > 0 ? (
                        gradedTasksContent.grades.map(task => (
                            <Grid item xs={12} sm={6} md={4} key={task.taskId}>
                                <CardNota 
                                    teacherName={task.teacherName} // Substitua pelo nome real
                                    subjectTask={task.taskTitle} 
                                    feedbackTask={task.feedback} 
                                    gradeTask={task.grade} 
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">Não há tarefas avaliadas</Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <ChatForm userType={dadosUser.message.role} userId={dadosUser.message._id} />
        </>
    );
}

export default NotasAluno;
