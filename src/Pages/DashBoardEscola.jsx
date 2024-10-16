import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import HeaderDashboards from '../Components/HeaderDashboards';
import Card from '../Components/Card';
import { Grid } from '@mui/material';
import Imagem from '../Photos/back-class.jpg'
import Imagem2 from '../Photos/back-solicit.jpg'
import { Typography } from 'antd';

function DashBoardEscola() {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:3030/school/data", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((resposta) => resposta.json())
      .then((json) => {
        setSchoolData(json);
        setLoading(false); // Define o carregamento como false após a conclusão
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da escola:", error);
        setLoading(false); // Garante que o carregamento seja definido como false em caso de erro
      });

  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Renderiza o texto de carregamento
  }

  // Verifica se schoolData está disponível
  if (!schoolData) {
    return <div>Erro ao carregar dados da escola.</div>; // Mensagem de erro se os dados não forem carregados
  }

  const { Title } = Typography;


  return (
    <>
      <Header />
      <HeaderDashboards role='INSTITUIÇÃO' name={schoolData.message.name} institution='CONTA ADMINISTRATIVA' />
      <Grid item xs={12} sm={6} display='flex' alignItems='center' justifyContent='center' gap='2rem' flexDirection='column' sx={{marginTop: '2rem'}}>
        <Grid>
          <Title>PRINCIPAIS ATIVIDADES</Title>
        </Grid>
        <Grid sx={{ display: 'flex', gap:'2rem'}}>
          <Card title='Adicionar classes' description='Adicione as classes de sua escola' button1Text='ADICIONAR' button1Route='/cadastro/classe' image={Imagem}/>
          <Card title='Solicitações pendentes' description='Visualize suas solicitações pendentes' button1Text='Visualizar' button1Route='/reqpendentes/escola' image={Imagem2}/>
        </Grid>
      </Grid>
    </>
  );
}

export default DashBoardEscola;
