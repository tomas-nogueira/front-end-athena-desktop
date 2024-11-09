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
import Loading from "../Components/loading";

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

  useEffect(() => {
    if (dadosUser && dadosUser.message && dadosUser.message.IdSchool) {
      GetClassProfessorById();
    }
  }, [dadosUser]);

  useEffect(() => {
    if (selectedClass) {
      GetTasksByClass(selectedClass._id);
    }
  }, [selectedClass]);

  if (!dadosUser || !dadosUser.message) {
    return <Loading />;
  }

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
          gap: 3,
          paddingX: 2,
          marginBottom: 10,
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            height: { xs: "auto", md: "600px" },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              borderBottom: "2px solid #004FFF",
              color: "black",
              fontWeight: "bold",
              width: "80%",
              margin: "0 auto",
              padding: "8px 0",
              fontSize: { xs: 20, md: 25 },
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
              width: "100%",
            }}
          >
            <CardActionArea disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
              <Typography
                sx={{
                  fontSize: { xs: 40, md: 50 },
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
                  fontSize: { xs: 16, md: 20 },
                  backgroundColor: "#004FFF",
                  color: "white",
                  width: "80%",
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
          md={5}
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            height: { xs: "auto", md: "600px" },
            padding: 2,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              borderBottom: "2px solid #004FFF",
              color: "black",
              fontWeight: "bold",
              width: "80%",
              margin: "0 auto",
              padding: "8px 0",
              fontSize: { xs: 20, md: 25 },
            }}
          >
            STATUS DE SUAS TAREFAS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: { xs: 2, md: 5 },
            }}
          >
            <Autocomplete
              options={classes || []}
              getOptionLabel={(option) => option.name}
              value={selectedClass}
              fullWidth
              onChange={(event, newValue) => setSelectedClass(newValue)}
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
                width: "80%",
                margin: "0 auto",
                padding: "8px 0",
                fontSize: { xs: 20, md: 25 },
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
        <Grid
  item
  xs={12}
  md={5}
  sx={{
    backgroundColor: 'white',
    borderRadius: 5,
    padding: { xs: 2, sm: 3 }, // Ajusta o padding em telas menores
    marginBottom: { xs: 3, md: 0 }, // Adiciona espaçamento inferior em telas menores
    height: { xs: 'auto', md: '800px' }, // Altura adaptada conforme a tela
    display: 'flex', // Usando flexbox para ocupar o espaço disponível
    flexDirection: 'column', // Garante que os itens sejam empilhados verticalmente
  }}
>
  <PerformanceDashboard /> 
</Grid>



      </Grid>

      <ChatForm userId={dadosUser.message._id} userType={dadosUser.message.role} />
      <Footer />
    </>
  );
}

export default DashBoardTarefas;
