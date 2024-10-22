import { Container, Typography, Box, Button, IconButton, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Autocomplete, Chip, Grid, Alert } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import CadastroBack from '../Photos/Cadastro-back.png';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Components/Header';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const subjectOptions = [
  { value: 'Língua Portuguesa', label: 'Língua Portuguesa' },
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Biologia', label: 'Biologia' },
  { value: 'Física', label: 'Física' },
  { value: 'Química', label: 'Química' },
  { value: 'História', label: 'História' },
  { value: 'Geografia', label: 'Geografia' },
  { value: 'Inglês', label: 'Língua Inglesa' },
  { value: 'Educação_Física', label: 'Educação Física' },
  { value: 'Artes', label: 'Artes' }
];

function CadastroTarefas() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [content, setContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [IdProfessor, setIdProfessor] = useState('');
  const [schoolProfessor, setSchoolProfessor] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tipoQuestao, setTipoQuestao] = useState('');
  const [alternativas, setAlternativas] = useState([{ text: '', isCorrect: false }]);
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]); // Estado para classes selecionadas

  const [message, setMessage] = useState('')

  const handleTipoQuestaoChange = (event) => {
    setTipoQuestao(event.target.value);
    if (event.target.value === 'dissertativa') {
      setAlternativas([{ text: '', isCorrect: false }]);
    }
  };

  const handleAlternativaChange = (index, value) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas[index].text = value;
    setAlternativas(novasAlternativas);
  };

  const handleCorrectChange = (index) => {
    const novasAlternativas = alternativas.map((alt, i) => ({
      ...alt,
      isCorrect: i === index
    }));
    setAlternativas(novasAlternativas);
  };

  const adicionarAlternativa = () => {
    setAlternativas([...alternativas, { text: '', isCorrect: false }]);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:3030/user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      setIdProfessor(json.message._id);
      setSchoolProfessor(json.message.IdSchool);
    })
    .catch((error) => {
      console.error("Erro ao buscar professor:", error);
    });
  }, []);

  useEffect(() => {
    if(schoolProfessor){
      fetch(`http://localhost:3030/class/${schoolProfessor}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resposta) => resposta.json())
      .then((json) => {
        setClasses(json.message); // Ajuste para usar o caminho correto
      })
      .catch((error) => {
        console.error("Erro ao buscar classes:", error);
      });
    }
  }, [schoolProfessor]);

  function resetFields() {
    setSelectedSubject(null);
    setContent('');
    setSelectedRecipients([]);
    setSelectedDate('');
    setSelectedClasses([]);
    setTipoQuestao('');
    setAlternativas([{ text: '', isCorrect: false }]);
    setSelectedFile(null);
  }
  
  function CadastrarTarefa() {
    const token = localStorage.getItem('token');
    fetch("http://localhost:3030/tasks/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subject: selectedSubject?.value,
        content: content,
        dueDate: selectedDate,
        recipients: selectedClasses.map(cls => cls._id),
        attachment: 20,
        IdTeacher: IdProfessor,
        status: "em andamento",
        IdClass: selectedClasses.map(cls => cls._id),
        school: schoolProfessor,
        alternatives: tipoQuestao === 'alternativa' ? alternativas : [],
      })
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      setMessage(json);
      resetFields(); // Limpa os campos após o sucesso do cadastro
    })
    .catch((error) => {
      console.error("Erro ao cadastrar tarefa:", error);
    });
  }
  function excluirAlternativa(index){
    const novasAlternativas = alternativas.filter((_, i) => i !== index);
    setAlternativas(novasAlternativas);
  };
  

  return (
    <>
      <Header textBar1="Minha DashBoard" textBar2="Registrar notas" textBar3="Presença de alunos"/>
      <section style={{
        backgroundImage: `url(${CadastroBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative'
      }}>
        <Container maxWidth="md" style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1
        }}>
          <Typography variant="h5" component="h1" gutterBottom style={{
            fontWeight: 'bold',
            marginBottom: 20,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderBottom: '2px solid black',
            paddingBottom: '10px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}>
            Cadastrar uma tarefa
          </Typography>
          {message && (<Alert variant='filled' severity="info" sx={{ textAlign:"center", borderRadius: '5px'}}>{message.message}</Alert>)}
          <Container maxWidth="xl">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={classes} // Usando as classes obtidas
                  getOptionLabel={(option) => option.name} // Exibindo o nome da classe
                  value={selectedClasses}
                  onChange={(event, newValue) => setSelectedClasses(newValue)} // Atualizando as classes selecionadas
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Para quem?"
                      placeholder="Selecione as classes"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={subjectOptions}
                  getOptionLabel={(option) => option.label}
                  value={selectedSubject}
                  onChange={(event, newValue) => setSelectedSubject(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Matéria"
                      variant="standard"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Digite a pergunta da tarefa"
                  variant="standard"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup value={tipoQuestao} onChange={handleTipoQuestaoChange} row>
                  <FormControlLabel
                    value="alternativa"
                    control={<Radio />}
                    label="Questão Alternativa"
                  />
                  <FormControlLabel
                    value="dissertativa"
                    control={<Radio />}
                    label="Questão Dissertativa"
                  />
                </RadioGroup>
              </Grid>
              {tipoQuestao === 'alternativa' && (
              <Grid item xs={12}>
                <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>ALTERNATIVAS:</Typography>
                {alternativas.map((alternativa, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1rem' }}>
                  <TextField
                    label={`Alternativa ${index + 1}`}
                    value={alternativa.text}
                    onChange={(e) => handleAlternativaChange(index, e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleCorrectChange(index)} color={alternativa.isCorrect ? 'success' : 'default'}>
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCorrectChange(index)} color={!alternativa.isCorrect ? 'error' : 'default'}>
                      <CancelIcon />
                    </IconButton>
                  </Box>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => excluirAlternativa(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              ))}
                <Button onClick={adicionarAlternativa} variant='outlined' color="primary" startIcon={<AddIcon />} />
              </Grid>
            )}
              <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Button variant="contained" color="primary" onClick={CadastrarTarefa}>
                  Cadastrar Tarefa
                </Button>
              </Grid>
            </Grid>
            </Grid>
          </Container>
        </Container>
      </section>
    </>
  );
}

export default CadastroTarefas;
