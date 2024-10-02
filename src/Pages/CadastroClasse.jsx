import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Alert,   Chip, Autocomplete } from '@mui/material';
import CadastroBack from '../Photos/Cadastro-back.png';
import Header from '../Components/Header';

function CadastroClasse() {
  // Estados para os campos
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [teacher, setTeacher] = useState('');
  const [students, setStudents] = useState('');
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');

  const [subjectSelected, setSubjectSelected] = useState([]);

  // Estados para mensagens de sucesso/erro
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [dataSchool, setDataSchool] = useState('')

  useEffect(() =>{
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/school/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      setDataSchool(json)
    })
    .catch((error) => {
      console.error("Erro ao buscar professor:", error);
    });
  }, [])

  

  function CadastrarClasse(){
    
   
}

  const subjectOptions = [
    'Língua Portuguesa', 
    'Matemática',
    'Biologia', 
    'Física', 
    'Química', 
    'História', 
    'Geografia', 
    'Inglês',   
    'Educação_Física',    
    'Artes',
  ];

  return (
    <>
      <Header textBar1="Home" textBar2="DashBoard" textBar3="Item 3" />
      <section
        style={{
          backgroundImage: `url(${CadastroBack})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          component="form"
          onSubmit={CadastrarClasse}
          sx={{
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" mb={2}>Cadastro de Classe</Typography>

          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <TextField
            label="Nome da sala"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Série da saa"
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Professores da sala"
            name="teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ano Letivo"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Autocomplete
              multiple
              sx={{marginBottom: 10}}
              fullWidth
              options={subjectOptions}
              value={subjectSelected}
              onChange={(event, newValue) => setSubjectSelected(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Escolha as matérias disponíveis dessa sala"
                  placeholder="Selecione"
                  fullWidth

                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} sx={{fontWeight: 'bold'}} fullWidth
                  />
                ))
              }
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>
        </Box>
      </section>
    </>
  );
}

export default CadastroClasse;
