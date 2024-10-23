import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import FooterNovo from '../Components/Footer';
import HeaderDashboards from '../Components/HeaderDashboards';
import { List, ListItem, ListItemText } from '@mui/material';
import { AuthContext } from '../Context/authProvider';



function DashBoardAluno() {
  const { dadosUser } = useContext(AuthContext);

  const activities = [
    { text: 'Análise Combinatória - Professora Letícia' },
    { text: 'Exercícios Mecânica - Professor William' },
    { text: 'Prova de Isomeria - Professor Dexter' },
    { text: 'Prova de Transgenia - Professora Aline' },
    { text: 'Exercícios de Orogenia - Professora Marina' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Verificando se existe os dados do usuário
  if (!dadosUser || !dadosUser.message) {
    return <Typography variant="h5" align="center">Carregando...</Typography>;
  }

  // Se dadosUser.message existir, mas algumas propriedades específicas faltarem
  if (!dadosUser.message.role || !dadosUser.message.name) {
    return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
  }


  return (
    <>
      <Header textBar2='Tarefas' textBar1="HOME"/>
      <HeaderDashboards role={dadosUser.message.role} name={dadosUser.message.name} institution="SESI 337" />

      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
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
            >
              SEU DESEMPENHO
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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

          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
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
            >
              SEMESTRE ATUAL X PASSADO
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Graph
                type='stackedLine'
                data={[
                  { name: 'Presente', values: [120, 132, 101, 134, 90, 230, 210], color: '#235BD5' },
                  { name: 'Ausente', values: [220, 182, 191, 234, 290, 330, 310], color: '#405480' },
                ]}
              />
            </Box>
          </Grid>

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
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
            >
              SUA FREQUÊNCIA
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Graph
                type='pie'
                data={[
                  { name: 'Presente', value: 90, color: '#235BD5' },
                  { name: 'Ausente', value: 10, color: '#405480' },
                ]}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
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
            >
              TAREFAS PARA OS PRÓXIMOS DOIS DIAS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
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
                        backgroundColor: '#4caf50'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
      <FooterNovo />
    </>
  );
}

export default DashBoardAluno;
