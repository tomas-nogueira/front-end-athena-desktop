import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import HeaderDashboards from '../Components/HeaderDashboards';
import { Grid, Typography } from '@mui/material';
import Card from '../Components/Card';
import { Card as AntCard, notification } from 'antd'; 
import CircularProgress from '@mui/material/CircularProgress';
import Imagem from '../Photos/back-class.jpg';
import Imagem2 from '../Photos/back-solicit.jpg';
import { Alert } from 'antd';
import { AuthContext } from '../Context/authProvider';
import Footer from '../Components/Footer';
import Graph from '../Components/Graph'; 
import { CheckCircle, Warning, ErrorOutline } from '@mui/icons-material';
import Loading from '../Components/loading';

function DashBoardEscola() {
  const { dadosSchool } = useContext(AuthContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA; 
  const [overallAttendanceRate, setOverallAttendanceRate] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (dadosSchool && dadosSchool.message) {
      fetchAttendanceData();
    }

        const notificationTimeout = setTimeout(() => {
          notification.open({
            message: 'Atualizando Dados',
            description: 'Estamos atualizando seus dados com base no uso do sistema de IA.',
            duration: 5, 
          });
        }, 3000); 
    
        return () => clearTimeout(notificationTimeout);
  }, [dadosSchool]);

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`${apiUrl}/attendance/school/${dadosSchool.message._id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados de presença');
      }
      const { attendanceData, overallAttendanceRate } = await response.json();

      setAttendanceData(attendanceData);
      setOverallAttendanceRate(overallAttendanceRate); // Armazenar a taxa de presença geral
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const determineProgressColor = (rate) => {
    if (rate < 50) return 'red';
    if (rate < 60) return 'orange';
    if (rate <= 70) return 'yellow';
    return 'green';
  };

  const getStatusIcon = (rate) => {
    if (rate < 60) return <ErrorOutline sx={{ color: 'red', fontSize: 40 }} />;
    if (rate <= 70) return <Warning sx={{ color: 'orange', fontSize: 40 }} />;
    return <CheckCircle sx={{ color: 'green', fontSize: 40 }} />;
  };

  const getStatusMessage = (rate) => {
    if (rate < 60) return "A presença está abaixo do ideal. É preciso tomar ações para aumentá-la.";
    return "Boa presença! Continue assim.";
  };

  if (!dadosSchool || !dadosSchool.message) {
    return <><Loading /></>;
  }

  if (!dadosSchool.message._id || !dadosSchool.message.name) {
    return <Typography variant="h6" align="center">Erro: {error}</Typography>;
  }

  return (
    <>
      <Header textBar1="Dashboard de Presença" textBar2="Recados" />
      <HeaderDashboards role={dadosSchool.message.role} name={dadosSchool.message.name} institution='CONTA ADMINISTRATIVA' />

      {loading && <Typography>Carregando dados de presença...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h4">Presença de Alunos</Typography>
      </Grid>

      <Grid container sx={{ marginTop: '1rem' }} spacing={1} display="flex" justifyContent="center" alignItems="center"> {/* Ajuste o marginTop e spacing aqui */}
        <Grid item xs={6} sm={3} display="flex" justifyContent="center" alignItems="center">
          <AntCard
            title="Taxa de Presença Geral"
            bordered={true}
            style={{
              width: '20rem',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                {getStatusIcon(overallAttendanceRate)}
              </Grid>
              <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
                <CircularProgress
                  variant="determinate"
                  value={overallAttendanceRate}
                  size={100}
                  sx={{
                    color: determineProgressColor(overallAttendanceRate),
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5rem'
                  }}
                >
                  {overallAttendanceRate.toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">{getStatusMessage(overallAttendanceRate)}</Typography>
              </Grid>
              <Grid item sx={{ width: '100%', borderTop: '1px solid #f0f0f0', marginTop: '1rem', paddingTop: '1rem' }}>
                <Typography variant="caption" align="center">Insight tirado do gráfico.</Typography>
              </Grid>
            </Grid>
          </AntCard>
        </Grid>

        <Grid item xs={6} sm={3} display="flex" justifyContent="center" alignItems="center"> 
          <Graph
            data={attendanceData.map(item => ({
              name: item.className,
              value: item.attendanceRate.toFixed(2),
              color: determineProgressColor(item.attendanceRate)
            }))}
            type="bar"
            style={{ width: '100%' }} 
          />
        </Grid>
      </Grid>


      <Grid item xs={12} sm={6} display='flex' alignItems='center' justifyContent='center' gap='2rem' flexDirection='column' sx={{ marginTop: '2rem' }}>
        <Grid>
          <Typography variant="h5">PRINCIPAIS ATIVIDADES</Typography>
        </Grid>
        <Grid sx={{ display: 'flex', gap: '2rem' }}>
          <Card title='Adicionar classes' description='Adicione as classes de sua escola' button1Text='ADICIONAR' button1Route='/cadastro/classe' image={Imagem} />
          <Card title='Solicitações pendentes' description='Visualize suas solicitações pendentes' button1Text='Visualizar' button1Route='/reqpendentes/escola' image={Imagem2} />
        </Grid>

        <Footer />
      </Grid>
    </>
  );
}

export default DashBoardEscola;
