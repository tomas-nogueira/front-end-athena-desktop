import { Container, Typography, Box, Button,IconButton, FormControl, FormControlLabel, Radio, RadioGroup, TextField, InputLabel, MenuItem, Select  } from '@mui/material';
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

const topicOptions = {
  portuguesa: [
    { value: '1', label: 'Trovadorismo' },
    { value: '2', label: 'Modernismo' },
    { value: '3', label: 'Realismo' },
    { value: '4', label: 'Romantismo' },
    { value: '5', label: 'Poesia Barroca' },
    { value: '6', label: 'Parnasianismo' },
    { value: '7', label: 'Simbolismo' },
    { value: '8', label: 'Literatura Colonial' },
    { value: '9', label: 'Conto' },
    { value: '10', label: 'Crônica' }
  ],
  matematica: [
    { value: '1', label: 'Equação de 1º Grau' },
    { value: '2', label: 'Geometria' },
    { value: '3', label: 'Funções' },
    { value: '4', label: 'Trigonometria' },
    { value: '5', label: 'Progressões Aritméticas' },
    { value: '6', label: 'Progressões Geométricas' },
    { value: '7', label: 'Polígonos' },
    { value: '8', label: 'Sistemas Lineares' },
    { value: '9', label: 'Álgebra Linear' },
    { value: '10', label: 'Probabilidade e Estatística' }
  ],
  biologia: [
    { value: '1', label: 'Genética' },
    { value: '2', label: 'Ecologia' },
    { value: '3', label: 'Botânica' },
    { value: '4', label: 'Zoologia' },
    { value: '5', label: 'Microbiologia' },
    { value: '6', label: 'Anatomia' },
    { value: '7', label: 'Fisiologia' },
    { value: '8', label: 'Evolução' },
    { value: '9', label: 'Biotecnologia' },
    { value: '10', label: 'Biologia Celular' }
  ],
  fisica: [
    { value: '1', label: 'Leis de Newton' },
    { value: '2', label: 'Termodinâmica' },
    { value: '3', label: 'Óptica' },
    { value: '4', label: 'Eletromagnetismo' },
    { value: '5', label: 'Mecânica Quântica' },
    { value: '6', label: 'Relatividade' },
    { value: '7', label: 'Ondulatória' },
    { value: '8', label: 'Astronomia' },
    { value: '9', label: 'Física de Partículas' },
    { value: '10', label: 'Acústica' }
  ],
  quimica: [
    { value: '1', label: 'Química Orgânica' },
    { value: '2', label: 'Química Inorgânica' },
    { value: '3', label: 'Físico-Química' },
    { value: '4', label: 'Bioquímica' },
    { value: '5', label: 'Química Analítica' },
    { value: '6', label: 'Química Ambiental' },
    { value: '7', label: 'Química Industrial' },
    { value: '8', label: 'Estereoquímica' },
    { value: '9', label: 'Reações Químicas' },
    { value: '10', label: 'Equilíbrios Químicos' }
  ],
  historia: [
    { value: '1', label: 'Idade Antiga' },
    { value: '2', label: 'Idade Média' },
    { value: '3', label: 'Idade Moderna' },
    { value: '4', label: 'Idade Contemporânea' },
    { value: '5', label: 'História da Grécia Antiga' },
    { value: '6', label: 'História de Roma' },
    { value: '7', label: 'Renascimento' },
    { value: '8', label: 'Revolução Francesa' },
    { value: '9', label: 'Revolução Industrial' },
    { value: '10', label: 'Guerra Fria' }
  ],
  geografia: [
    { value: '1', label: 'Cartografia' },
    { value: '2', label: 'Climatologia' },
    { value: '3', label: 'Geopolítica' },
    { value: '4', label: 'Geomorfologia' },
    { value: '5', label: 'Geografia Humana' },
    { value: '6', label: 'Geografia Econômica' },
    { value: '7', label: 'Geografia Urbana' },
    { value: '8', label: 'Geografia Regional' },
    { value: '9', label: 'Geografia Física' },
    { value: '10', label: 'Geografia do Brasil' }
  ],
  inglesa: [
    { value: '1', label: 'Gramática' },
    { value: '2', label: 'Literatura Inglesa' },
    { value: '3', label: 'Conversação' },
    { value: '4', label: 'Compreensão Auditiva' },
    { value: '5', label: 'Vocabulário' },
    { value: '6', label: 'Escrita Criativa' },
    { value: '7', label: 'Estruturas Verbais' },
    { value: '8', label: 'Pronúncia' },
    { value: '9', label: 'Cultura e Sociedade' },
    { value: '10', label: 'Tradução' }
  ],
  educacao_fisica: [
    { value: '1', label: 'Atividades Físicas' },
    { value: '2', label: 'Desenvolvimento Motor' },
    { value: '3', label: 'Esportes' },
    { value: '4', label: 'Saúde e Bem-estar' },
    { value: '5', label: 'Treinamento Físico' },
    { value: '6', label: 'Nutrição' },
    { value: '7', label: 'Fisiologia do Exercício' },
    { value: '8', label: 'Psicologia do Esporte' },
    { value: '9', label: 'História da Educação Física' },
    { value: '10', label: 'Educação e Inclusão' }
  ],
  artes: [
    { value: '1', label: 'História da Arte' },
    { value: '2', label: 'Desenho e Pintura' },
    { value: '3', label: 'Escultura' },
    { value: '4', label: 'Música' },
    { value: '5', label: 'Teatro' },
    { value: '6', label: 'Dança' },
    { value: '7', label: 'Artes Visuais' },
    { value: '8', label: 'Fotografia' },
    { value: '9', label: 'Cinema' },
    { value: '10', label: 'Design Gráfico' }
  ]
};

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
  const [selectedRecipients, setSelectedRecipients] = useState('')

  const fileInputRef = useRef(null);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedTopic('');
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do formulário para a sua API ou fazer o que precisar
    console.log({ tipoQuestao, alternativas, respostaCerta });
  };

  /*function CadastrarTarefa() {
    fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: selectedSubject, 
            content: ,
            recipients: ,
            attachement: ,
            professorId
            
        })
    })
    .then((resposta) => resposta.json())
    .then((json) => {
        if (json.token) {
            setLogado(true);
            setRoleContext(json.role);
            setMessageContext(json.message);
            localStorage.setItem("token", json.token);
        }
    })
    .catch((error) => {
        setLogado(false)
        console.error('Erro ao tentar cadastrar:', error);
    });
}
    */

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
              <SelectPerson
                label="Assunto"
                menuItems={topicOptions[selectedSubject] || []}
                value={selectedTopic}
                onChange={handleTopicChange}
              />
              <Input type='date'/>
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

      {tipoQuestao === 'dissertativa' && (
        <TextField
          label="Resposta"
          value={respostaCerta}
          onChange={(e) => setRespostaCerta(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
              <SelectPerson
                label="Destinatário"
                menuItems={recipientsOptions}
                value={selectedRecipients}
                onChange={handleRecipientCHange} 
                />
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
              <Button variant='contained' sx={{color: 'white', backgroundColor: '#004FFF', fontWeight: 'bold', width: '100%'}} size='large'>
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
