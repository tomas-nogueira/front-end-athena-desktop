import React from 'react'
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import Texto from '../Components/Texto';
import Footer from '../Components/Footer';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Estudante from '../Photos/estudante.png'
import Style from '../Styles/HomeProfessor.module.css'
import Down from '../Photos/doubledown.png'
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CardsAcesso from '../Components/CardsAcesso';
import Macbook from '../Photos/macbook.png'
import Linha from '../Photos/linha.png'
import Ipad from '../Photos/ipad.png'

function HomeAluno() {
  return (
    <div>
        <Grid>
            <Header textBar1="dashboard" textBar2="Minhas tarefas"/> 
            <Grid sx={{ marginTop: '5rem' }}>
                <Banner />
                    <Grid sx={{
                        marginTop: '3rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '2rem', 
                        }}>
                        <Texto />
          
          <Container sx={{display: 'flex', justifyContent: 'center', width: '100vw', marginBottom: '3rem' }}>
            <Grid sx={{backgroundColor: '#BCC7CF', width: '80vw', height: '6.5rem', borderRadius: '10px', padding: '1rem'}}>
              <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#235BD5' }}>
                  NOVIDADE!
                </Typography>
              </Grid>
              <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>A Assisthena é projetada com IA para te ajudar na didática</Typography>
                <Button variant="contained">SAIBA MAIS</Button>
              </Grid>
            </Grid>
          </Container>
          
          <Container sx={{
            marginBottom: '5rem', 
            height: '50vh', 
            width: '100vw', 
            backgroundColor: '#394255', 
            borderRadius: '10px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box>
                    <img src={Estudante} className={Style.img}/>
                </Box>
                <Grid sx={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
                    <Grid sx={{backgroundColor: '#235BD5', borderRadius: '10px', justifyContent: 'center', display: 'flex', width: '40vw', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{color: 'white', fontSize: '2.5rem', fontWeight: 'bold'}}>BEM-VINDO AO PORTAL ATHENA! <WavingHandIcon className={Style.hand}/></Typography>
                    </Grid>
                    <Grid>
                        <Typography sx={{color: 'white', fontSize: '1.3rem'}}>ABAIXO VOCÊ TERÁ ACESSO AOS RECURSOS DO NOSSO PORTAL</Typography>
                    </Grid>
                    <Grid>
                        <img src={Down} className={Style.img2}/>
                    </Grid>
                </Grid>
            </Grid>
          </Container>

          <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem', flexDirection: 'column', gap: '3rem'}}>
          <CardsAcesso 
            texto1="Minha dashboard"
            texto2="Acesse sua dashboard e veja seus dados"
            rotaBotao="/dashboard/aluno"
            imagemSrc={Macbook}
            imagemAlt="Imagem de exemplo"
            />
            <img src={Linha}/>
            <CardsAcesso 
            texto1="Minhas tarefas"
            texto2="Visualize suas tarefas e realize-as!"
            rotaBotao="/dashboard/tarefas/aluno"
            imagemSrc={Ipad}
            imagemAlt="Imagem de exemplo"
            />
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
    </div>
  )
}

export default HomeAluno
