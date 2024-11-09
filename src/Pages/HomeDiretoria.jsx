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
import AssisthenaInfo from '../Components/AssisthenaInfo';

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
          <AssisthenaInfo />

          <Container
            sx={{
              marginBottom: '5rem',
              height: '50vh',
              width: '100vw',
              backgroundColor: '#394255',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '@media (max-width: 1440px)': {
                height: '55vh',
              },
              '@media (max-width: 1280px)': {
                height: '60vh',
              },
              '@media (max-width: 768px)': {
                height: 'auto',
              },
            }}
          >
            <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
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
                  textAlign: 'center', // centraliza o texto em todas as resoluções
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
                    padding: '1rem',
                    '@media (max-width: 1440px)': {
                      width: '50vw',
                    },
                    '@media (max-width: 1280px)': {
                      width: '60vw',
                    },
                    '@media (max-width: 768px)': {
                      width: '80vw',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      '@media (max-width: 1440px)': {
                        fontSize: '2rem',
                      },
                      '@media (max-width: 1280px)': {
                        fontSize: '1.8rem',
                      },
                      '@media (max-width: 768px)': {
                        fontSize: '1.3rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '1rem',
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
                      '@media (max-width: 1440px)': {
                        fontSize: '1.2rem',
                      },
                      '@media (max-width: 1280px)': {
                        fontSize: '1.1rem',
                      },
                      '@media (max-width: 768px)': {
                        fontSize: '1rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.9rem',
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
            <img src={Linha} className={Style.linhaImg} />
            <CardsAcesso
              texto1="Recados"
              texto2="Envie recados para as salas de aula!"
              rotaBotao="/aviso"
              imagemSrc={Ipad2}
              imagemAlt="Imagem de exemplo"
            />
            <img src={Linha} className={Style.linhaImg} />
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
