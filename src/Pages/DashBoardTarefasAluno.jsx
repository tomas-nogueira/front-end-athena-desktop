import React, { useContext, useEffect, useState } from "react";
import Card from "../Components/CardTarefaGeral";
import Header from "../Components/Header";
import { Container, Grid, Typography, Box } from "@mui/material";
import Footer from "../Components/Footer";
import Logo from "../Photos/logo_athena 5.png";
import Graph from "../Components/Graph";
import { TaskContext } from "../Context/taskProvider";
import { AuthContext } from "../Context/authProvider";
import ChatForm from "../Components/ChatForm";
import Loading from "../Components/loading";
import { Drawer, Card as AntCard } from "antd";

function DashBoardTarefas() {
  const { dadosUser } = useContext(AuthContext);
  const { totalTasks, completedTasks, delayTasks, inProgress } =
    useContext(TaskContext);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!totalTasks) {
      setIsDrawerVisible(true); // Mostra o Drawer ao iniciar o carregamento
    }
  }, []);

  useEffect(() => {
    if (totalTasks) {
      setIsLoadingTasks(false);
      setIsDrawerVisible(false); // Fecha o Drawer quando o carregamento terminar
    }
  }, [totalTasks]);

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  if (!dadosUser || !dadosUser.message) {
    return <Loading />;
  }

  const renderTaskCard = () => {
    if (delayTasks > 0) {
      return (
        <AntCard
          style={{
            margin: "10px",
            backgroundColor: "#f2dede",
            borderColor: "#ebccd1",
            width: "80%",
          }}
        >
          <Typography>
            Atenção! Você tem {delayTasks} tarefas atrasadas. Verifique e se
            organize!
          </Typography>
        </AntCard>
      );
    }
    if (completedTasks > 0) {
      return (
        <AntCard
          style={{
            margin: "10px",
            backgroundColor: "#dff0d8",
            borderColor: "#d6e9c6",
            width: "80%",
          }}
        >
          <Typography>
            Ótimo trabalho! Você completou {completedTasks} tarefas! Continue
            assim!
          </Typography>
        </AntCard>
      );
    }
    if (inProgress > 0) {
      return (
        <AntCard
          style={{
            margin: "10px",
            backgroundColor: "#d9edf7",
            borderColor: "#bce8f1",
            width: "80%",
          }}
        >
          <Typography>
            Atenção! Você tem tarefas em andamento. Tente completá-las o mais
            rápido possível!
          </Typography>
        </AntCard>
      );
    }
    return null; // Nenhuma tarefa a ser exibida
  };

  return (
    <>
      <Header textBar1="HOME" textBar2="Minhas Notas" textBar3="Presença" />
      <Drawer
        title="Processando Dados"
        placement="right"
        closable
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width="300px"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Typography>
          Nossa sistema está sendo treinado e fomentada com todas as tarefas.
          Estamos analisando dados para feedbacks futuros enquanto carregamos.
        </Typography>
      </Drawer>

      <Container sx={{ marginY: 3, padding: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-around", display:"flex", flexDirection:"row"}}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </Grid>

          <Grid
  item
  xs={10}
  sm={5}
  sx={{ display: "flex", flexDirection: "column" }}
>

{isLoadingTasks ? (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
    <Card
  title="TAREFAS TOTAL"
  quantidade={totalTasks}
  colorBorder="#4A90E2"
  isLoading={isLoadingTasks} // Passando o estado de carregamento
/>

    </Grid>
  </Grid>
) : (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Card
        title="TAREFAS TOTAL"
        quantidade={totalTasks}
        descricao="Total de tarefas"
        colorBorder="#4A90E2"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card
        title="TAREFAS CONCLUIDAS"
        quantidade={completedTasks}
        descricao="Tarefas concluídas"
        colorBorder="#83E509"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card
        title="TAREFAS EM ANDAMENTO"
        quantidade={inProgress}
        descricao="Tarefas em andamento"
        colorBorder="#FFA500"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card
        title="TAREFAS ATRASADAS"
        quantidade={delayTasks}
        descricao="Tarefas atrasadas"
        colorBorder="#FF4C4C"
      />
    </Grid>
  </Grid>
)}

  </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundColor: "white",
              borderRadius: 5,
              maxHeight: "500px",
              overflow: "hidden",
              padding: 2,
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
              STATUS DE SUAS TAREFAS
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                maxHeight: "400px",
                overflow: "hidden",
                margin: "0 auto",

              }}
            >
              <Graph
                type="pie"
                data={[
                  {
                    name: "Concluídas",
                    value: isLoadingTasks ? 0 : completedTasks,
                    color: "#83E509",
                  },
                  {
                    name: "Em Andamento",
                    value: isLoadingTasks ? 0 : inProgress,
                    color: "#FFA500",
                  },
                  {
                    name: "Atrasadas",
                    value: isLoadingTasks ? 0 : delayTasks,
                    color: "#FF4C4C",
                  },
                ]}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {renderTaskCard()}
          </Grid>
        </Grid>
      </Container>

      <Footer />
      <ChatForm
        userId={dadosUser.message._id}
        userType={dadosUser.message.role}
      />
    </>
  );
}

export default DashBoardTarefas;
