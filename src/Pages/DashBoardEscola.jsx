import React from 'react'
import Header from '../Components/Header'
import HeaderDashboards from '../Components/HeaderDashboards'
import Card from '../Components/Card'
import {Grid,} from '@mui/material'

function DashBoardEscola() {
  return (
    <>
        <Header/>
        <HeaderDashboards role='INSTITUIÇÃO' name='SESI 337' institution='CONTA ADMINISTRATIVA'/>
        <Grid item xs={12} sm={6} display='flex' alignItems='center' justifyContent='center' gap='3rem'>
            <Card title='Adicionar classes' description='Adicione as classes de sua escola' button1Text='ADICIONAR' button1Route='/cadastro/classe'/>
            <Card title='Solicitações pendentes' description='Visualize suas solicitações pendentes' button1Text='Visualizar'/>
        </Grid>
    </>
  )
}

export default DashBoardEscola
