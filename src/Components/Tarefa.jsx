import { Container, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { TextField } from '@mui/material';
import { Button, Typography, Radio } from "antd";
import { useParams } from 'react-router-dom'; // Importar useParams

function Tarefa() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dataTask, setDataTask] = useState(null);
  const [dissertativeResponse, setDissertativeResponse] = useState('');
  const { id } = useParams(); // Pegar o id da URL

  useEffect(() => {
    if (id) { // Certifique-se de que o ID existe antes de fazer a chamada
      const token = localStorage.getItem('token');
      fetch(`http://localhost:8080/tasks/getId/${id}`, { // Use o id capturado
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((resposta) => resposta.json())
        .then((json) => {
          console.log(json)
          setDataTask(json);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]); // O useEffect será chamado sempre que o id mudar

  function EnviarResposta() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/tasks/response`, {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 5, width: '100%' }}>
          <Grid item xl={3} sm={6}>
            <CardTarefaMateria 
              title={dataTask ? `Tarefa de ${dataTask.subject}` : 'Carregando...'}
              professorName="Professora Rebeca"
              professorImage="https://static.vecteezy.com/ti/fotos-gratis/t2/28678649-femea-professor-treinamento-gerar-ai-foto.jpg"
              subject={dataTask ? dataTask.subject : 'Carregando...'}
              status={dataTask ? dataTask.status : 'Carregando...'}
            />
          </Grid>
          <Grid item xl={8} sm={6} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: 2, boxShadow: 2, minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: 2, padding: 3, boxSizing: 'border-box', width: '100%', height: '100%' }}>
              <Typography style={{ color: 'rgba(103, 98, 98, 1)', fontSize: 30, marginBottom: 1 }}>
                Banca: ATHENA
              </Typography>
              <Typography style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1.5, color: 'black' }}>
                {dataTask ? dataTask.content : 'Carregando...'}
              </Typography>
              <Box sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 3, boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center' }}>
                {dataTask && dataTask.alternatives && dataTask.alternatives.length === 0 ? (
                  <>
                    <TextField
                      label="Responder..."
                      variant="standard"
                      sx={{ width: '100%' }}
                      required
                      value={dissertativeResponse}
                      onChange={(e) => setDissertativeResponse(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6">Selecione uma alternativa:</Typography>
                    {dataTask && dataTask.alternatives ? (
                      <Radio.Group onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue} style={{ display: 'flex', marginTop: 1, alignContent: 'center' }}>
                        {dataTask.alternatives.map((alternative, index) => (
                          <Radio key={index} value={alternative.text} style={{ display: 'block', marginBottom: 10, fontSize: 16 }}>
                            {alternative.text}
                          </Radio>
                        ))}
                      </Radio.Group>
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
    </>
  );
}

export default Tarefa;
