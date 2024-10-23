import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Style from '../Styles/Login.module.css';
import Logo from '../Photos/logo_athena 1.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [cnpj, setCpnj] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:8080/school/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        cnpj, 
        password 
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.token) {
        localStorage.setItem("token", json.token);
        setMessage(json.message || "Login realizado com sucesso!"); // Mensagem de sucesso ou do backend
        setTimeout(() => {
          navigate('/dashboard/escola');
        }, 1000); // Aguarda 1 segundo antes de redirecionar
      } else {
        setMessage(json.message || "Erro ao fazer login, tente novamente.");
      }
    })
    .catch(error => {
      setMessage("Erro ao tentar realizar o login.");
      console.error("Error:", error);
    });
  };

  return (
    <div className={Style.bg}>
      <div className={Style.container}>
        <div>
          <img src={Logo} className={Style.logo} alt="Logo" />
        </div>
        <div className={Style.highbox}>
          <p className={Style.text}>FAÇA LOGIN!</p>
          <AccountCircle className={Style.hand} />
        </div>
        {message && 
          (<Alert variant='filled' severity="info" sx={{ textAlign:"center", borderRadius: '5px'}}>{message}</Alert>)
        }
        <Grid elevation={3} style={{ padding: '20px', width: '100%', backgroundColor: 'transparent', border: 'none' }}>
          <form className={Style.lowcontainer}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="CNPJ"
                variant="standard"
                type="text"
                value={cnpj}
                onChange={(e) => setCpnj(e.target.value)}
                sx={{ width: '250px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Senha"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: '250px' }}
                required
              />
            </Box>
            <div>
              <a href="/cadastro/escola" className={Style.lowtext}>Não tem uma conta da escola? Faça o cadastro</a>
            </div>
            <div>
              <a href="/login" className={Style.lowtext}>Não é um usuário escola? Clique aqui</a>
            </div>
            <div className={Style.btndiv}>
              <Button size="large" variant="contained" type="button" onClick={handleLogin} style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>
                LOGIN
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
