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


function DashBoardAluno() {
  const { dadosUser } = useContext(AuthContext);
  const [performanceData, setPerformanceData] = useState([]);

  const { dueSoon, dueSoonContent } = useContext(TaskContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (dadosUser && dadosUser.message) {
      fetchPerformanceData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dadosUser]); 

  if (!dadosUser || !dadosUser.message) {
    return <Typography variant="h5" align="center">Carregando...</Typography>;
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
      const response = await fetch(`http://localhost:3030/stats/proficiency/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados de desempenho');
      }
      const data = await response.json();
      const mappedData = data.map(item => ({
        name: item.name, 
        value: item.averageLevel, 
        color: '#004FFF'
      }));


      setPerformanceData(mappedData);
    } catch (error) {
      console.error('Erro ao buscar dados de desempenho:', error);
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Alinha verticalmente os itens
              justifyContent: 'center', // Centraliza horizontalmente
              borderBottom: '3px solid #004FFF',
              width: '70%',
              margin: '0 auto',
              padding: '8px 0',
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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
            <List sx={{ width: '100%', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {dueSoonContent.slice(0, 4).map((activity, index) => (
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
                  <ListItemText primary={activity.subject} secondary={`Professor: ${activity.teacherName}`} />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      backgroundColor: 'red'
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
      <ChatForm />

      <FooterNovo />
    </>
  );
}

export default DashBoardAluno;
