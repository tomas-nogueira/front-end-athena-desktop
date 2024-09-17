import React from 'react'
import Card from '../Components/CardTarefaGeral'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Typography } from '@mui/material'
import Footer from '../Components/Footer'

function DashBoardTarefas() {
  return (
    <>
    <Header textBar1="Home" textBar2="Minhas Notas" textBar3="Presença"/>
    <Container sx={{marginBottom: '2rem'}}>
      <Typography style={{textAlign: 'center', fontSize: "8vh"}}>
        SUAS TAREFAS
      </Typography>
      <Container style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center'}}>
          <Card title="TAREFAS TOTAL" quantidade="19" text="4" professor="Professor 1" descricao="Tarefa de Matemática"  colorBorder="#4A90E2" />
          <Card title="TAREFAS CONCLUIDAS" quantidade="4" text="4" professor="Professor 2" descricao="Tarefa de Matemática" colorBorder="#83E509"/>
          <Card title="TAREFAS EM ANDAMENTO" quantidade="2" text="4" professor="Professor 1" descricao="Tarefa de Matemática"  colorBorder="#FFA500"/>
          <Card title="TAREFAS ATRASADAS" quantidade="3" text="4" professor="Professor 1" descricao="Tarefa de Matemática"  colorBorder="#FF4C4C" />
      </Container >
    </Container>
    <Footer/>
    </>
  )
}

export default DashBoardTarefas
