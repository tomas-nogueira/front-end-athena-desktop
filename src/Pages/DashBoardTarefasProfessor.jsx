import React, { useState } from 'react'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardActions, CardContent, Button } from '@mui/material'
import Footer from '../Components/Footer'
import Graph from '../Components/Graph'
import Select from '../Components/Select'
import HeaderDashboards from '../Components/HeaderDashboards'

function DashBoardTarefas() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClass2, setSelectedClass2] = useState('');

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleClassChange2 = (event) => {
    setSelectedClass2(event.target.value);
  };
  const classOptions = [
    { value: '1ano', label: '1º Ano' },
    { value: '2ano', label: '2º Ano' },
    { value: '3ano', label: '3º Ano' },
    { value: '4ano', label: '4º Ano' },
    { value: '5ano', label: '5º Ano' },
    { value: '6ano', label: '6º Ano' },
    { value: '7ano', label: '7º Ano' },
    { value: '8ano', label: '8º Ano' },
    { value: '9ano', label: '9º Ano' },
    { value: '1medio', label: '1º Médio' },
    { value: '2medio', label: '2º Médio' },
    { value: '3medio', label: '3º Médio' }
  ];
  const classOptions2 = [
    { value: '1ano', label: '1º Ano' },
    { value: '2ano', label: '2º Ano' },
    { value: '3ano', label: '3º Ano' },
    { value: '4ano', label: '4º Ano' },
    { value: '5ano', label: '5º Ano' },
    { value: '6ano', label: '6º Ano' },
    { value: '7ano', label: '7º Ano' },
    { value: '8ano', label: '8º Ano' },
    { value: '9ano', label: '9º Ano' },
    { value: '1medio', label: '1º Médio' },
    { value: '2medio', label: '2º Médio' },
    { value: '3medio', label: '3º Médio' }
  ];
  return (
    <>
    <Header textBar1="Home" textBar2="Cadastrar uma Tarefa" textBar3="Lançar Notas" textBar4='Presença dos Alunos'/>
    <HeaderDashboards name='Rafael Vírgilio' institution='SESI 337' role='Professor'/>
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10}}>
        <Grid
        item
        xs={12}
        sm={5}
        sx={{
          backgroundColor: 'white',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          height: '600px'
        }}
      >
        <Typography
        sx={{
          textAlign: 'center',
          borderBottom: '2px solid #004FFF',
          color: 'black',
          fontWeight: 'bold',
          width: '50%',
          margin: '0 auto',
          padding: '8px 0',
          fontSize: 25,
        }}
        >
        FEEDBACKS E AVALIAÇÕES
        </Typography>
        <Card
        sx={{
          maxWidth: 345,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'none',
          marginTop: 2,
        }}
        >
        <CardActionArea>
          <Typography
            sx={{
              fontSize: 50,
              fontWeight: 'bold',
              color: '#004FFF',
              textAlign: 'center',
            }}
          >
            23
          </Typography>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 'bold'}}>
              FEEDBACKS E AVALIAÇÕES
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Caro Professor, é necessário que o senhor(a) dê os feedbacks e avalie as
              tarefas realizadas pelos alunos, clique no botão abaixo para ver quais
              tarefas são necessárias!!!
            </Typography>
          </CardContent>
        </CardActionArea>
    <CardActions>
    <Button
  size="large"
  sx={{
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#004FFF',
    color: 'white',
    width: '300px',
    '&:hover': {
      backgroundColor: '#002F99', // Cor desejada ao passar o mouse
    },
  }}
>
  VER
</Button>

    </CardActions>
  </Card>
  </Grid>
  <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5, height: '600px' }}>
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
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5}}>
    <Select
            label="Selecione a sala"
            menuItems={classOptions}
            value={selectedClass}
            onChange={handleClassChange}
          />
        <Graph 
        type='pie'
        data={[
          { name: 'Concluídas', value: 20, color: '#4CAF50' },
          { name: 'Em andamento', value: 31, color: '#FF9800' },
          { name: 'Atrasadas', value: 31, color: '#F44336' },
        ]}
        />
      </Box>
  </Grid>
  <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5, height: '600px'}}>
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
      DESEMPENHO DE SUAS SALAS
    </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5}}>
          <Select
          label="Selecione a sala"
          menuItems={classOptions2}
          value={selectedClass2}
          onChange={handleClassChange2}
        />
          <Graph 
          type='pie'
          data={[
            { name: 'Nível 1', value: 10, color: '#405480' },
            { name: 'Nível 2', value: 22, color: '#235BD5' },
            { name: 'Nível 3', value: 27, color: '#394255' },
            { name: 'Nível 4', value: 27, color: '#004FFF' }
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
