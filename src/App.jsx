import Banner from './Components/Banner';
import Header from './Components/Header'
import Style from './Styles/App.module.css'
import Texto from './Components/Texto'
import Footer from './Components/Footer'
import CardHome from './Components/CardHome'
import { Container } from '@mui/material';
import RoboImg from './Photos/roboimg.png'
import InovacaoImg from './Photos/InovacaoImg.png'
import CelualarImg from './Photos/celularimg.png'

function App() {  
  return (
    <div className={Style.container}>
      <header className="App-header">
        <Header textBar1="Login" textBar2="Cadastro" textBar3="Nossos produtos"/>
      </header>
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
    </div>
  );
}

export default App;
