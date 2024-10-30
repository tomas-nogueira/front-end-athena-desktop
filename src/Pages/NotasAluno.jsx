import React, { useContext } from 'react';
import Header from '../Components/Header';
import { TaskContext } from '../Context/taskProvider';
import { Grid, Container, Typography } from '@mui/material';
import CardNota from '../Components/CardNota'; // Certifique-se de importar seu componente
import ChatForm from '../Components/ChatForm';
import { AuthContext } from '../Context/authProvider';

function NotasAluno() {
    const { dadosUser } = useContext(AuthContext);

    const { gradedTasksContent } = useContext(TaskContext);

    // Verifique se gradedTasksContent e grades existem
    if (!gradedTasksContent || !gradedTasksContent.grades) {
        return <Typography variant="h5" align="center">Carregando...</Typography>;
    }

    return (
        <>
            <Header textBar1="HOME" textBar2="DASHBOARD" />
            <Container sx={{padding: 5}}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bolder'}}>
                    SUAS NOTAS
                </Typography>
                <Grid container spacing={2} sx={{borderRadius: 5, padding: 5, alignItems: 'center'}} maxWidth="lg">
                    {gradedTasksContent.grades.map(task => (
                        <Grid item xs={12} sm={6} md={4} key={task.taskId}>
                            <CardNota 
                                teacherName={task.teacherName} // Substitua pelo nome real
                                subjectTask={task.taskTitle} 
                                feedbackTask={task.feedback} 
                                gradeTask={task.grade} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <ChatForm userType={dadosUser.role} userId={dadosUser._id} />
        </>
    );
}

export default NotasAluno;
