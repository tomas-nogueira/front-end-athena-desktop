import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import Texto from '../Components/Texto';
import Footer from '../Components/Footer';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Estudante from '../Photos/estudante.png';
import Style from '../Styles/HomeProfessor.module.css';
import Down from '../Photos/doubledown.png';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CardsAcesso from '../Components/CardsAcesso';
import Macbook from '../Photos/macbook.png';
import Linha from '../Photos/linha.png';
import Ipad2 from '../Photos/Ipad2.png';
import Face from '../Photos/face.png';

function HomeDiretoria() {
  const [studentCount, setStudentCount] = useState(0);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA;

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch(`${apiUrl}/student-count`);
        if (response.ok) {
          const data = await response.json();
          const count = data.studentCount;
          setStudentCount(count);
          sessionStorage.setItem('studentCount', count);
        } else {
          console.error("Falha ao buscar o número de alunos");
        }
      } catch (error) {
        console.error("Erro ao buscar o número de alunos:", error);
      }
    };

    const storedCount = sessionStorage.getItem('studentCount');
    if (storedCount) {
      setStudentCount(Number(storedCount)); // Define a contagem do sessionStorage
    } else {
      fetchStudentCount(); // Se não houver contagem armazenada, busca na API
    }

    // Configura a notificação para aparecer após alguns segundos
    const timer = setTimeout(() => {
      notification.open({
        message: 'Dados Atualizados',
        description: `Hoje temos ${studentCount} alunos presentes na escola.`,
        duration: 5,
      });
    }, 3000);

    return () => clearTimeout(timer); // Limpeza do timer ao desmontar o componente
  }, [apiUrl, studentCount]);

  return (
    <Grid>
      <Header textBar1="DashBOARD" textBar2="Recados" />
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
          <Container sx={{ display: 'flex', justifyContent: 'center', width: '100vw', marginBottom: '3rem' }}>
            <Grid sx={{ backgroundColor: '#BCC7CF', width: '80vw', height: '6.5rem', borderRadius: '10px', padding: '1rem' }}>
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
          <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem', flexDirection: 'column', gap: '3rem' }}>
            <CardsAcesso
              texto1="Minha dashboard"
              texto2="Acesse sua dashboard e veja seus dados"
              rotaBotao="/dashboard/diretoria"
              imagemSrc={Macbook}
              imagemAlt="Imagem de exemplo"
            />
            <img src={Linha} />
            <CardsAcesso
              texto1="Recados"
              texto2="Envie recados para as salas de aula!"
              rotaBotao="/aviso"
              imagemSrc={Ipad2}
              imagemAlt="Imagem de exemplo"
            />
            <img src={Linha} />
            <CardsAcesso
              texto1="Reconhecimento facial"
              texto2="Eleve seu desempenho com o nosso Reconhecimento Facial"
              rotaBotao="/cadastrar-face/user"
              imagemSrc={Face}
              imagemAlt="Imagem de exemplo"
            />
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}

export default HomeDiretoria;
