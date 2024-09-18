import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Logo from '../Photos/logo_athena 5.png';
import Typography from '@mui/material/Typography';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import Footer from '../Components/Footer'
import HeaderDashboards from '../Components/HeaderDashboards'


function DashBoardAluno() {
  return (
    <>
      <Header/>
      <HeaderDashboards role='ALUNO' name='Tomás' institution='SESI 337'/>
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
                    fontSize: 25 
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
                  width: '30%',
                  margin: '0 auto',
                  padding: '8px 0',
                  fontSize: 25
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
        </Grid>
        </Grid>
    </>
  )
}

export default DashBoardAluno
