import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HeaderDashboards from '../Components/HeaderDashboards';
import Graph from '../Components/Graph';
import { AuthContext } from '../Context/authProvider';
import ChatForm from '../Components/ChatForm';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function PresencaEscola() {
  const { dadosUser } = useContext(AuthContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const apiUrl = process.env.BASE_URL_ATHENA; 

  const fetchAttendanceData = async () => {
    const userId = dadosUser.message._id;

    if (!userId) {
      console.error('ID do usuário não encontrado.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/attendance/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados de presença');
      }
      const data = await response.json();
      const mappedData = data.map(item => ({
        name: new Date(item.date).toLocaleString('default', { month: 'long' }), // Nome do mês
        value: item.status === 'present' ? 1 : 0, // 1 para presença, 0 para ausência
        color: item.status === 'present' ? '#004FFF' : '#FF0000'
      }));

      setAttendanceData(mappedData);
    } catch (error) {
      console.error('Erro ao buscar dados de presença:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (dadosUser && dadosUser.message) {
      fetchAttendanceData();
    }
  }, [dadosUser]);

  if (!dadosUser || !dadosUser.message) {
    return <Typography variant="h5" align="center">Carregando...</Typography>;
  }

  if (!dadosUser.message.role || !dadosUser.message.name) {
    return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
  }

  return (
    <section>
        <Header textBar1="hoME"/>
      <HeaderDashboards role={dadosUser.message.role} name={dadosUser.message.name} institution="SESI 337" />
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
            <Typography
              sx={{
                textAlign: 'center',
                borderBottom: '3px solid #004FFF',
                fontWeight: 'bold',
                width: '35%',
                margin: '0 auto',
                padding: '8px 0',
                fontSize: 25,
                color: '#394255'
              }}
            >
              PRESENÇA MENSAL
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {attendanceData.length > 0 ? (
                <Graph type="bar" data={attendanceData} labels={attendanceData.map(item => item.name)} />
              ) : (
                <Typography variant="h6" align="center">Nenhum dado de presença disponível.</Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
            <Typography
              sx={{
                textAlign: 'center',
                borderBottom: '3px solid #004FFF',
                fontWeight: 'bold',
                width: '60%',
                margin: '0 auto',
                padding: '8px 0',
                fontSize: 25,
                color: '#394255'
              }}
            >
              FREQUÊNCIA NO SEMESTRE
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Graph
                type="stackedLine"
                data={[
                  { name: 'Presente', values: [75, 82, 95, 91, 87, 85, 81, 84, 90, 73, 79], color: '#235BD5' },
                  { name: 'Ausente', values: [25, 18, 5, 9, 13, 15, 19, 16, 10, 27, 21], color: '#FF0000' },
                ]}
                labels={attendanceData.map(item => item.name)} // Rótulos dos meses
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
            <Typography
              sx={{
                textAlign: 'center',
                borderBottom: '3px solid #004FFF',
                fontWeight: 'bold',
                width: '30%',
                margin: '0 auto',
                padding: '8px 0',
                fontSize: 25,
                color: '#394255'
              }}
            >
              RESUMO DE FREQUÊNCIA
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Graph
                type="pie"
                data={[
                  { name: 'Presente', value: 90, color: '#235BD5' },
                  { name: 'Ausente', value: 10, color: '#FF0000' },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <ChatForm />
      <Footer/>
    </section>
  );
}

export default PresencaEscola;
