import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import Graph from "../Components/Graph";
import Footer from "../Components/Footer";
import HeaderDashboards from "../Components/HeaderDashboards";
import { AuthContext } from "../Context/authProvider";
import ChatForm from "../Components/ChatForm";
import Loading from "../Components/loading";
import { CheckCircle, Error } from "@mui/icons-material";
import TodoList from "../Components/TodoList";

function DashBoardDiretoria() {
  const { dadosUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [overallAverage, setOverallAverage] = useState(0);

  useEffect(() => {
    fetchTaskData();
    fetchClassData();
  }, [dadosUser]);

  async function fetchTaskData() {
    if (dadosUser?.message?.IdSchool) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL_ATHENA}/tasks/getAll/${dadosUser.message.IdSchool}`
        );
        if (!response.ok) throw new Error("Erro ao buscar dados de frequência");

        const data = await response.json();
        setTaskData({
          completed: parseFloat(data.completedPercentage),
          ongoing: parseFloat(data.ongoingPercentage),
          late: parseFloat(data.latePercentage),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
  }

  async function fetchClassData() {
    if (dadosUser?.message?.IdSchool) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL_ATHENA}/tasks/getGrades/${dadosUser.message.IdSchool}`
        );
        const data = await response.json();
        setClassData(data.classAverages);
        setOverallAverage(parseFloat(data.overallAverage));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
  }

  if (!dadosUser || !dadosUser.message) {
    return <Loading />;
  }

  if (loading) {
    return (
      <Typography variant="h5" align="center">
        Carregando...
      </Typography>
    );
  }

  if (error || !dadosUser.message.IdSchool || !dadosUser.message.name) {
    return (
      <Typography variant="h6" align="center">
        Erro ao carregar os dados do usuário
      </Typography>
    );
  }

  // Renderização condicional para a média geral
  const isPositive = overallAverage > 5;

  // Ordenar as classes pelas médias
  const sortedClasses = Object.entries(classData || {})
    .sort((a, b) => b[1].average - a[1].average)
    .slice(0, 5); // Seleciona as 5 classes com maior média

  return (
    <>
      <Header textBar2="Recados" textBar1="home" />
      <HeaderDashboards
        role={dadosUser.message.role}
        name={dadosUser.message.name}
        institution="SESI-337"
      />
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        {/* Card da Média Geral da Escola */}
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            boxShadow: 3,
            padding: 2,
            marginBottom: 3,
            borderLeft: "5px solid #004FFF", // Borda lateral azul
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // Centraliza o conteúdo
            textAlign: "center",
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
            MÉDIA GERAL DA ESCOLA
          </Typography>
          <Box sx={{ textAlign: "center", padding: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: isPositive ? "green" : "red",
              }}
            >
              {overallAverage.toFixed(2)}
            </Typography>
            {isPositive ? (
              <>
                <CheckCircle sx={{ color: "green", fontSize: 40 }} />
                <Typography variant="h6" sx={{ color: "green" }}>
                  Excelente desempenho!
                </Typography>
              </>
            ) : (
              <>
                <Error sx={{ color: "red", fontSize: 40 }} />
                <Typography variant="h6" sx={{ color: "red" }}>
                  Desempenho abaixo do esperado
                </Typography>
              </>
            )}
          </Box>

          {/* Médias das Salas dentro do Card da Média Geral */}
          <Box sx={{ padding: 2 }}>
            {sortedClasses.map(([classId, { name, average }]) => {
              // Determinar a cor com base na média da sala
              const color = average >= 7 ? "green" : average >= 5 ? "orange" : "red";
              const icon =
                average >= 7 ? (
                  <CheckCircle sx={{ color }} />
                ) : average >= 5 ? (
                  <Error sx={{ color }} />
                ) : (
                  <Error sx={{ color }} />
                );
              return (
                <Box
                  key={classId}
                  sx={{
                    marginBottom: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center", // Centraliza o conteúdo das médias das salas
                  }}
                >
                  {icon}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color }}>
                      {name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "gray" }}>
                      Média: {average.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <TodoList />

        {/* Gráficos de desempenho */}
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center", gap: "3rem" }}
        >
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              backgroundColor: "white",
              borderRadius: 5,
              borderLeft: "5px solid #004FFF", // Borda lateral azul
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
              DESEMPENHO ALUNOS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Graph
                type="bar"
                data={[
                  { name: "Acima", value: 75, color: "#004FFF" },
                  { name: "Média", value: 10, color: "#004FFF" },
                  { name: "Abaixo", value: 5, color: "#004FFF" },
                  { name: "Crítico", value: 10, color: "#004FFF" },
                ]}
              />
            </Box>
          </Grid>

          {/* Gráfico de frequência, com verificação de taskData */}
          {taskData && (
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                backgroundColor: "white",
                borderRadius: 5,
                borderLeft: "5px solid #004FFF", // Borda lateral azul
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
                DESEMPENHO NAS TAREFAS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Graph
                  type="pie"
                  data={[
                    {
                      name: "Concluídas",
                      value: taskData.completed,
                      color: "#4CAF50",
                    },
                    {
                      name: "Em andamento",
                      value: taskData.ongoing,
                      color: "#FFC107",
                    },
                    {
                      name: "Atrasadas",
                      value: taskData.late,
                      color: "#F44336",
                    },
                  ]}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashBoardDiretoria;
