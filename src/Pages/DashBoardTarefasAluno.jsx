import React from 'react'
import Card from '../Components/CardTarefaGeral'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Grid, Typography, Box } from '@mui/material'
import Footer from '../Components/Footer'
import HeaderDashBoards from '../Components/HeaderDashboards'
import Logo from '../Photos/logo_athena 5.png'
import Graph from '../Components/Graph'

function DashBoardTarefas() {
  return (
    <>
    <Header textBar1="Home" textBar2="Minhas Notas" textBar3="Presença" textBar4="Minhas Tarefas"/>
    <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems='center'>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100px' }} />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography sx={{ color: '#1754F0', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 30 }} variant="h6">
            SEÇÃO DE TAREFAS
            <Typography variant="body2" sx={{ color: '#676767', fontSize: 25 }}>SESI 337</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ fontSize: 30, display: 'flex', flexDirection: 'row' }}>
            Olá, <Typography variant="body1" sx={{ fontSize: 30, color: '#1754F0', fontWeight: 'bold' }}>Aluno</Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: '#676767', fontSize: 25 }}>Aluno</Typography>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{ marginTop: 5, justifyContent: 'center', marginBottom: 10, display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} sm={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card title="TAREFAS TOTAL" quantidade="9" descricao="Tarefa de Matemática" colorBorder="#4A90E2" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card title="TAREFAS CONCLUIDAS" quantidade="4" descricao="Tarefa de Matemática" colorBorder="#83E509" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card title="TAREFAS EM ANDAMENTO" quantidade="2"  descricao="Tarefa de Matemática" colorBorder="#FFA500" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card title="TAREFAS ATRASADAS" quantidade="3"   descricao="Tarefa de Matemática" colorBorder="#FF4C4C" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5, maxHeight: '500px', overflow: 'hidden'}}>
        <Typography
          sx={{
            textAlign: 'center',
            borderBottom: '2px solid #004FFF',
            color: 'black',
            fontWeight: 'bold',
            width: '50%',
            margin: '0 auto',
            padding: '8px 0',
            fontSize: 25
          }}
        >
          STATUS DE SUAS TAREFAS
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2, 
          maxHeight: '400px',
          overflow: 'hidden',
          margin: '0 auto'
        }}>
          <Graph 
            type="pie"
            data={[
              { name: 'Concluídas', value: 4, color: '#83E509' },
              { name: 'Em Andamento', value: 2, color: '#FFA500' },
              { name: 'Presentes', value: 3, color: '#FF4C4C' },
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  <Footer/>
  </>
  )
}

export default DashBoardTarefas
