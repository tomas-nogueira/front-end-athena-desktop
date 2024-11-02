import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Chip, Autocomplete, MenuItem, IconButton, Select } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import CadastroBack from '../Photos/Cadastro-back.png';
import Header from '../Components/Header';
import { message as antdMessage } from 'antd';

function CadastroClasse() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [teacher, setTeacher] = useState([]);
  const [year, setYear] = useState('');
  const [subjectSelected, setSubjectSelected] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const apiUrl = process.env.BASE_URL_ATHENA; 

  // Estado para cronograma
  const [scheduleItems, setScheduleItems] = useState([
    { dayOfWeek: '', startTime: '', endTime: '', topic: '' }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${apiUrl}/school/data`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    })
    .then(res => res.json())
    .then(json => setSchoolId(json.message._id))
    .catch(error => console.error("Erro ao buscar escola:", error));
  }, []);

  useEffect(() => {
    if (schoolId) {
      fetch(`${apiUrl}/user/allteachers/${schoolId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(json => setTeachers(json))
      .catch(error => console.error("Erro ao buscar professores:", error));
    }
  }, [schoolId]);

  useEffect(() => window.scrollTo(0, 0), []);

  function CadastrarClasse() {
    const token = localStorage.getItem('token');
  
    if (schoolId) {
      // Primeira requisição: criar a classe
      fetch(`${apiUrl}/class`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          grade,
          teacher: teacher.map(t => t._id),
          IdSchool: schoolId,
          year,
          subject: subjectSelected
        })
      })
      .then(res => res.json())
      .then(classData => {
        // Verifique se o ID da classe está na resposta
        const classId = classData.class._id || classData._id;
        
        if (classId) {
          return fetch(`${apiUrl}/schedule/create`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ classId, scheduleItems })
          })
          .then(scheduleRes => scheduleRes.json())
          .then(scheduleData => {
            if (scheduleData) {
              antdMessage.success("Classe e cronograma cadastrados com sucesso!");
              // Limpeza dos campos
              setName('');
              setGrade('');
              setTeacher([]);
              setYear('');
              setSubjectSelected([]);
              setScheduleItems([{ dayOfWeek: '', startTime: '', endTime: '', topic: '' }]);
            } else {
              throw new Error("Erro ao cadastrar cronograma.");
            }
          });
        } else {
          throw new Error("Erro ao criar a classe - ID da classe não encontrado.");
        }
      })
      .catch(error => {
        antdMessage.error("Erro ao cadastrar a classe e cronograma.");
        console.error("Erro ao cadastrar classe e cronograma:", error);
      });
    }
  }
  

  const handleAddScheduleItem = () => {
    setScheduleItems([...scheduleItems, { dayOfWeek: '', startTime: '', endTime: '', topic: '' }]);
  };

  const handleRemoveScheduleItem = (index) => {
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedItems = [...scheduleItems];
    updatedItems[index][field] = value;
    setScheduleItems(updatedItems);
  };

  const subjectOptions = [
    'Língua Portuguesa', 'Matemática', 'Biologia', 'Física', 'Química', 'História', 'Geografia', 'Inglês', 'Educação_Física', 'Artes',
  ];

  return (
    <>
      <Header textBar1="Painel de Controle"/>
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
          onSubmit={(e) => { e.preventDefault(); CadastrarClasse(); }}
          sx={{
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
            maxHeight: '80vh',  // Defina uma altura máxima para o formulário
            overflowY: 'auto',  // Adiciona rolagem vertical
          }}
        >
          <Typography variant="h5" mb={2}>Cadastro de Classe</Typography>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          
          {/* Campos de Cadastro de Classe */}
          <TextField label="Nome da sala" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Série da sala" value={grade} onChange={(e) => setGrade(e.target.value)} fullWidth margin="normal" />
          <Autocomplete
            multiple options={teachers} getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setTeacher(newValue)}
            renderInput={(params) => <TextField {...params} label="Professores da sala" placeholder="Selecione" fullWidth />}
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip key={index} label={option.name} {...getTagProps({ index })} sx={{ fontWeight: 'bold' }} />
            ))}
          />
          <TextField label="Ano Letivo" value={year} onChange={(e) => setYear(e.target.value)} fullWidth margin="normal" />
          <Autocomplete
            multiple options={subjectOptions} value={subjectSelected} onChange={(event, newValue) => setSubjectSelected(newValue)}
            renderInput={(params) => <TextField {...params} label="Escolha as matérias disponíveis dessa sala" placeholder="Selecione" fullWidth />}
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} sx={{ fontWeight: 'bold' }} />
            ))}
          />

          {/* Campos de Cronograma */}
          <Typography variant="h6" mt={3}>Cronograma</Typography>
          {scheduleItems.map((item, index) => (
            <Box key={index} display="flex" gap={1} alignItems="center" mt={1}>
              <TextField select label="Dia da Semana" value={item.dayOfWeek}
                onChange={(e) => handleScheduleChange(index, 'dayOfWeek', e.target.value)}
                fullWidth margin="normal">
                <MenuItem value={1}>Segunda-feira</MenuItem>
                <MenuItem value={2}>Terça-feira</MenuItem>
                <MenuItem value={3}>Quarta-feira</MenuItem>
                <MenuItem value={4}>Quinta-feira</MenuItem>
                <MenuItem value={5}>Sexta-feira</MenuItem>
              </TextField>
              <TextField label="Início" type="time" value={item.startTime} onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)} fullWidth />
              <TextField label="Término" type="time" value={item.endTime} onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)} fullWidth />
              <Select
                label="Tópico"
                value={item.topic}
                onChange={(e) => handleScheduleChange(index, 'topic', e.target.value)}
                fullWidth
              >
                {subjectSelected.map((subject) => (
                  <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                ))}
              </Select>
              <IconButton onClick={() => handleRemoveScheduleItem(index)}><Remove /></IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={handleAddScheduleItem} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Adicionar Horário</Button>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Cadastrar Classe</Button>
        </Box>
      </section>
    </>
  );
}

export default CadastroClasse;
