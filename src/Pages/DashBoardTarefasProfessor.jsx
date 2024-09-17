import React from 'react'
import Card from '../Components/CardTarefaGeral'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Typography } from '@mui/material'
import Footer from '../Components/Footer'

function DashBoardTarefas() {
  return (
    <>
    <Header textBar1="Home" textBar2="Notas dos Alunos" textBar3="Presença"/>
    <Container sx={{marginBottom: '2rem'}}>
      <Typography style={{textAlign: 'center', fontSize: "8vh"}}>
        SUAS TAREFAS PROPOSTAS
      </Typography>
      <Container style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center'}}>
      </Container >
    </Container>
    <Footer/>
    </>
  )
}

export default DashBoardTarefas
