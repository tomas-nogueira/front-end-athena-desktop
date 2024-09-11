import React, { useEffect, useState } from 'react'
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons';


function CardTarefaGeral({title, quantidade, text, colorBorder, descricao, professor}) {

    const [icon, setIcon] = useState()
    
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
    <>
        <Card
        title={`${title} - ${quantidade}`}
        style={{
        maxWidth: 300,
        padding: 10,
        backgroundColor: "none"
        }}
        cover={
        <img
            alt="Ícone da Tarefa"
            src={icon}
            style={{maxWidth: "50%", maxHeight: "50%", margin: "20px auto", borderLeft: `5px solid ${colorBorder}`, padding: 20}}
        />
        }
        actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <CheckOutlined key="check"/>,
          ]}
    >
      <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={professor}
      description={descricao}
    />
    </Card>
    </>
  )
}

export default CardTarefaGeral
