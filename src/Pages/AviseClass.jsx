import React, { useState, useEffect } from 'react';
import Style from '../Styles/Aviso.module.css';
import MicIcon from '@mui/icons-material/Mic';
import Select from '../Components/Select';
import { Box, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Header from '../Components/Header';

function AviseClass() {
  const [selectedClass, setSelectedClass] = useState('');
  const [aviso, setAviso] = useState('');
  const [data, setData] = useState('');
  const [dadosUser, setDadosUser] = useState({});
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Função para abrir o pop-up que mostra a transcrição ao vivo
  const openTranscriptPopup = () => {
    Swal.fire({
      title: 'Gravando áudio...',
      html: `<div id="transcript-content">${transcript}</div>`, // Conteúdo inicial
      showConfirmButton: false,
      width: '600px',
      showCloseButton: true // Adiciona um botão de fechar
    });
  };

  // Função para alternar o reconhecimento de voz e abrir o pop-up
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening(); // Interrompe a gravação
      Swal.close(); // Fecha o pop-up
    } else {
      resetTranscript(); // Reseta o conteúdo anterior
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' }); // Inicia a gravação
      openTranscriptPopup(); // Abre o pop-up
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

  // Atualiza o texto no pop-up em tempo real, verificando se o elemento existe
  useEffect(() => {
    if (listening) {
      const transcriptElement = document.getElementById('transcript-content');
      if (transcriptElement) {
        transcriptElement.innerText = transcript; // Atualiza o conteúdo do pop-up se o elemento existe
      }
    }
    setAviso(transcript); // Atualiza o input também
  }, [transcript, listening]);

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

  // Função para mostrar o pop-up com o aviso completo
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
        width: '600px' // Define uma largura maior para visualizar melhor o aviso
      });
    }
  };

  return (
    <div>
      <div>
        <Header/>
      </div>
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
    </div>
  );
}

export default AviseClass;
