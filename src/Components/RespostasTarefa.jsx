import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
} from '@mui/material';
import moment from 'moment';
import Header from './Header';
import { message as antdMessage } from 'antd';
import { AuthContext } from '../Context/authProvider';
import { TaskContext } from '../Context/taskProvider';
import CardTarefaMateria from './CardTarefaMateria';

function RespostasTarefa() {
  const { id } = useParams(); // id da tarefa
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');

  const { dadosUser } = useContext(AuthContext);
  const { getResponsesByTaskById, GetDataTaskById, tasksResponses, dataTask, loading, CorrectionTask } = useContext(TaskContext);


  useEffect(() => {
    getResponsesByTaskById(id)
    GetDataTaskById(id)        
  }, [id]);

  const handleOpenDialog = (response) => {
    setSelectedResponse(response);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedResponse(null);
    setFeedback('');
    setGrade('');
  };

  function EnviarAvaliacao() {
    if (!feedback || !grade) {
      antdMessage.error("Preencha a nota e o feedback.");
      return;
    }
  
    if (grade < 0 || grade > 10) {
      antdMessage.error("A nota deve estar entre 0 e 10.");
      return;
    }
  
    CorrectionTask(selectedResponse.studentId, id, feedback, grade);
  }
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!tasksResponses || !tasksResponses.responses || tasksResponses.responses.length === 0) {
    return (
      <>
        <Header />
        <Box textAlign="center" marginTop={5}>
          <Typography variant="h6">Nenhuma resposta encontrada para esta tarefa.</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header textBar1="Home" />
      <Container maxWidth="lg">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Respostas da Tarefa
          </Typography>
          <Divider />
        </Box>
        <Grid container spacing={3}>
  {Array.isArray(tasksResponses?.responses) && tasksResponses.responses.length > 0 ? (
    tasksResponses.responses.map((response) => (
      <Grid item xs={12} sm={6} md={4} key={response._id}>
        <Card
          elevation={3}
          sx={{
            height: '100%',
            borderRadius: '12px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Aluno: {response.studentName || 'Nome não disponível'}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Data de Envio: {moment(response.submissionDate).format('DD/MM/YYYY HH:mm')}
            </Typography>
            <Box mt={2}>
              <Typography
                variant="body2"
                sx={{
                  color: response.graded ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {response.graded ? 'Avaliado' : 'Não Avaliado'}
              </Typography>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog(response)}
              >
                Ver Resposta
              </Button>
            </Box>
          </CardContent>
        </Card>
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
          Nenhuma resposta encontrada para esta tarefa.
        </Typography>
      </Box>
    </Grid>
  )}
</Grid>
        <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  fullWidth
  maxWidth="md"
>
  <DialogTitle sx={{ backgroundColor: '#FF6400', color: 'white' }}>
    Avaliação da Resposta
  </DialogTitle>
  <DialogContent>
    {selectedResponse ? (
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Aluno: {selectedResponse.studentName}
        </Typography>
        <Typography variant="body1" mb={2}>
          Resposta: {selectedResponse.responseContent}
        </Typography>

        {/* Se a resposta já foi avaliada, exibir nota e feedback como texto */}
        {selectedResponse.graded ? (
          <>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Nota: {selectedResponse.grade}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Feedback: {selectedResponse.feedback}
            </Typography>
          </>
        ) : (
          <>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              label="Digite a nota (0-10)"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              inputProps={{ min: 0, max: 10 }}
            />
            <TextField
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              variant="outlined"
              fullWidth
              label="Digite seu feedback"
              multiline
              rows={4}
              margin="normal"
            />
          </>
        )}
      </Box>
    ) : (
      <Typography variant="body1">Nenhuma resposta selecionada.</Typography>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>

    {/* Só mostrar o botão de enviar avaliação se a resposta ainda não foi avaliada */}
    {selectedResponse && !selectedResponse.graded && (
      <Button onClick={EnviarAvaliacao} color="primary">Enviar Avaliação</Button>
    )}
  </DialogActions>
</Dialog>

      </Container>
    </>
  );
}

export default RespostasTarefa;