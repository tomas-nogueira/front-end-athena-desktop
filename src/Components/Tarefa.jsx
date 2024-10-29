import { Container, Box, Grid, Snackbar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CardTarefaMateria from '../Components/CardTarefaMateria';
import Header from '../Components/Header';
import { TextField } from '@mui/material';
import { Button, Typography, Radio } from "antd";
import { useParams, useNavigate } from 'react-router-dom'; // Importar useParams e useNavigate
import { AuthContext } from '../Context/authProvider';
import { TaskContext } from '../Context/taskProvider';
import { message as antdMessage } from 'antd';

function Tarefa() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dissertativeResponse, setDissertativeResponse] = useState('');
  const { id } = useParams(); // Pegar o id da URL
  const navigate = useNavigate(); // Hook para navegação

  const { dadosUser } = useContext(AuthContext);
  const { EnivarRespostaTask, tarefaEnviada, GetDataTaskById, dataTask} = useContext(TaskContext);
  
  useEffect(() =>{
    if(id){
      GetDataTaskById(id)
    }
  }, [])

  // Função para buscar o status do estudante logado
  const getStudentStatus = () => {
    if (dataTask && dadosUser) {
      const studentStatus = dataTask.studentStatus.find(status => status.studentId === dadosUser.message._id);
      return studentStatus ? studentStatus.status : 'Status não encontrado';
    }
    return 'Carregando...';
  };

  function EnviarResposta() {
    if (dataTask && dataTask.alternatives && dataTask.alternatives.length === 0) {
      // Verifica se a resposta dissertativa está preenchida
      if (!dissertativeResponse) {
        antdMessage.error("Por favor, preencha a resposta dissertativa");
        return;
      }
    } 
    else {
      // Verifica se a alternativa foi selecionada
      if (!selectedValue) {
        antdMessage.error("Por favor, selecione uma alternativa");
        return;
      }
    }
    // Chama a função de envio de resposta
    EnivarRespostaTask(id, dissertativeResponse, selectedValue);
  }
  
  useEffect(() => {
    if (tarefaEnviada) {
      const timer = setTimeout(() => {
        navigate('/dashboard/tarefas/aluno');
        window.location.reload();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [tarefaEnviada, navigate]);
  

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 5, width: '100%' }}>
          <Grid item xl={3} sm={6}>
            <CardTarefaMateria 
              title={dataTask ? `Tarefa de ${dataTask.subject}` : 'Carregando...'}
              subject={dataTask ? dataTask.subject : 'Carregando...'}
              status={getStudentStatus()} // Status do estudante logado
              button='Voltar'
            />
          </Grid>
          <Grid item xl={8} sm={6} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: 2, boxShadow: 2, minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: 2, padding: 3, boxSizing: 'border-box', width: '100%', height: '100%' }}>
              <Typography style={{ color: 'rgba(103, 98, 98, 1)', fontSize: 30, marginBottom: 1 }}>
                Banca: ATHENA
              </Typography>
              <Typography style={{ fontSize: 25, fontWeight: 'bold', lineHeight: 1.5, color: 'black', textAlign: 'center' }}>
                {dataTask ? dataTask.content : 'Carregando...'}
              </Typography>
              <Box sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 3, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {dataTask && dataTask.alternatives && dataTask.alternatives.length === 0 ? (
                  <TextField
                    label="Responder..."
                    variant="standard"
                    sx={{ width: '100%' }}
                    required
                    value={dissertativeResponse}
                    onChange={(e) => setDissertativeResponse(e.target.value)}
                  />
                ) : (
                  <>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>Selecione uma alternativa:</Typography>
                    {dataTask && dataTask.alternatives ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 1 }}>
                        <Radio.Group onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue} 
                        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          {dataTask.alternatives.map((alternative, index) => (
                            <Radio key={index} value={alternative.text} style={{ marginBottom: 15, fontSize: 16, border: '1px solid black', padding: 20, borderRadius: 10 }}>
                              {alternative.text}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Box>
                    ) : (
                      <Typography>Carregando alternativas...</Typography>
                    )}
                  </>
                )}
              </Box>
              <Button onClick={EnviarResposta} style={{ marginTop: 20 }} type="primary">ENVIAR RESPOSTA</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Tarefa;
