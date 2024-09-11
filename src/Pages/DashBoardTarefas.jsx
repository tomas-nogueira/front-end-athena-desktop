import React from 'react'
import Card from '../Components/CardTarefaGeral'
import {Flex} from 'antd'
import Style from '../Styles/DashBoard.module.css'
import Header from '../Components/Header'
import { Typography } from '@mui/material'

function DashBoardTarefas() {
  return (
    <>
    <section className={Style.ContainerMaster}>
      <Header textBar1="Home" textBar2="Item 2" textBar3="Item 3"/>
      <Typography style={{textAlign: 'center', fontSize: "9vh"}}>
        SUAS TAREFAS
      </Typography>
      <Flex style={{alignItems: 'center', justifyContent: "space-around", maxWidth: "1440px", margin: "0 auto", display: "flex", flexDirection: 'row', gap: 10}}>
          <Card title="TAREFAS TOTAL" quantidade="3" text="4" professor="Professor 1" descricao="Tarefa de Matemática"  colorBorder="#4A90E2" />
          <Card title="TAREFAS CONCLUIDAS" quantidade="3" text="4" professor="Professor 2" descricao="Tarefa de Matemática" colorBorder="#83E509"/>
          <Card title="TAREFAS EM ANDAMENTO" quantidade="3" text="4" professor="Professor 1" descricao="Tarefa de Matemática"  colorBorder="#FFA500"/>
          <Card title="TAREFAS ATRASADAS" quantidade="3" text="4" professor="Professor 1" descricao="Tarefa de Matemática"  colorBorder="#FF4C4C" />
      </Flex>
    </section>
    </>
  )
}

export default DashBoardTarefas
