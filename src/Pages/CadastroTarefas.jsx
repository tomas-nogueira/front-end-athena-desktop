import { Container, Typography, Box, Button, IconButton, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Autocomplete, Chip, Grid } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import CadastroBack from '../Photos/Cadastro-back.png';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Components/Header';
import AssignmentIcon from '@mui/icons-material/Assignment';

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

const recipientsOptions = [
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
  { value: '3medio', label: '3º Médio' },
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
    fetch("http://localhost:8080/user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      setIdProfessor(json.message._id);
      setSchoolProfessor(json.message.Idschool);
    })
    .catch((error) => {
      console.error("Erro ao buscar professor:", error);
    });


  }, []);

  function CadastrarTarefa() {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8080/tasks/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subject: selectedSubject?.value,
        content: content,
        dueDate: selectedDate,
        recipients: selectedRecipients,//FUNCIONANDO PASSANDO ESTÁTICO
        attachment: 20,
        professorId: IdProfessor,
        status: "em andamento",
        class: '66fc22f1c3fbe6f5be1b366f',//FUNCIONANDO PASSANDO ESTÁTICO
        school: '66fbfd0f80c681d1d2970824',//FUNCIONANDO PASSANDO ESTÁTICO
        alternatives: tipoQuestao === 'alternativa' ? alternativas : [],
      })
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      console.log("Tarefa cadastrada com sucesso:", json);
    })
    .catch((error) => {
      console.error("Erro ao cadastrar tarefa:", error);
    });
  }

  return (
    <>
      <Header textBar1="Home" textBar2="DashBoard" textBar3="Item 3" />
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
            <AssignmentIcon fontSize='large' />
            Cadastre uma tarefa
            <AssignmentIcon fontSize='large' />
          </Typography>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
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
                  <h3>Alternativas:</h3>
                  {alternativas.map((alternativa, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <TextField
                        label={`Alternativa ${index + 1}`}
                        value={alternativa.text}
                        onChange={(e) => handleAlternativaChange(index, e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={alternativa.isCorrect}
                            onChange={() => handleCorrectChange(index)}
                          />
                        }
                        label="Certa"
                      />
                    </Box>
                  ))}
                  <Button onClick={adicionarAlternativa} variant="contained" color="primary">
                    Adicionar Alternativa
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={recipientsOptions}
                  getOptionLabel={(option) => option.label}
                  value={selectedRecipients}
                  onChange={(event, newValue) => setSelectedRecipients(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Destinatários"
                      placeholder="Selecione os destinatários"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={CadastrarTarefa}>
                  Cadastrar Tarefa
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </section>
    </>
  );
}

export default CadastroTarefas;
