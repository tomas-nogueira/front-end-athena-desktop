import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress, Divider, IconButton } from '@mui/material';
import moment from 'moment';
import Header from './Header';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Ícone para anexos

function RespostasTarefa() {
  const { id } = useParams();
  const [taskResponses, setTaskResponses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/tasks/responsesbytask/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTaskResponses(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!taskResponses || !taskResponses.responses || taskResponses.responses.length === 0) {
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
      <Header />
      <Container maxWidth="lg">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1" color="primary" fontWeight="bold" gutterBottom>
            Respostas da Tarefa
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={3}>
          {taskResponses.responses.map((response) => (
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
                  <Typography variant="body1" mt={2} sx={{ textAlign: 'justify' }}>
                    Resposta: {response.responseContent || 'Nenhuma resposta fornecida.'}
                  </Typography>

                  {response.attachment.length > 0 && (
                    <Box mt={2} display="flex" alignItems="center">
                      <AttachFileIcon color="action" />
                      <Typography variant="body2" color="textSecondary" ml={1}>
                        Anexos: {response.attachment.length}
                      </Typography>
                    </Box>
                  )}

                  <Box mt={2} textAlign="right">
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default RespostasTarefa;
