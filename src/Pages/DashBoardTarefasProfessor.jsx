import React from 'react'
import Card from '../Components/CardTarefaGeral'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Typography } from '@mui/material'
import Footer from '../Components/Footer'
import { VictoryPie } from 'victory'

function DashBoardTarefas() {
  return (
    <>
    <Header textBar1="Home" textBar2="Notas dos Alunos" textBar3="Presença"/>
    <Container sx={{marginBottom: '2rem'}}>
      <Typography style={{textAlign: 'center', fontSize: "8vh"}}>
        SUAS TAREFAS PROPOSTAS
      </Typography>
      <Container style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center'}}>
        <VictoryPie
        colorScale={['#83E509', '#FFA500', '#FF4C4C']}
        data={[
            { x: "Tarefas Feitas", y: 25 },
            { x: "Tarefas em Andamento", y: 25 },
            { x: "Tarefas em Atraso", y: 50 }
        ]}
        animate={{
          duration: 2000
        }}
        />
      </Container >
    </Container>
    <Footer/>
    </>
  )
}

export default DashBoardTarefas
