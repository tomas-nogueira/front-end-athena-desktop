import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import HeaderDashboards from '../Components/HeaderDashboards';
import { Grid, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { Card as AntCard, notification } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../Context/authProvider';
import Footer from '../Components/Footer';
import { CheckCircle, Warning, ErrorOutline } from '@mui/icons-material';
import Loading from '../Components/loading';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function PresencaEscola() {
  const { dadosSchool } = useContext(AuthContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA;
  const [overallAttendanceRate, setOverallAttendanceRate] = useState(0);
  const [selectedClass, setSelectedClass] = useState('');

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
      setOverallAttendanceRate(overallAttendanceRate);
      setSelectedClass(attendanceData[0]?.className || '');
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

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  if (!dadosSchool || !dadosSchool.message) {
    return <><Loading /></>;
  }

  if (!dadosSchool.message._id || !dadosSchool.message.name) {
    return <Typography variant="h6" align="center">Erro: {error}</Typography>;
  }

  const filteredAttendanceData = attendanceData.filter(item => item.className === selectedClass);
  const uniqueClasses = Array.from(new Set(attendanceData.map(item => item.className)));
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <>
      <Header textBar1="Painel de Controle" />
      <HeaderDashboards role={dadosSchool.message.role} name={dadosSchool.message.name} institution='CONTA ADMINISTRATIVA' />

      {loading && <Typography>Carregando dados de presença...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h4">Presença de Alunos</Typography>
      </Grid>

      <Grid container sx={{ marginTop: '3rem', marginBottom: '3rem' }} spacing={3} justifyContent="center" alignItems="center">
        
        <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
          <AntCard
            title="Taxa de Presença Geral"
            bordered={true}
            style={{ width: '500px', height: '480px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              alignItems: "center", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center",
              textAlign: "center",
             }}
          >
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
              <Grid item>{getStatusIcon(overallAttendanceRate)}</Grid>
              <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
                <CircularProgress
                  variant="determinate"
                  value={overallAttendanceRate}
                  size={100}
                  sx={{ color: determineProgressColor(overallAttendanceRate) }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5rem',
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

        <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
          <AntCard
            title="Taxa de Presença Mensal por Classe"
            bordered={true}
            style={{ width: '500px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              alignItems: "center", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center",
              textAlign: "center",
             }}
          >
            <FormControl fullWidth>
              <Select
                value={selectedClass}
                onChange={handleClassChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Selecione uma classe' }}
                style={{marginBottom: "20px"}}
              >
                <MenuItem value="">
                  <em>Selecione uma classe</em>
                </MenuItem>
                {uniqueClasses.map((className, index) => (
                  <MenuItem key={index} value={className}>
                    {className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ResponsiveContainer width="100%" height={300} style={{display: "flex", 
            justifyContent: "center", 
              alignContent: "center", 
              paddingRight: "40px",
              marginRight: "40px"
              }}>
              <BarChart data={filteredAttendanceData.map((item) => ({
                name: item.className,
                attendanceRate: parseFloat(item.attendanceRate.toFixed(2)),
              }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${parseFloat(value).toFixed(2)}%`} />
                <Bar dataKey="attendanceRate" fill={colors[0]} />
              </BarChart>
            </ResponsiveContainer>
          </AntCard>
        </Grid>


        <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
          <AntCard
            title="Presença Mensal"
            bordered={true}
            style={{ width: '500px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              height: '480px',
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center",
              textAlign: "center",
             }}
          >
            <ResponsiveContainer width="99%" height={300} style={{ display: "flex", justifyContent: "center", paddingRight: "40px" }}>
              <BarChart data={attendanceData.map(item => ({
                  name: item.className || item.month, // Use className ou month
                  attendanceRate: item.attendanceRate,
                }))}>
                <XAxis dataKey="name" angle={0}  />
                <YAxis />
                <Tooltip formatter={(value) => `${parseFloat(value).toFixed(2)}%`} />
                <Bar dataKey="attendanceRate" fill="#87cefa" />
              </BarChart>
            </ResponsiveContainer>
          </AntCard>
        </Grid>


        <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
          <AntCard
            title="Comparação entre Turmas"
            bordered={true}
            style={{ width: '500px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              height: '480px',
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center",
              textAlign: "center"
             }}
          >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="attendanceRate"
                    outerRadius={110}
                    fill="#82ca9d"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`} // Exibir nome e porcentagem
                    nameKey="className"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${name}: ${parseFloat(value).toFixed(2)}%`]} />
                </PieChart>
              </ResponsiveContainer>

          </AntCard>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default PresencaEscola;
