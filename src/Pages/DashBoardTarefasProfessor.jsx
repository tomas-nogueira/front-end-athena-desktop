import React from 'react'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Typography } from '@mui/material'
import Footer from '../Components/Footer'
import Graph from '../Components/Graph'

function DashBoardTarefas() {
  return (
    <>
    <Header textBar1="Home" textBar2="Notas dos Alunos" textBar3="Presença"/>
    <Container sx={{marginBottom: '2rem'}}>
      <Typography style={{textAlign: 'center', fontSize: "8vh"}}>
        SUAS TAREFAS PROPOSTAS
      </Typography>
      <Container sx={{maxWidth: '1080px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Graph
          data={[
            { name: 'Tarefas Feitas', value: 25, color: '#83E509' },
            { name: 'Tarefas em Andamento', value: 25, color: '#FFA500' },
            { name: 'Tarefas em Atraso', value: 50, color: '#FF4C4C' }
          ]}
        />
      </Container >
    </Container>
    <Footer/>
    </>
  )
}

export default DashBoardTarefas
