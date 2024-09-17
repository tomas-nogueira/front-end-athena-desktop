import { Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import CadastroBack from '../Photos/Cadastro-back.png';
import Header from '../Components/Header';

function CadastroTarefas() {
  const [materia, setMateria] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [classe, setClasse] = useState('');

  const handleMateriaChange = (event) => setMateria(event.target.value);
  const handleConteudoChange = (event) => setConteudo(event.target.value);
  const handleDataEntregaChange = (event) => setDataEntrega(event.target.value);
  const handleClasseChange = (event) => setClasse(event.target.value);

  return (
    <>
    <Header textBar1="Home" textBar2="Item 2" textBar3="Item 3"/>
      <section style={{
        backgroundImage: `url(${CadastroBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <Container maxWidth="xs" style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="h5" component="h1" gutterBottom style={{ fontWeight: 'bold', marginBottom: 20 }}>
            CADASTRE UMA TAREFA
          </Typography>
          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
            <InputLabel id="materia-select-label">Selecione a Matéria</InputLabel>
            <Select
              labelId="materia-select-label"
              id="materia-select"
              value={materia}
              onChange={handleMateriaChange}
              label="Selecione a Matéria"
            >
              <MenuItem value="matematica">Matemática</MenuItem>
              <MenuItem value="portugues">Português</MenuItem>
              <MenuItem value="historia">História</MenuItem>
              <MenuItem value="geografia">Geografia</MenuItem>
              <MenuItem value="ciencias">Ciências</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
            <InputLabel id="conteudo-select-label">Selecione o Conteúdo</InputLabel>
            <Select
              labelId="conteudo-select-label"
              id="conteudo-select"
              value={conteudo}
              onChange={handleConteudoChange}
              label="Selecione o Conteúdo"
            >
              <MenuItem value="conteudo1">Conteúdo 1</MenuItem>
              <MenuItem value="conteudo2">Conteúdo 2</MenuItem>
              <MenuItem value="conteudo3">Conteúdo 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
            <InputLabel id="data-entrega-select-label">Data de Entrega</InputLabel>
            <Select
              labelId="data-entrega-select-label"
              id="data-entrega-select"
              value={dataEntrega}
              onChange={handleDataEntregaChange}
              label="Data de Entrega"
            >
              <MenuItem value="2024-09-30">30/09/2024</MenuItem>
              <MenuItem value="2024-10-15">15/10/2024</MenuItem>
              <MenuItem value="2024-11-01">01/11/2024</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
            <InputLabel id="classe-select-label">Selecione a Classe</InputLabel>
            <Select
              labelId="classe-select-label"
              id="classe-select"
              value={classe}
              onChange={handleClasseChange}
              label="Selecione a Classe"
            >
              <MenuItem value="1">1º Ano</MenuItem>
              <MenuItem value="2">2º Ano</MenuItem>
              <MenuItem value="3">3º Ano</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' style={{ backgroundColor: '#E6A700', fontWeight: 'bold', width: '100%' }}>
            CADASTRAR TAREFA
          </Button>
        </Container>
      </section>
    </>
  );
}

export default CadastroTarefas;
