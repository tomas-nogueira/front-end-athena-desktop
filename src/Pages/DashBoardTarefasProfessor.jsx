import React from 'react'
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
      </Container >
    </Container>
    <Footer/>
    </>
  )
}

export default DashBoardTarefas
