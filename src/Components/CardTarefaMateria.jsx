import React from 'react';
import { Card, Avatar, Button, Typography, Tag } from "antd";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const { Title, Text } = Typography;

function CardTarefaMateria({title, professorName, professorImage, subject, status, id, button}) {
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
  const navigate = useNavigate();

  function RedirecionarTarefa() {
    if(button == "Realizar tarefa"){
      navigate(`/tarefa/${id}`);
    }
    if(button == "Ver respostas"){
      navigate(`/respostastarefa/${id}`);
    }
    if(button == "Voltar"){
      navigate(`/dashboard/tarefas/aluno/all`);
    }
  }

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
          <Avatar src={professorImage} style={{ marginRight: 10, backgroundColor: 'transparent' }} size={50}/>
          <div>
            <Title level={4} style={{ margin: 0, fontSize: 15 }}>{professorName}</Title>
          </div>
        </div>
        <div style={{ marginBottom: 10, textAlign: 'center' }}>
          <Text strong style={{ fontSize: 20 }}>Assunto:</Text>
          <Title level={5} style={{ margin: '5px 0', fontWeight: 'bold', fontSize: 22 }}>{subject}</Title>
        </div>
        <div style={{ marginBottom: 10, textAlign: 'center' }}>
          <Text strong style={{ display: 'block', fontSize: '16px' }}>Status:</Text>
          {status === "em andamento" ? (
            <Tag color="#1E90FF" style={{fontWeight: 'bolder', fontSize: 18}}>Em andamento</Tag>
          ) : status === "atrasada" ? (
            <Tag color="#DC3545" style={{fontWeight: 'bolder', fontSize: 18}}>Atrasada</Tag>
          ) : status === "pronto" ? (
            <Tag color="#28A745" style={{fontWeight: 'bolder', fontSize: 18}}>Pronto</Tag>
          ) : status === "cancelada" ? (
            <Tag color="#6C757D" style={{fontWeight: 'bolder', fontSize: 18}}>Cancelada</Tag>
          ) : status === "pendente" ? (
            <Tag color="#FFC107" style={{fontWeight: 'bolder', fontSize: 18}}>Pendente</Tag>
          ) : (
            <Text>Carregando...</Text>
          )}
        </div>
        <Button type="primary" style={{ width: '100%', backgroundColor: 'transparent', color: 'black', fontWeight: 'bold', border: '1px solid black' }} onClick={RedirecionarTarefa}>
          {button}
        </Button>
      </div>
    </Card>
  );
}

export default CardTarefaMateria;
