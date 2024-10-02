import { Container, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card, Avatar, Button, Typography, Tag, Radio } from "antd";
import Header from '../Components/Header';
import { TextField } from '@mui/material';

const { Title, Text } = Typography;

function Tarefa() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dataTask, setDataTask] = useState(null);
  const [imageTask, setImageTask] = useState();
  const [dissertativeResponse, setDissertativeResponse] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/tasks/getId/66fc35bc62dd997ca0eb86bc`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resposta) => resposta.json())
      .then((json) => {
        setDataTask(json);
        let imagePath;

        switch (json.subject) {
          case 'Língua Portuguesa':
            imagePath = require('../Photos/PhotosCardTarefas/IconLinguaPortuguesa.png');
            break;
          case 'Matemática':
            imagePath = require('../Photos/PhotosCardTarefas/IconMatematica.png');
            break;
          case 'Biologia':
            imagePath = require('../Photos/PhotosCardTarefas/IconBiologia.png');
            break;
          case 'Física':
            imagePath = require('../Photos/PhotosCardTarefas/IconFisica.png');
            break;
          case 'Química':
            imagePath = require('../Photos/PhotosCardTarefas/IconQuimica.png');
            break;
          case 'História':
            imagePath = require('../Photos/PhotosCardTarefas/IconHistoria.png');
            break;
          case 'Geografia':
            imagePath = require('../Photos/PhotosCardTarefas/IconGeografia.png');
            break;
          case 'Inglês':
            imagePath = require('../Photos/PhotosCardTarefas/IconInglês.png');
            break;
          case 'Educação_Física':
            imagePath = require('../Photos/PhotosCardTarefas/IconEducacaoFisica.png');
            break;
          case 'Artes':
            imagePath = require('../Photos/PhotosCardTarefas/IconArtes.png');
            break;
          default:
            imagePath = 'caminho/para/icon/default.png';
        }

        setImageTask(imagePath);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function EnviarResposta() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/tasks/response`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        idTask: '66fc35bc62dd997ca0eb86bc',
        responseContent: dissertativeResponse || null,
        selectedAlternative: selectedValue || null,    })
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
            <Card
              title={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', fontSize: 20, textAlign: 'center', marginBottom: 20 }}>{dataTask ? `Tarefa de ${dataTask.subject}` : 'Carregando...'}</div>}
              style={{
                maxWidth: 300,
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              cover={
                <img
                  alt="Ícone da Tarefa"
                  src={imageTask}
                  style={{ width: "100%", height: "auto", borderRadius: '10px' }}
                />
              }
            >
              <div style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <Avatar src="https://static.vecteezy.com/ti/fotos-gratis/t2/28678649-femea-professor-treinamento-gerar-ai-foto.jpg" style={{ marginRight: 10 }} />
                  <div>
                    <Title level={4} style={{ margin: 0 }}>Professora Rebeca</Title>
                  </div>
                </div>
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                  <Text strong style={{ fontSize: '16px' }}>Assunto:</Text>
                  <Title level={5} style={{ margin: '5px 0', fontWeight: 'bold' }}>{dataTask ? dataTask.subject : 'Carregando...'}</Title>
                </div>
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                  <Text strong style={{ display: 'block', fontSize: '16px' }}>Status:</Text>
                  {dataTask && dataTask.status === "em andamento" ? (
                    <Tag color="#FFA500">Em andamento</Tag>
                  ) : dataTask && dataTask.status === "atrasado" ? (
                    <Tag color="#FF4C4C">Em atraso</Tag>
                  ) : <Text>Carregando...</Text>}
                </div>
                <Button type="primary" style={{ width: '100%' }}>
                  VOLTAR
                </Button>
              </div>
            </Card>
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
                    <Typography variant="h6">Resposta Dissertativa:</Typography>
                    <TextField
                      label="Responder..."
                      variant="standard"
                      sx={{ width: '100%' }}
                      required
                      value={dissertativeResponse}
                      onChange={(e) => setDissertativeResponse(e.target.value)} // Mudança direta aqui
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
                      <Text>Carregando alternativas...</Text>
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
