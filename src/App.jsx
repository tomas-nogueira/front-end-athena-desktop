import Banner from './Components/Banner';
import Header from './Components/Header'
import Style from './Styles/App.module.css'
import Texto from './Components/Texto'

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
          <p>Conheça nossos colaboradores</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
