import React, { useContext, useEffect, useState } from 'react'
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import Texto from '../Components/Texto';
import Footer from '../Components/Footer';
import { Box, Button, Container, Grid, IconButton, Modal, Typography } from '@mui/material';
import Estudante from '../Photos/estudante.png'
import Style from '../Styles/HomeProfessor.module.css'
import Down from '../Photos/doubledown.png'
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CardsAcesso from '../Components/CardsAcesso';
import Macbook from '../Photos/macbook.png'
import Linha from '../Photos/linha.png'
import Ipad from '../Photos/ipad.png'
import Face from "../Photos/face.png"
import { AuthContext } from '../Context/authProvider';
import CloseIcon from '@mui/icons-material/Close';
import ChatForm from './ChatForm';


function HomeAluno() {
  const [id, setId] = useState()
  const [role, setRole] = useState()
  const { dadosUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA; 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.message) {
          const { image, _id, role } = data.message;
          setRole(role)
          setId(_id)
          if(!image){
            const timeout = setTimeout(() => {
              setShowModal(true);
            }, 2000);
    
            return () => clearTimeout(timeout);
          }
        } 
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleClose = () => setShowModal(false);


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
           <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                  <img src={Estudante} className={Style.img} />
                </Box>
                <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem', 
                  }}
                >
                  <Grid
                    sx={{
                      backgroundColor: '#235BD5',
                      borderRadius: '10px',
                      justifyContent: 'center',
                      display: 'flex',
                      width: '40vw',
                      maxWidth: '100%',
                      alignItems: 'center',
                      padding: '1rem', // espaçamento interno para evitar quebra de texto
                      '@media (max-width: 768px)': {
                        width: '65vw', // ajuste para tablets e celulares
                      },
                      
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        textAlign: 'center', // centralizar o texto
                        '@media (max-width: 768px)': {
                          fontSize: '1.3rem', 
                        },
                        '@media (max-width: 480px)': {
                          fontSize: '1rem', // diminuir fonte para celulares
                        },
                      }}
                    >
                      BEM-VINDO AO PORTAL ATHENA! <WavingHandIcon className={Style.hand} />
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: '1.3rem',
                        textAlign: 'center',
                        '@media (max-width: 768px)': {
                          fontSize: '1.1rem', // ajuste para tablets
                        },
                        '@media (max-width: 480px)': {
                          fontSize: '1rem', // ajuste para celulares
                        },
                      }}
                    >
                      ABAIXO VOCÊ TERÁ ACESSO AOS RECURSOS DO NOSSO PORTAL
                    </Typography>
                  </Grid>
                  <Grid>
                    <img
                      src={Down}
                      className={Style.img2}
                    />
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
              texto1="Reconhecimento facial"
              texto2="Eleve seu desempenho com o nosso Reconhecimento Facial"
              rotaBotao="/cadastrar-face/user"
              imagemSrc={Face}
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
      {/* Modal para lembrar o usuário de cadastrar seu rosto */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastre seu rosto
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: 'grey.500' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Para aproveitar os benefícios do reconhecimento facial, cadastre seu rosto agora.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => { 
              handleClose(); 
              window.location.href = '/cadastrar-face/user'; 
            }}
          >
            Cadastrar rosto
          </Button>
        </Box>
      </Modal>
      <Footer />
    </Grid>
    <ChatForm />
    </div>
  )
}

export default HomeAluno
