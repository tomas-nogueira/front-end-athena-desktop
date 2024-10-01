import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
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

  // Estados para mensagens de sucesso/erro
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Atualiza o valor correto de cada campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'grade':
        setGrade(value);
        break;
      case 'teacher':
        setTeacher(value);
        break;
      case 'students':
        setStudents(value);
        break;
      case 'year':
        setYear(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Verifica se todos os campos foram preenchidos
    if (!name || !grade || !teacher || !students || !year || !subject) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    const dataToSend = {
      name,
      grade,
      teacher,
      students,
      year,
      subject,
      IdSchool: '66fc0406eae7bf4a2421a67d', 
    };

    // Log dos dados que serão enviados para a API
    console.log('Dados enviados para a API:', dataToSend);

    // Envio da requisição para a API
    fetch('http://localhost:8080/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados');
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Classe cadastrada com sucesso!');
        // Limpa os campos após o sucesso
        setName('');
        setGrade('');
        setTeacher('');
        setStudents('');
        setYear('');
        setSubject('');
      })
      .catch((error) => {
        setErrorMessage('Erro ao cadastrar a classe, tente novamente.');
        console.error('Error:', error);
      });
  };

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
          onSubmit={handleSubmit}
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
            label="Nome"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Série"
            name="grade"
            value={grade}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Professores"
            name="teacher"
            value={teacher}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estudantes"
            name="students"
            value={students}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ano Letivo"
            name="year"
            value={year}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Matérias"
            name="subject"
            value={subject}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>
        </Box>
      </section>
    </>
  );
}

export default CadastroClasse;
