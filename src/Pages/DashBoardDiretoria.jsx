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

function DashBoardDiretoria() {
  const [dadosUser, setDadosUser] = useState({})

  useEffect(() =>{
    const token = localStorage.getItem('token');

      fetch("http://localhost:8080/user", {
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
    <Header textBar1="Recados"/>
        <HeaderDashboards role={dadosUser.role} name={dadosUser.name} institution='SESI-337'/>
        <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10}}>
          <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', gap: '3rem'}}>
            <Grid item xs={12} sm={5} sx={{backgroundColor: 'white', borderRadius: 5}}>
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
                DESEMPENHO ALUNOS
              </Typography>

                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Graph 
                  type='bar'
                  data={[
                    { name: 'Acima', value: 75, color: '#004FFF' },
                    { name: 'Média', value: 10, color: '#004FFF' },
                    { name: 'Abaixo', value: 5, color: '#004FFF' },
                    { name: 'Crítico', value: 10, color: '#004FFF' }
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
                    DESEMPENHO FUNCIONÁRIOS
                </Typography>

                  <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Graph 
                      type='pie'
                      data={[
                        { name: 'Disponíveis', value: 10, color: '#394255' },
                        { name: 'Ocupados', value: 31, color: '#235BD5' },
                        { name: 'Ausentes', value: 31, color: '#405480' },
                      ]}
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
                      DESEMPENHO FUNCIONÁRIOS
                    </Typography>

                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                      <Graph 
                        type='pie'
                        data={[
                          { name: 'Disponíveis', value: 10, color: '#394255' },
                          { name: 'Ocupados', value: 31, color: '#235BD5' },
                          { name: 'Ausentes', value: 31, color: '#405480' },
                        ]}
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
        </Grid>
        <Footer />
    </>
  );
}

export default DashBoardDiretoria;
