import React, { useState, useEffect } from 'react';
import Style from '../Styles/Aviso.module.css';
import MicIcon from '@mui/icons-material/Mic';
import Select from '../Components/Select';
import { Box, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useContext } from 'react';
import { AuthContext } from '../Context/authProvider';
import Loading from '../Components/loading';

function AviseClass() {
  const [selectedClass, setSelectedClass] = useState('');
  const [aviso, setAviso] = useState('');
  const [data, setData] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { dadosUser, dadosSchool, cnpjContext } = useContext(AuthContext);
  const role = localStorage.getItem('role');
  
  const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

  // Função para abrir o pop-up que mostra a transcrição ao vivo
  const openTranscriptPopup = () => {
    Swal.fire({
      title: 'Gravando áudio...',
      html: `<div id="transcript-content">${transcript}</div>`,
      showConfirmButton: false,
      width: '600px',
      showCloseButton: true
    });
  };

  // Função para alternar o reconhecimento de voz e abrir o pop-up
  const toggleListening = () => {
    if (isFirefox) {
      Swal.fire({
        icon: 'info',
        title: 'Recurso não suportado',
        text: 'Este navegador não suporta a transcrição de áudio. Por favor, acesse pelo Google Chrome.',
        confirmButtonColor: '#1E9CFA'
      });
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      Swal.close();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
      openTranscriptPopup();
    }
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDateChange = (event) => {
    setData(event.target.value);
  };

  const classOptions = [
    { value: '1ano', label: '1º Ano' },
    { value: '2ano', label: '2º Ano' },
    { value: '3ano', label: '3º Ano' },
    { value: '4ano', label: '4º Ano' },
    { value: '5ano', label: '5º Ano' },
    { value: '6ano', label: '6º Ano' },
    { value: '7ano', label: '7º Ano' },
    { value: '8ano', label: '8º Ano' },
    { value: '9ano', label: '9º Ano' },
    { value: '1medio', label: '1º Médio' },
    { value: '2medio', label: '2º Médio' },
    { value: '3medio', label: '3º Médio' }
  ];

  useEffect(() => {
    if (listening) {
      const transcriptElement = document.getElementById('transcript-content');
      if (transcriptElement) {
        transcriptElement.innerText = transcript;
      }
    }
    setAviso(transcript);
  }, [transcript, listening]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function EnviarMensagem() {
    if (!aviso || !selectedClass || !data) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios faltando!',
        text: 'Por favor, preencha todos os campos antes de enviar.',
        confirmButtonColor: '#1E9CFA'
      });
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Aviso enviado!',
        text: 'Detectamos que você não possui uma alexa vinculada com o nosso sistema! Por isso o aviso foi salvo apenas no banco de dados.',
        confirmButtonColor: '#1E9CFA'
      });

      setAviso('');
      setSelectedClass('');
      setData('');
    }
  }

  const visualizarAviso = () => {
    if (!aviso) {
      Swal.fire({
        icon: 'info',
        title: 'Nenhum aviso inserido',
        text: 'O campo de aviso está vazio.',
        confirmButtonColor: '#1E9CFA'
      });
    } else {
      Swal.fire({
        title: 'Texto completo do aviso',
        text: aviso,
        confirmButtonColor: '#1E9CFA',
        width: '600px'
      });
    }
  };

  if (role === "diretor") {
    return (
      <div>
        <Header textBar1="DashBOARD" />
        <div className={Style.recado}>
          <h3>Envie recados para a Athena</h3>
          <button className={Style.but} onClick={toggleListening}>
            <MicIcon className={Style.icone} sx={{ fontSize: 60 }} />
          </button>
          {listening ? <p>Gravando...</p> : <p>Clique no microfone para começar a gravar</p>}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5 }}>
            <Select
              label="Selecione a sala"
              menuItems={classOptions}
              value={selectedClass}
              onChange={handleClassChange}
              sx={{ width: 100 }}
            />
          </Box>
          <input
            type="date"
            className={Style.dataInput}
            value={data}
            onChange={handleDateChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <TextField
              label="Digite o seu aviso"
              variant="outlined"
              type="text"
              value={aviso}
              onChange={(e) => setAviso(e.target.value)}
              sx={{ width: '600px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={visualizarAviso} sx={{ backgroundColor: '#1E9CFA' }}>
              Visualizar aviso completo
            </Button>
          </Box>
          <button className={Style.enviar} onClick={EnviarMensagem}>Enviar Aviso</button>
        </div>
        <Footer />
      </div>
    )
  }

  if (!dadosSchool || !dadosUser) {
    return <Loading />
  }

  if (role === "admin") {
    return (
      <div>
        <Header textBar1="Painel de Controle" />
        <div className={Style.recado}>
          <h3>Envie recados para a Athena</h3>
          <button className={Style.but} onClick={toggleListening}>
            <MicIcon className={Style.icone} sx={{ fontSize: 60 }} />
          </button>
          {listening ? <p>Gravando...</p> : <p>Clique no microfone para começar a gravar</p>}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5 }}>
            <Select
              label="Selecione a sala"
              menuItems={classOptions}
              value={selectedClass}
              onChange={handleClassChange}
              sx={{ width: 100 }}
            />
          </Box>
          <input
            type="date"
            className={Style.dataInput}
            value={data}
            onChange={handleDateChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <TextField
              label="Digite o seu aviso"
              variant="outlined"
              type="text"
              value={aviso}
              onChange={(e) => setAviso(e.target.value)}
              sx={{ width: '600px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={visualizarAviso} sx={{ backgroundColor: '#1E9CFA' }}>
              Visualizar aviso completo
            </Button>
          </Box>
          <button className={Style.enviar} onClick={EnviarMensagem}>Enviar Aviso</button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default AviseClass;
