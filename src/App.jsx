import Banner from './Components/Banner';
import Header from './Components/Header'
import Style from './Styles/App.module.css'
import Texto from './Components/Texto'
import Footer from './Components/Footer'
import CardHome from './Components/CardHome'
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import RoboImg from './Photos/roboimg.png'
import InovacaoImg from './Photos/InovacaoImg.png'
import CelualarImg from './Photos/celularimg.png'
import { useState } from 'react';

function App() {  

  const [openInstructions, setOpenInstructions] = useState(false);

  const handleOpenInstructions = () => {
    setOpenInstructions(true);
  };

  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  };

  return (
    <div className={Style.container}>
        <Header textBar1="Login" 
        textBar2="Instruções" 
        onTextBar2Click={handleOpenInstructions}
        />
      <div className={Style.boxmid}>
        <Banner/>
          <div className={Style.boxlow}>
          <Texto/>
          <p className={Style.lowtext}>um pouco sobre a athena...</p>
          <Container className={Style.boxcard}>
            <CardHome word="Inovação" imageSrc={InovacaoImg} wordType="Ferramentas da Athena" definition="Com feedbacks palpáveis, seu resultado aqui é garantido"/>
            <CardHome word="I•A" imageSrc={RoboImg} wordType="Inteligência artificial" definition="Com os recursos da AWS, te aproximamos do futuro da educação."/>
            <CardHome word="Chamada" imageSrc={CelualarImg} definition="Faça chamadas com reconhecimento facial e garanta a segurança da sua escola"/>
          </Container>
        </div>
      </div>
      <Footer/>
      <Dialog open={openInstructions} onClose={handleCloseInstructions}>
        <DialogTitle>Instruções</DialogTitle>
        <DialogContent>
          <p>Aqui você encontrará informações para uma experência completa do protótipo ATHENA.</p>
          <ul>
            <li>Para navegar como conta administrativa, utilize como usuário: Mary | senha: 123.</li>
            <li>Para navegar como conta estudantil, adote, usuário: tomas | senha: 123.</li>
            <li>Utilize as ferramentas de inteligência artificial para aprimorar seu aprendizado.</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInstructions}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
