import { Container, Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Card, Avatar, Button, Typography, Tag, Radio } from "antd";
import Header from '../Components/Header';
import { color } from 'echarts';

const { Title, Text } = Typography;

function Tarefa() {

  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 5, width: '100%' }}>
          <Grid item xl={3} sm={6}>
            <Card
              title='TAREFA DE MATEMÁTICA'
              style={{
                maxWidth: 300, // Diminuído de 300 para 250
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              cover={
                <img
                  alt="Ícone da Tarefa"
                  src="https://cdn-icons-png.flaticon.com/512/4832/4832337.png"
                  style={{ width: "100%", height: "auto", borderRadius: '10px' }}
                />
              }
            >
              <div style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <Avatar src="https://static.vecteezy.com/ti/fotos-gratis/t2/28678649-femea-professor-treinamento-gerar-ai-foto.jpg" style={{ marginRight: 10 }} />
                  <div>
                    <Title level={4} style={{ margin: 0 }}>Professora Rebeca</Title>
                    <Text type="secondary">Matemática</Text>
                  </div>
                </div>
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                  <Text strong style={{ fontSize: '16px' }}>Assunto:</Text>
                  <Title level={5} style={{ margin: '5px 0', fontWeight: 'bold' }}>Números Complexos</Title>
                </div>
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                  <Text strong style={{ display: 'block', fontSize: '16px' }}>Status:</Text>
                  <Tag color="#FF4C4C">Em andamento</Tag>
                </div>
                <Button type="primary" style={{ width: '100%' }}>
                  VOLTAR
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xl={8} sm={6} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: 2, boxShadow: 2, minHeight: '600px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: 2, padding: 3, boxSizing: 'border-box'}}>
              <Typography style={{ color: 'rgba(103, 98, 98, 1)', fontSize: 30, marginBottom: 1 }}>
                Banca: ATHENA
              </Typography>
              <Typography style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1.5, color: 'black' }}>
                Um ponto (x,y) do plano cartesiano pertence ao conjunto F se é equidistante dos eixos OX e OY e pertence ao círculo de equação x² + y² - 2x - 6y + 2 = 0. É correto afirmar que F.
              </Typography>
              <Box sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 3, boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6">Selecione uma alternativa:</Typography>
                <Radio.Group onChange={handleChange} value={selectedValue} style={{ display: 'flex', marginTop: 1, alignContent: 'center' }}>
                  <Radio value="vazio" style={{ display: 'block', marginBottom: 10, fontSize: 16 }}>
                    É um conjunto vazio
                  </Radio>
                <Radio value="dois" style={{ display: 'block', marginBottom: 10,fontSize: 16 }}>
                  Tem dois pontos
                </Radio>
                <Radio value="um" style={{ display: 'block', marginBottom: 10, fontSize: 16 }}>
                  Tem apenas um ponto
                </Radio>
              </Radio.Group>
              </Box>
              <Button type="primary" style={{ width: '100%' }}>
                  ENVIAR
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Tarefa;
