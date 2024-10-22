import { Container, Box, Grid, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { TextField } from '@mui/material';
import { Button, Typography, Radio } from "antd";
import { useParams, useNavigate } from 'react-router-dom'; // Importar useParams e useNavigate

function Tarefa() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dataTask, setDataTask] = useState(null);
  const [dissertativeResponse, setDissertativeResponse] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para o Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { id } = useParams(); // Pegar o id da URL
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3030/tasks/getId/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          setDataTask(json);
          console.log(json);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]); // O useEffect será chamado sempre que o id mudar

  function EnviarResposta() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3030/tasks/response`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        idTask: id, // Envie o id capturado
        responseContent: dissertativeResponse || null,
        selectedAlternative: selectedValue || null,
      })
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        console.log(data);
        setSnackbarMessage(data.message); 
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/dashboard/tarefas/aluno');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 5, width: '100%' }}>
          <Grid item xl={3} sm={6}>
            <CardTarefaMateria 
              title={dataTask ? `Tarefa de ${dataTask.subject}` : 'Carregando...'}
              subject={dataTask ? dataTask.subject : 'Carregando...'}
              status={dataTask ? dataTask.status : 'Carregando...'}
              button='Voltar'
            />
          </Grid>
          <Grid item xl={8} sm={6} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: 2, boxShadow: 2, minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: 2, padding: 3, boxSizing: 'border-box', width: '100%', height: '100%' }}>
              <Typography style={{ color: 'rgba(103, 98, 98, 1)', fontSize: 30, marginBottom: 1 }}>
                Banca: ATHENA
              </Typography>
              <Typography style={{ fontSize: 25, fontWeight: 'bold', lineHeight: 1.5, color: 'black', textAlign: 'center' }}>
                {dataTask ? dataTask.content : 'Carregando...'}
              </Typography>
              <Box sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 3, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {dataTask && dataTask.alternatives && dataTask.alternatives.length === 0 ? (
                  <TextField
                    label="Responder..."
                    variant="standard"
                    sx={{ width: '100%' }}
                    required
                    value={dissertativeResponse}
                    onChange={(e) => setDissertativeResponse(e.target.value)}
                  />
                ) : (
                  <>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>Selecione uma alternativa:</Typography>
                    {dataTask && dataTask.alternatives ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 1 }}>
                        <Radio.Group onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue} 
                        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          {dataTask.alternatives.map((alternative, index) => (
                            <Radio key={index} value={alternative.text} style={{ marginBottom: 15, fontSize: 16, border: '1px solid black', padding: 20, borderRadius: 10 }}>
                              {alternative.text}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Box>
                    ) : (
                      <Typography>Carregando alternativas...</Typography>
                    )}
                  </>
                )}
              </Box>
              <Button onClick={EnviarResposta} style={{ marginTop: 20 }} type="primary">ENVIAR RESPOSTA</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Duração do Snackbar
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posição centralizada no topo
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Fechar
          </Button>
        }
      />
    </>
  );
}

export default Tarefa;
