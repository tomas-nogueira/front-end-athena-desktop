import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import HeaderDashboards from '../Components/HeaderDashboards';
import Card from '../Components/Card';
import { Grid } from '@mui/material';

function DashBoardEscola() {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8080/school/data", {
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

  return (
    <>
      <Header />
      <HeaderDashboards role='INSTITUIÇÃO' name={schoolData.message.name} institution='CONTA ADMINISTRATIVA' />
      <Grid item xs={12} sm={6} display='flex' alignItems='center' justifyContent='center' gap='3rem'>
        <Card title='Adicionar classes' description='Adicione as classes de sua escola' button1Text='ADICIONAR' button1Route='/cadastro/classe' />
        <Card title='Solicitações pendentes' description='Visualize suas solicitações pendentes' button1Text='Visualizar' />
      </Grid>
    </>
  );
}

export default DashBoardEscola;
