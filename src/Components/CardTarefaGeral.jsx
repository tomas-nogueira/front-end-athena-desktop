import React, { useEffect, useState } from 'react';
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons';

function CardTarefaGeral({ title, quantidade, colorBorder, descricao}) {
  const [icon, setIcon] = useState();

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
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <CheckOutlined key="check" />,
      ]}
    >

      <div style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: colorBorder }}>
        {quantidade}
      </div>
    </Card>
  );
}

export default CardTarefaGeral;
