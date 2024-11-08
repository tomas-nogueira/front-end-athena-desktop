import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Chip,
  Autocomplete,
} from "@mui/material";
import { message as antdMessage } from "antd";
import Header from "../Components/Header";
import CadastroBack from "../Photos/Cadastro-back.png";

function CadastroExperiencia() {
  const [title, setTitle] = useState(""); // Título da experiência
  const [description, setDescription] = useState(""); // Descrição da experiência
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function CadastrarExperiencia() {
    const token = localStorage.getItem("token");

    fetch(`${apiUrl}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.experience) {
          antdMessage.success("Experiência cadastrada com sucesso!");
          setSuccessMessage("Experiência cadastrada com sucesso!");
          // Limpar os campos após o cadastro
          setTitle("");
          setDescription("");
        } else {
          throw new Error("Erro ao cadastrar experiência.");
        }
      })
      .catch((error) => {
        antdMessage.error("Erro ao cadastrar a experiência.");
        setErrorMessage("Erro ao cadastrar a experiência.");
        console.error("Erro ao cadastrar experiência:", error);
      });
  }

  return (
    <>
      <Header textBar1="hoME2" />
      <section
        style={{
          backgroundImage: `url(${CadastroBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            CadastrarExperiencia();
          }}
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 600,
            width: "100%",
            textAlign: "center",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" mb={2}>
            Cadastro de Experiência
          </Typography>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          {/* Campos de Cadastro de Experiência */}
          <TextField
            label="Título da Experiência"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descrição da Experiência"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4} // Campo para descrição em múltiplas linhas
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Cadastrar Experiência
          </Button>
        </Box>
      </section>
    </>
  );
}

export default CadastroExperiencia;
