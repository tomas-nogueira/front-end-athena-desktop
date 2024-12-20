import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import FooterNovo from '../Components/Footer';
import HeaderDashboards from '../Components/HeaderDashboards';
import { List, ListItem, ListItemText } from '@mui/material';
import { AuthContext } from '../Context/authProvider';
import { TaskContext } from '../Context/taskProvider';
import ChatForm from '../Components/ChatForm';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/loading';


function DashBoardAluno() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [semesterData, setSemesterData] = useState([]); // Novo estado para os dados de "Semestre Atual x Passado"
  const navigate = useNavigate();

  const { dadosUser } = useContext(AuthContext);
  const [performanceData, setPerformanceData] = useState([]);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA; 

  const { dueSoon, dueSoonContent } = useContext(TaskContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (dadosUser && dadosUser.message) {
      fetchPerformanceData();
      fetchAttendanceData();  
      fetchSemesterData();
    }
 }, [dadosUser]); 

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

    const attendanceRate = data.attendanceRate; 
    const presentCount = attendanceRate;
    const absentCount = 100 - presentCount;

    setAttendanceData([
      { name: 'Presente', value: presentCount, color: '#235BD5' },
      { name: 'Ausente', value: absentCount, color: '#405480' },
    ]);
  } catch (error) {
    console.error('Erro ao buscar dados de presença:', error);
  }
};


  if (!dadosUser || !dadosUser.message) {
    return <Loading/>
  }

  if (!dadosUser.message.role || !dadosUser.message.name) {
    return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
  }

  const fetchPerformanceData = async () => {
    const userId = dadosUser.message._id;
  
    if (!userId) {
      console.error('ID do usuário não encontrado.');
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/stats/proficiency/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados de desempenho');
      }
      const data = await response.json();
  
      if (Array.isArray(data)) { // Verifica se 'data' é um array
        const mappedData = data.map(item => ({
          name: item.name,
          value: item.averageLevel,
          color: '#004FFF'
        }));
        setPerformanceData(mappedData);
      } else {
        console.error('Dados de desempenho não são um array:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados de desempenho:', error);
    }
  };

  const fetchSemesterData = async () => {
    const userId = dadosUser.message._id;

    if (!userId) {
      console.error('ID do usuário não encontrado.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/stats/semester/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados de semestre');
      }

      const data = await response.json();

      const formattedData = [
        {
            name: 'Semestre Atual',
            categories: data.map(item => item.category), // Matérias como categorias
            values: data.map(item => item.currentPercentage),
            color: '#235BD5'
        },
        {
            name: 'Semestre Passado',
            categories: data.map(item => item.category), // Matérias como categorias
            values: data.map(item => item.pastPercentage),
            color: '#405480'
        }
    ];

      setSemesterData(formattedData);
    } catch (error) {
      console.error('Erro ao buscar dados de semestre:', error);
    }
  };

  
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
              {performanceData.length > 0 ? (
                <Graph type='bar' data={performanceData} />
              ) : (
                <Typography variant="h6" align="center">Nenhum dado disponível.</Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
            <Typography
              sx={{
                textAlign: 'center',
                borderBottom: '3px solid #004FFF',
                fontWeight: 'bold',
                width: '75%',
                margin: '0 auto',
                padding: '8px 0',
                fontSize: 25,
                color: '#394255'
              }}
            >
              DESEMPENHO SEMESTRE ATUAL X PASSADO
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {semesterData.length > 0 ? (
                <Graph type='stackedLine' data={semesterData} />
              ) : (
                <Typography variant="h6" align="center">Nenhum dado disponível.</Typography>
              )}
            </Box>
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
              SUA FREQUÊNCIA
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Graph type='pie' data={attendanceData.length ? attendanceData : [{ name: 'Presente', value: 0 }, { name: 'Ausente', value: 0 }]} />

            </Box>
          </Grid>
          <Grid item xs={12} sm={5} sx={{ backgroundColor: 'white', borderRadius: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Alinha verticalmente os itens
              justifyContent: 'center', // Centraliza horizontalmente
              borderBottom: '3px solid #004FFF',
              width: '100%',
              margin: '0 auto',
              padding: '10px 0',
            }}
          >
            <Typography
              sx={{
                color: '#394255',
                fontWeight: 'bold',
                fontSize: 25,
                marginRight: '8px', // Adiciona espaço entre os textos
              }}
            >
              TAREFAS PARA OS PRÓXIMOS DOIS DIAS
            </Typography>
            <Typography
              sx={{
                backgroundColor: 'red',
                color: 'white', // Para contraste
                fontWeight: 'bold',
                padding: '4px 8px', // Adiciona um pouco de padding para o fundo vermelho
                borderRadius: '4px', // Opcional: arredonda os cantos
              }}
            >
              {dueSoon}
            </Typography>
          </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1rem',
                maxHeight: '400px',
                overflowY: 'auto', 
                paddingBottom: '2rem',
              }}
            >
              {dueSoonContent && dueSoonContent.length > 0 ? (
                <List
                  sx={{
                    width: '95%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem',
                    padding: 0,
                  }}
                >
                  {dueSoonContent.map((activity, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2,
                        padding: '10px',
                        boxShadow: 1,
                        position: 'relative',
                        transition: 'transform 0.3s ease',  // Adiciona uma transição suave para o efeito
                        '&:last-child': {
                          marginBottom: 0,
                        },
                        cursor: 'pointer',  // Altera o cursor para indicar que é clicável
                        '&:hover': {
                          transform: 'scale(1.05)',  // Aumenta o tamanho do item ao passar o mouse
                          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',  // Aumenta a sombra para destacar o item
                        }
                      }}
                      onClick={() => navigate(`/tarefa/${activity._id}`)}
                      >
                      <ListItemText primary={activity.subject} secondary={`Professor: ${activity.teacherName}`} />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '3px',
                          backgroundColor: 'red',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="h6" sx={{ color: '#555', textAlign: 'center', fontWeight: 'bolder' }}>
                  Você não possui tarefas para os próximos 2 dias
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
      <ChatForm userId={dadosUser.message._id} userType={dadosUser.message.role}/>

      <FooterNovo />
    </>
  );
}

export default DashBoardAluno;
