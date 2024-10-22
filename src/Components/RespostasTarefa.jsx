import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress, Divider, Button } from '@mui/material';
import moment from 'moment';
import Header from './Header';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
                  {/* Nome do aluno */}
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

                  {/* Data de envio */}
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Data de Envio: {moment(response.submissionDate).format('DD/MM/YYYY HH:mm')}
                  </Typography>

                  {/* Status de avaliação */}
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

                  {/* Exibição do botão ou texto com base na avaliação */}
                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    {response.graded ? (
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        Ver Avaliação
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('Avaliar tarefa', response._id)}
                      >
                        Avaliar
                      </Button>
                    )}
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
