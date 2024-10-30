import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import HeaderDashboards from '../Components/HeaderDashboards';
import Card from '../Components/Card';
import { Grid } from '@mui/material';
import Imagem from '../Photos/back-class.jpg'
import Imagem2 from '../Photos/back-solicit.jpg'
import { Typography } from 'antd';
import { AuthContext } from '../Context/authProvider';
import Footer from '../Components/Footer';

function DashBoardEscola() {
  const { dadosSchool } = useContext(AuthContext);

  //Verificando se existe os dados do usuário
  if (!dadosSchool || !dadosSchool.message) {
    return <Typography variant="h5" align="center">Carregando...</Typography>;
  }

  // Se dadosUser.message existir, mas algumas propriedades específicas faltarem
  if (!dadosSchool.message.cnpj || !dadosSchool.message.name) {
    return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
  }

  const { Title } = Typography;


  return (
    <>
      <Header textBar1="Dashboard de Presença"/>
      <HeaderDashboards role={dadosSchool.message.role} name={dadosSchool.message.name} institution='CONTA ADMINISTRATIVA' />
      <Grid item xs={12} sm={6} display='flex' alignItems='center' justifyContent='center' gap='2rem' flexDirection='column' sx={{marginTop: '2rem'}}>
        <Grid>
          <Title>PRINCIPAIS ATIVIDADES</Title>
        </Grid>
        <Grid sx={{ display: 'flex', gap:'2rem'}}>
          <Card title='Adicionar classes' description='Adicione as classes de sua escola' button1Text='ADICIONAR' button1Route='/cadastro/classe' image={Imagem}/>
          <Card title='Solicitações pendentes' description='Visualize suas solicitações pendentes' button1Text='Visualizar' button1Route='/reqpendentes/escola' image={Imagem2}/>
        </Grid>
        <Footer/>
      </Grid>
    </>
  );
}

export default DashBoardEscola;
