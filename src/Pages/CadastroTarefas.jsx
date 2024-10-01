import { Container, Typography, Box, Button,IconButton, FormControl, FormControlLabel, Radio, RadioGroup, TextField, InputLabel, MenuItem, Select, Autocomplete, Chip  } from '@mui/material';
import React, { useState, useRef } from 'react';
import CadastroBack from '../Photos/Cadastro-back.png';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Components/Header';
import SelectPerson from '../Components/Select';
import Input from '../Components/Input';
import AssignmentIcon from '@mui/icons-material/Assignment';

const subjectOptions = [
  { value: 'portuguesa', label: 'Língua Portuguesa' },
  { value: 'matematica', label: 'Matemática' },
  { value: 'biologia', label: 'Biologia' },
  { value: 'fisica', label: 'Física' },
  { value: 'quimica', label: 'Química' },
  { value: 'historia', label: 'História' },
  { value: 'geografia', label: 'Geografia' },
  { value: 'inglesa', label: 'Língua Inglesa' },
  { value: 'educacao_fisica', label: 'Educação Física' },
  { value: 'artes', label: 'Artes' }
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
  { value: '3medio', label: '3º Médio' }

];

function CadastroTarefas() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [content, setContent] = useState('')
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [selectedDate, setSelectedDate] = useState(''); // Estado para armazenar a data


  const fileInputRef = useRef(null);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedTopic('');
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Atualiza a data selecionada
  };

  const handleRecipientCHange = (event) => {
    setSelectedRecipients(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleAttachClick = () => {
    fileInputRef.current.click();
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = '';
  };

  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [tipoQuestao, setTipoQuestao] = useState('');
  const [alternativas, setAlternativas] = useState([]);
  const [respostaCerta, setRespostaCerta] = useState('');

  const handleTipoQuestaoChange = (event) => {
    setTipoQuestao(event.target.value);
    if (event.target.value === 'dissertativa') {
      setAlternativas(['']); // Limpa as alternativas se mudar para dissertativa
    }
  };

  const handleAlternativaChange = (index, value) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas[index] = value;
    setAlternativas(novasAlternativas);
  };

  const adicionarAlternativa = () => {
    setAlternativas([...alternativas, '']);
  };


  function CadastrarTarefa(){
    const token = localStorage.getItem('token');
      fetch("http://localhost:8080/tasks/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            subject: selectedSubject,
            content: content,
            dueDate: selectedDate,
            recipients: selectedRecipients,
            alternatives: tipoQuestao === 'alternativa' ? alternativas.map((alt) => ({ text: alt, isCorrect: alt === respostaCerta })) : [],
        })
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      
    })
    .catch((error) => {
        
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
        <Container maxWidth="xs" style={{
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
            <AssignmentIcon fontSize='large'/>
          </Typography>
          <Container maxWidth="xs">
              <Box
                component='form'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxHeight: '500px', // Defina uma altura máxima
                  overflowY: 'auto', // Permite rolagem
                  width: '100%',
                  padding: '1rem',
                  gap: '1rem'
                }}
              >
              <SelectPerson
                label="Matéria"
                menuItems={subjectOptions}
                value={selectedSubject}
                onChange={handleSubjectChange}
              />
              <TextField
                type="date"
                value={selectedDate}
                onChange={handleDateChange} // Captura a data selecionada
                sx={{ width: '250px' }}
              />      
              <TextField
                  label="Digite a pergunta da tarefa"
                  variant="standard"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ width: '250px' }}
              />
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
              {tipoQuestao === 'alternativa' && (
        <>
          <h3>Alternativas:</h3>
          {alternativas.map((alternativa, index) => (
            <TextField
              key={index}
              label={`Alternativa ${index + 1}`}
              value={alternativa}
              onChange={(e) => handleAlternativaChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <Button onClick={adicionarAlternativa} variant="contained" color="primary">
            Adicionar Alternativa
          </Button>

          <FormControl fullWidth margin="normal">
            <InputLabel>Selecione a Alternativa Certa</InputLabel>
            <Select
              value={respostaCerta}
              onChange={(e) => setRespostaCerta(e.target.value)}
              label="Selecione a Alternativa Certa"
          >
              {alternativas.map((alternativa, index) => (
                <MenuItem key={index} value={alternativa}>
                  {alternativa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Autocomplete
            multiple
            options={recipientsOptions}
            getOptionLabel={(option) => option.label} // Adiciona esta linha para garantir que o label seja usado corretamente
            value={selectedRecipients}
            onChange={(event, newValue) => setSelectedRecipients(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Destinatário"
                placeholder="Selecione"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option.label} {...getTagProps({ index })} sx={{ fontWeight: 'bold' }} />
              ))
            }
            sx={{ width: '250px', marginLeft: '8px' }}
          />
        </Box>
                <Button
                variant="contained"
                style={{
                  marginTop: '20px',
                  width: '60%',
                  textTransform: 'capitalize',
                }}
                onClick={handleAttachClick}
              >
                Anexar Arquivo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {selectedFile && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    marginTop: '10px',
                  }}
                >
                  <Typography>{selectedFile.name}</Typography>
                  <IconButton size="small" onClick={handleRemoveFile}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
              <Button variant='contained' sx={{color: 'white', backgroundColor: '#004FFF', fontWeight: 'bold', width: '100%'}} size='large' onClick={CadastrarTarefa}>
                CADASTRAR TAREFA
              </Button>
            </Box>
          </Container>
        </Container>
      </section>
    </>
  );
}

export default CadastroTarefas;
