import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Modal, Space } from 'antd';

function AssisthenaInfo() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', width: '100vw', marginBottom: '3rem' }}>
      <Grid sx={{ backgroundColor: '#BCC7CF', width: '80vw', height: '6.5rem', borderRadius: '10px', padding: '1rem' }}>
        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#235BD5' }}>
            NOVIDADE!
          </Typography>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>A Assisthena é projetada com IA para te ajudar na didática</Typography>
          <Button variant="contained" onClick={showModal}>SAIBA MAIS</Button>
        </Grid>
      </Grid>

      <Modal
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        centered
        width={700}
        bodyStyle={{
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          overflowY: 'auto',
          maxHeight: '70vh'
        }}
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px'
        }}
      >
        <Space direction="vertical" size="middle" style={{ maxWidth: '100%' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#235BD5', textAlign: 'center' }}>
            Conheça a Assisthena
          </Typography>
          <Typography sx={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem' }}>
            A Assisthena é um modelo de inteligência artificial em desenvolvimento, sua função é facilitar a vida de alunos, pais, professores e todos os envolvidos no processo educacional. Com sua ajuda, é possível responder a perguntas e fornecer orientações em diversas áreas da educação, promovendo um aprendizado mais eficaz e uma gestão escolar mais integrada.
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#235BD5', marginBottom: '1rem' }}>
            Exemplos de Perguntas
          </Typography>
          <Typography>
            <strong>Para Professores:</strong>
            <ul>
              <li>Engajamento e Motivação: "Estou precisando de uma visão de fora para ampliar o engajamento das aulas."</li>
              <li>Práticas Pedagógicas: "Consegue me ajudar a aumentar a interatividade das aulas?"</li>
            </ul>
          </Typography>
          <Typography>
            <strong>Para Alunos:</strong>
            <ul>
              <li>Preparação para Provas: "Como posso me preparar para provas?"</li>
              <li>Desempenho Acadêmico: "Dicas para melhorar minhas notas?"</li>
            </ul>
          </Typography>
          <Typography>
            <strong>Para Diretores:</strong>
            <ul>
              <li>Gestão Escolar: "Quais são as práticas recomendadas para gestão escolar?"</li>
              <li>Inclusão e Comunicação: "Como promover um ambiente escolar inclusivo?"</li>
            </ul>
          </Typography>
          <Typography>
            <strong>Para Orientadores:</strong>
            <ul>
              <li>Apoio Emocional: "Como ajudar alunos com dificuldades emocionais?"</li>
              <li>Saúde Mental: "Como promover a saúde mental na escola?"</li>
            </ul>
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ display: 'block', margin: '1rem auto 0' }}>
            Fechar
          </Button>
        </Space>
      </Modal>
    </Container>
  );
}

export default AssisthenaInfo;
