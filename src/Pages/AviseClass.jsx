import React, { useState } from 'react'
import HeaderDashboards from '../Components/HeaderDashboards'
import Style from  '../Styles/Aviso.module.css'
import MicIcon from '@mui/icons-material/Mic';
import Select from '../Components/Select'
import { Container, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardActions, CardContent, Button, TextField } from '@mui/material'
import { Input } from 'antd';

function AviseClass() {

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClass2, setSelectedClass2] = useState('');

  const [aviso, setAviso] = useState('')

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleClassChange2 = (event) => {
    setSelectedClass2(event.target.value);
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



  return (

    <div>
      <div>
        <HeaderDashboards/>
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
              sx={{width: 100}} 
            />
        </Box>
        <input type="date" className={Style.dataInput}/>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginTop: 5 }}>
            <TextField
                label="Digite o seu aviso"
                variant='outlined'
                type='text'
                value={aviso}
                onChange={(e) => setAviso(e.target.value)}
                sx={{ width: '600px' }}
            />
        </Box>
        <button className={Style.enviar}>Enviar Aviso</button>
      </div>
    </div>

  )
}

export default AviseClass