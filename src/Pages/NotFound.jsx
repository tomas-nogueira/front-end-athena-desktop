import React from 'react'
import { Container } from '@mui/material';
import BackNF from '../Photos/back-notfound.png'
import IMGNF from '../Photos/img-notfound.png'

function NotFound() {
  return (
    <section style={{backgroundImage: `url(${BackNF})`, width: '100%', height: '100vh'}}>
        <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '2rem'}}>
            <img src={IMGNF} style={{width: '650px'}}/>
            <p style={{fontSize: '2rem'}}><p style={{color: '#004FFF'}}>Ops,</p> não encontramos nenhuma página com esse endereço</p>
            <a href='/' style={{position: 'absolute', marginTop: '50rem', marginLeft: '95rem', alignItems: 'flex-end', fontSize: '2rem', color: 'white', textDecoration: 'none'}}>VOLTAR</a>
        </Container>
    </section>
  )
}

export default NotFound
