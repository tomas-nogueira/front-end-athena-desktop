import React, { useState, useEffect, useContext } from "react";
import Style from "../Styles/Style.css";
import Header from "../Components/Header";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Snackbar,
  Alert,
  Autocomplete,
  TextField,
} from "@mui/material";
import Footer from "../Components/Footer";
import Graph from "../Components/Graph";
import HeaderDashboards from "../Components/HeaderDashboards";
import ChatForm from "../Components/ChatForm";
import PerformanceDashboard from "../Components/PerformanceDashboard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authProvider";
import { TaskContext } from "../Context/taskProvider";

function DashBoardTarefas() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);

  const { dadosUser } = useContext(AuthContext);
  const { ungradedTasks, classes, GetClassProfessorById, GetTasksByClass, completedTasksClass, delayTasksClass, inProgressTasksClass } = useContext(TaskContext);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenNotification(true); 
  }, []);

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  function RedirecionarAvaliar() {
    navigate('/notas/professor');
  }

  // Pegando as salas
  useEffect(() => {
    if (dadosUser && dadosUser.message && dadosUser.message.IdSchool) {
      GetClassProfessorById();
    }
  }, [dadosUser]);

  // Chama GetTasksByClass sempre que selectedClass mudar
  useEffect(() => {
    if (selectedClass) {
      GetTasksByClass(selectedClass._id); // Passa a classe selecionada, se necessário
    }
  }, [selectedClass]);

  // Verificando se existe os dados do usuário
  if (!dadosUser || !dadosUser.message) {
    return <Typography variant="h5" align="center">Carregando...</Typography>;
  }

  // Se dadosUser.message existir, mas algumas propriedades específicas faltarem
  if (!dadosUser.message.role || !dadosUser.message.name) {
    return <Typography variant="h6" align="center">Erro ao carregar os dados do usuário</Typography>;
  }

  return (
    <>
      <Header
        textBar1="Home"
        textBar2="Cadastrar uma Tarefa"
        textBar3="Avaliar Tarefas"
      />
      <HeaderDashboards
        name={dadosUser.message.name}
        institution="SESI 337"
        role="Professor"
      />

      {/* Notificação */}
      <Snackbar
        open={openNotification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <Alert onClose={handleCloseNotification} severity="info">
          Atualizando os dados com base nas informações coletadas pela IA...
        </Alert>
      </Snackbar>
      
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            height: "600px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              borderBottom: "2px solid #004FFF",
              color: "black",
              fontWeight: "bold",
              width: "50%",
              margin: "0 auto",
              padding: "8px 0",
              fontSize: 25,
            }}
          >
            FEEDBACKS E AVALIAÇÕES
          </Typography>
          <Card
            sx={{
              maxWidth: 345,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "none",
              marginTop: 2,
            }}
          >
            <CardActionArea disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
              <Typography
                sx={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "#004FFF",
                  textAlign: "center",
                }}
              >
                {ungradedTasks}
              </Typography>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {ungradedTasks > 0 ? "FEEDBACKS E AVALIAÇÕES" : "Nenhuma tarefa pendente"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {ungradedTasks > 0
                    ? "Caro Professor, é necessário que o senhor(a) dê os feedbacks e avalie as tarefas realizadas pelos alunos, clique no botão abaixo para ver quais tarefas são necessárias!!!"
                    : "Não há tarefas para avaliar no momento."}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={RedirecionarAvaliar}
                size="large"
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  backgroundColor: "#004FFF",
                  color: "white",
                  width: "300px",
                  "&:hover": {
                    backgroundColor: "#002F99",
                  },
                }}
              >
                VER
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{ backgroundColor: "white", borderRadius: 5, height: "600px" }}
        >
          <Typography
            sx={{
              textAlign: "center",
              borderBottom: "2px solid #004FFF",
              color: "black",
              fontWeight: "bold",
              width: "50%",
              margin: "0 auto",
              padding: "8px 0",
              fontSize: 25,
            }}
          >
            STATUS DE SUAS TAREFAS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Autocomplete
              options={classes || []} // Usa array vazio caso classes seja undefined
              getOptionLabel={(option) => option.name} // Exibindo o nome da classe
              value={selectedClass}
              fullWidth
              onChange={(event, newValue) => setSelectedClass(newValue)} // Atualizando as classes selecionadas
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Selecione a sala..."
                  placeholder="Selecione as classes"
                  fullWidth
                />
              )}
            />
            {completedTasksClass === 0 && inProgressTasksClass === 0 && delayTasksClass === 0 ? (
              <Typography variant="h6" align="center" sx={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                width: "50%",
                margin: "0 auto",
                padding: "8px 0",
                fontSize: 25,
              }}>
                Não há tarefas cadastradas para essa sala
              </Typography>
            ) : (
              <Graph
                type="pie"
                data={[
                  { name: "Concluídas", value: completedTasksClass, color: "#83E509" },
                  { name: "Em andamento", value: inProgressTasksClass, color: "#FFA500" },
                  { name: "Atrasadas", value: delayTasksClass, color: "#FF4C4C" },
                ]}
              />
            )}
          </Box>
        </Grid>
        <PerformanceDashboard />
      </Grid>
      <ChatForm userId={dadosUser.message._id} userType={dadosUser.message.role} />
      <Footer />
    </>
  );
}

export default DashBoardTarefas;
