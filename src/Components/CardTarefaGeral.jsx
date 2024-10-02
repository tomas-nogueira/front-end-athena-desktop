import React, { useEffect, useState } from 'react';
import { Card, Button } from "antd";
import { useNavigate } from 'react-router-dom';

function CardTarefaGeral({ title, quantidade, colorBorder }) {
  const [icon, setIcon] = useState();
  const navigate = useNavigate(); // Hook para navegação

  const { Meta } = Card;

  useEffect(() => {
    if (title === "TAREFAS CONCLUIDAS") {
      setIcon(require('../Photos/IconTarefaConcluida.png'));
    }
    if (title === "TAREFAS EM ANDAMENTO") {
      setIcon(require('../Photos/IconTarefaPendente.png'));
    }
    if (title === "TAREFAS ATRASADAS") {
      setIcon(require('../Photos/IconTarefaAtrasada.png'));
    }
    if (title === "TAREFAS TOTAL") {
      setIcon(require('../Photos/IconTarefaTotal.png'));
    }
  }, [title]);

  const handleViewMoreClick = () => {
    navigate('/dashboard/tarefas/aluno/all'); // Navegar para a rota desejada
  };

  return (
    <Card
      title={<span>{title}</span>}
      style={{
        maxWidth: 300,
        padding: 10,
        borderLeft: `5px solid ${colorBorder}`,
        backgroundColor: "white",
        borderRadius: 8,
      }}
      cover={
        <img
          alt="Ícone da Tarefa"
          src={icon}
          style={{
            width: '60%',
            height: 'auto',
            margin: "10px auto",
          }}
        />
      }
    >
      <div style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: colorBorder }}>
        {quantidade}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <Button 
          type="primary" 
          onClick={handleViewMoreClick} 
          style={{
            backgroundColor: colorBorder,
            borderColor: colorBorder,
            borderRadius: 5,
            fontWeight: 'bold',
            padding: '5px 20px',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#ffffff'; // Cor ao passar o mouse
            e.currentTarget.style.color = colorBorder; // Cor do texto ao passar o mouse
            e.currentTarget.style.borderColor = colorBorder; // Cor da borda ao passar o mouse
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = colorBorder; // Cor original
            e.currentTarget.style.color = '#ffffff'; // Cor do texto original
          }}
        >
          VER MAIS
        </Button>
      </div>
    </Card>
  );
}

export default CardTarefaGeral;
