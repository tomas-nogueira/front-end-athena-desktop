import React from 'react';
import { Card, Avatar, Button, Typography, Tag } from "antd";

const { Title, Text } = Typography;

function CardTarefaMateria({ 
  title, 
  professorName, 
  professorImage, 
  subject, 
  status 
}) {
  // Lógica para determinar o ícone com base no assunto
  const getImageSrc = (subject) => {
    switch (subject) {
      case 'Língua Portuguesa':
        return require('../Photos/PhotosCardTarefas/IconLinguaPortuguesa.png');
      case 'Matemática':
        return require('../Photos/PhotosCardTarefas/IconMatematica.png');
      case 'Biologia':
        return require('../Photos/PhotosCardTarefas/IconBiologia.png');
      case 'Física':
        return require('../Photos/PhotosCardTarefas/IconFisica.png');
      case 'Química':
        return require('../Photos/PhotosCardTarefas/IconQuimica.png');
      case 'História':
        return require('../Photos/PhotosCardTarefas/IconHistoria.png');
      case 'Geografia':
        return require('../Photos/PhotosCardTarefas/IconGeografia.png');
      case 'Inglês':
        return require('../Photos/PhotosCardTarefas/IconInglês.png');
      case 'Educação_Física':
        return require('../Photos/PhotosCardTarefas/IconEducacaoFisica.png');
      case 'Artes':
        return require('../Photos/PhotosCardTarefas/IconArtes.png');
      default:
        return 'caminho/para/icon/default.png';
    }
  };

  const imageSrc = getImageSrc(subject); // Chama a função para obter a imagem

  return (
    <Card
      title={
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
          {title}
        </div>
      }
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
          src={imageSrc}
          style={{ width: "100%", height: "auto", borderRadius: '10px' }}
        />
      }
    >
      <div style={{ marginBottom: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <Avatar src={professorImage} style={{ marginRight: 10 }} />
          <div>
            <Title level={4} style={{ margin: 0 }}>{professorName}</Title>
          </div>
        </div>
        <div style={{ marginBottom: 10, textAlign: 'center' }}>
          <Text strong style={{ fontSize: '16px' }}>Assunto:</Text>
          <Title level={5} style={{ margin: '5px 0', fontWeight: 'bold' }}>{subject}</Title>
        </div>
        <div style={{ marginBottom: 10, textAlign: 'center' }}>
          <Text strong style={{ display: 'block', fontSize: '16px' }}>Status:</Text>
          {status === "em andamento" ? (
            <Tag color="#FFA500">Em andamento</Tag>
          ) : status === "atrasado" ? (
            <Tag color="#FF4C4C">Em atraso</Tag>
          ) : (
            <Text>Carregando...</Text>
          )}
        </div>
        <Button type="primary" style={{ width: '100%' }}>
          VOLTAR
        </Button>
      </div>
    </Card>
  );
}

export default CardTarefaMateria;
