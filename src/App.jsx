import React, { useState, useEffect } from 'react';
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import Banner from './Components/Banner';
import Header from './Components/Header';
import Style from './Styles/App.module.css';
import Texto from './Components/Texto';
import Footer from './Components/Footer';
import CardHome from './Components/CardHome';
import RoboImg from './Photos/roboimg.png';
import InovacaoImg from './Photos/InovacaoImg.png';
import CelualarImg from './Photos/celularimg.png';
import { useNavigate } from "react-router-dom";

function App() {
  const [openInstructions, setOpenInstructions] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      if (role === "estudante") {
        navigate("/home/aluno");
      } else if (role === "professor") {
        navigate("/home/professor");
      } else if (role === "diretor" || role === "coordenador") {
        navigate("/dashboard/diretoria");
      } else if (
        role === "inspetor" ||
        role === "limpeza" ||
        role === "cozinha"
      ) {
        navigate("/dashboard/funcionarios");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const hasDownloadedInstructions = localStorage.getItem("hasDownloadedInstructions");
    if (!hasDownloadedInstructions) {
      setOpenInstructions(true);
    }
  }, []);

  const handleDownloadInstructions = () => {
    // Cria o link de download e ativa o download do PDF
    const link = document.createElement('a');
    link.href = '/instrucoes.pdf';
    link.download = 'instrucoes.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Armazena no localStorage que o usuário já baixou o manual
    localStorage.setItem("hasDownloadedInstructions", "true");
    setOpenInstructions(false);
  };

  const handleCloseInstructions = () => {
    // Impede o fechamento do popup enquanto o arquivo não é baixado
    const hasDownloadedInstructions = localStorage.getItem("hasDownloadedInstructions");
    if (hasDownloadedInstructions) {
      setOpenInstructions(false);
    }
  };

  return (
    <div className={Style.container}>
      <Header
        textBar1="Instruções" textBar2="Login"
        onTextBar2Click={() => setOpenInstructions(true)}
      />
      <div className={Style.boxmid}>
        <Banner />
        <div className={Style.boxlow}>
          <Texto />
          <p className={Style.lowtext}>um pouco sobre a athena...</p>
          <Container className={Style.boxcard}>
            <Grid
              container
              spacing={2}
              direction={{ xs: 'column', sm: 'column', md: 'row' }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={6} md={4}>
                <CardHome
                  word="Inovação"
                  imageSrc={InovacaoImg}
                  wordType="Ferramentas da Athena"
                  definition="Com feedbacks palpáveis, seu resultado aqui é garantido"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardHome
                  word="I•A"
                  imageSrc={RoboImg}
                  wordType="Inteligência artificial"
                  definition="Com os recursos da AWS, te aproximamos do futuro da educação."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardHome
                  word="Chamada"
                  imageSrc={CelualarImg}
                  definition="Faça chamadas com reconhecimento facial e garanta a segurança da sua escola"
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Footer />

      {/* Popup de Instruções */}
      <Dialog open={openInstructions} onClose={handleCloseInstructions}>
        <DialogTitle>Bem-vindo ao Protótipo ATHENA!</DialogTitle>
        <DialogContent>
          <p>Seja bem-vindo! Estamos muito contentes que você esteja participando dessa experiência.</p>
          <p>
            Ao final, pedimos que avalie nosso protótipo clicando na opção "Feedback" no menu.
          </p>
          <p>
            Para começar, baixe o manual de instruções para entender como usar todas as funcionalidades.
          </p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleDownloadInstructions}>
            Baixar Manual de Instruções
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
