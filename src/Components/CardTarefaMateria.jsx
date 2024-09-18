import React from 'react';
import { Card, Avatar, Button, Typography, Tag } from "antd";
import { EditOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function CardTarefaMateria() {
  return (
    <Card
      title='TAREFA DE MATEMÁTICA'
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
        <div style={{ marginBottom: 10, textAlign: 'center'  }}>
          <Text strong style={{display: 'block', fontSize: '16px'}}>Status:</Text>
          <Tag color="#FF4C4C">Em andamento</Tag>
        </div>
        <Button type="primary" style={{ width: '100%' }}>
          Ver Tarefa
        </Button>
      </div>
    </Card>
  );
}

export default CardTarefaMateria;
