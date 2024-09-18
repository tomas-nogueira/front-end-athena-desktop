import React, { useState } from 'react'
import Style from '../Styles/Style.css'
import Header from '../Components/Header'
import { Container, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardActions, CardContent, Button } from '@mui/material'
import Footer from '../Components/Footer'
import Graph from '../Components/Graph'
import Select from '../Components/Select'

function DashBoardTarefas() {
  const [selectedClass, setSelectedClass] = useState('');
  
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
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
  return (
    <>
    <Header textBar1="Home" textBar2="Notas dos Alunos" textBar3="Presença"/>
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
    padding: 3, // Adiciona um padding ao redor do Grid
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
    FEEDBACKS
  </Typography>
  <Card
    sx={{
      maxWidth: 345,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'none',
      marginTop: 2, // Adiciona espaço entre o título e o card
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
          FEEDBACKS NECESSÁRIOS
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Caro Professor, é necessário que o senhor(a) dê os feedbacks das
          tarefas realizadas pelos alunos, clique no botão abaixo para ver quais
          tarefas são necessárias!!!
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="large" sx={{fontWeight: 'bold', fontSize: 20, backgroundColor: '#004FFF', color: 'white'}}>
        VER
      </Button>
    </CardActions>
  </Card>
</Grid>
            <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5}}>
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
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
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
            <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5}}>
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
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Select
                  label="Selecione a sala"
                  menuItems={classOptions}
                  value={selectedClass}
                  onChange={handleClassChange}
                />
                  <Graph 
                  type='pie'
                  data={[
                    { name: 'Atestado', value: 5, color: '#405480' },
                    { name: 'Ausentes', value: 31, color: '#235BD5' },
                    { name: 'Presentes', value: 31, color: '#394255' },
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
