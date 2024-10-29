import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import Footer from '../Components/Footer';
import HeaderDashboards from '../Components/HeaderDashboards';
import { AuthContext } from '../Context/authProvider';

function DashBoardDiretoria() {
  const { dadosUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (dadosUser) {
      setLoading(false);
      if (!dadosUser.message.role || !dadosUser.message.name) {
        setError(true);
      }
    }
    window.scrollTo(0, 0);
  }, [dadosUser]);

  if (loading) {
    return <Typography variant="h5" align="center">Carregando...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
  }

  return (
    <>
      <Header textBar2="Recados" textBar1="home" />
      <HeaderDashboards role={dadosUser.message.role} name={dadosUser.message.name} institution='SESI-337' />
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
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

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
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

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
          {/* Additional Graphs can go here */}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashBoardDiretoria;
