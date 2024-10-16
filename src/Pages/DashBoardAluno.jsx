import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Logo from '../Photos/logo_athena 5.png';
import Typography from '@mui/material/Typography';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import Footer from '../Components/Footer'
import HeaderDashboards from '../Components/HeaderDashboards'
import { List, ListItem, ListItemText } from '@mui/material';
import FooterNovo from '../Components/Footer'


function DashBoardAluno() {

  const [dadosUser, setDadosUser] = useState({})

  const activities = [
        { text: 'Análise Combinatória - Professora Letícia' },
        { text: 'Exercícios Mecânica - Professor William',},
        { text: 'Prova de Isomeria - Professor Dexter',},
        { text: 'Prova de Transgenia - Professora Aline',},
        { text: 'Exercícios de Orogenia - Professora Marina',}
  ]

  useEffect(() =>{
    const token = localStorage.getItem('token');

      fetch("http://localhost:3030/user", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
        setDadosUser(json.message)
        console.log(dadosUser)
    })
    .catch((error) => {
    });
  }, [])

  return (
    <>
      <Header/>
      <HeaderDashboards role={dadosUser.role} name={dadosUser.name} institution='SESI 337'/>
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10}}>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', gap: '3rem'}}>
          <Grid item xs={12} sm={5} sx={{backgroundColor: 'white', borderRadius: 5}}>
              <Typography
                sx={{
                    textAlign: 'center', 
                    borderBottom: '3px solid #004FFF',
                    color: 'black', 
                    fontWeight: 'bold', 
                    width: '35%', 
                    margin: '0 auto',
                    padding: '8px 0',
                    fontSize: 25,
                    color: '#394255' 
                    }}
              > SEU DESEMPENHO
              </Typography>
                  <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Graph 
                    type='bar'
                    data={[
                      { name: 'Matemática', value: 75, color: '#004FFF' },
                      { name: 'Química', value: 90, color: '#004FFF' },
                      { name: 'Português', value: 65, color: '#004FFF' },
                      { name: 'Inglês', value: 40, color: '#004FFF' },
                      { name: 'Física', value: 80, color: '#004FFF' },
                      { name: 'Biologia', value: 80, color: '#004FFF' },
                      { name: 'Geografia', value: 95, color: '#004FFF' },
                    ]}
                    />
                  </Box>
              </Grid>
              <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5}}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    borderBottom: '3px solid #004FFF',
                    color: 'black',
                    fontWeight: 'bold',
                    width: '60%',
                    margin: '0 auto',
                    padding: '8px 0',
                    fontSize: 25,
                    color: '#394255'
                  }}
                >SEMESTRE ATUAL X PASSADO
                  </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Graph 
                        type='stackedLine'
                        data={[
                          { 
                            name: 'Presente', 
                            values: [120, 132, 101, 134, 90, 230, 210], 
                            color: '#235BD5' 
                          },
                          { 
                            name: 'Ausente', 
                            values: [220, 182, 191, 234, 290, 330, 310], 
                            color: '#405480' 
                          }
                        ]}
                      />
                    </Box>
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', gap: '3rem'}}>
        <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5}}>
              <Typography
                sx={{
                  textAlign: 'center',
                  borderBottom: '3px solid #004FFF',
                  color: 'black',
                  fontWeight: 'bold',
                  width: '30%',
                  margin: '0 auto',
                  padding: '8px 0',
                  fontSize: 25,
                  color: '#394255'
                }}
              >SUA FREQUÊNCIA
                </Typography>
                  <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Graph 
                    type='pie'
                    data={[
                      { name: 'Presente', value: 90, color: '#235BD5' },
                      { name: 'Ausente', value: 10, color: '#405480' },
                    ]}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row'}}></Box>
              </Grid>
            <Grid item xs={12} sm={5} sx={{backgroundColor: 'white',  borderRadius: 5}}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    borderBottom: '3px solid #004FFF',
                    color: 'black',
                    fontWeight: 'bold',
                    width: '70%',
                    margin: '0 auto',
                    padding: '8px 0',
                    fontSize: 25,
                    color: '#394255'
                  }}
                >TAREFAS PARA OS PRÓXIMOS DOIS DIAS
                  </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1rem',}}>
                      <List sx={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {activities.map((activity, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: 2,
                                marginBottom: 1,
                                padding: '10px',
                                boxShadow: 1,
                                position: 'relative',
                                '&:last-child': {
                                    marginBottom: 0
                                }
                            }}
                        >
                            <ListItemText primary={activity.text} />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '3px',
                                    backgroundColor: activity.status === 'completed' ? '#4caf50' : '#f44336'
                                }}
                            />
                        </ListItem>
                    ))}
                  </List>
                    </Box>
            </Grid>
        </Grid>
      </Grid>
      <FooterNovo/>
    </>
  )
}

export default DashBoardAluno
