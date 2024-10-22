import React, { useState } from 'react';
import HeaderDashboards from '../Components/HeaderDashboards';
import Style from '../Styles/Aviso.module.css';
import MicIcon from '@mui/icons-material/Mic';
import Select from '../Components/Select';
import { Box, TextField } from '@mui/material';
import Swal from 'sweetalert2'; // Importando SweetAlert2

function AviseClass() {
  const [selectedClass, setSelectedClass] = useState('');
  const [aviso, setAviso] = useState('');
  const [data, setData] = useState('');

  const [dadosUser, setDadosUser] = useState({})

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

  function EnviarMensagem() {
    if (!aviso || !selectedClass || !data) {
      // Estilizando o pop-up de alerta usando SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios faltando!',
        text: 'Por favor, preencha todos os campos antes de enviar.',
        confirmButtonColor: '#1E9CFA' // Usando a cor preferida
      });
      return;
    } else {
      // Exibe pop-up de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Aviso enviado!',
        text: 'Detectamos que você não possui uma alexa vinculada com o nosso sistema! Por isso o aviso foi salvo apenas no banco de dados.',
        confirmButtonColor: '#1E9CFA'
      });

      // Envia o aviso e reseta os valores
      setAviso('');
      setSelectedClass('');
      setData('');
    }
  }

  return (
    <div>
      <div>
        <HeaderDashboards role={dadosUser.role} name={dadosUser.name} institution='SESI 337' />
      </div>
      <div className={Style.recado}>
        <h3>Envie recados para a Athena</h3>
        <button className={Style.but}>
          <MicIcon className={Style.icone} sx={{ fontSize: 60 }} />
        </button>
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
        <button className={Style.enviar} onClick={EnviarMensagem}>Enviar Aviso</button>
      </div>
    </div>
  );
}

export default AviseClass;
