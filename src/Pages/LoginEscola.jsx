import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Style from '../Styles/Login.module.css';
import Logo from '../Photos/logo_athena 1.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authProvider';
import { message as antdMessage } from 'antd';

const Login = () => {
  const [cnpj, setCpnj] = useState('');
  const [password, setPassword] = useState('');

  const { LoginEscola, logado, cnpjContext } = useContext(AuthContext);

  const navigate = useNavigate();

  function isValidCNPJ(cnpj) {
    // Validação básica de CNPJ formatado (XX.XXX.XXX/XXXX-XX)
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; 
    return regex.test(cnpj);
  }
  function formatCNPJ(cnpj) {
    // Formatar o CNPJ no padrão XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }

  function RealizaLoginEscolar(){
    if (!cnpj || !password) {
        antdMessage.error("Por favor, preencha todos os campos"); 
        return;
    }
    // Formata o CNPJ antes de validar
    const formattedCNPJ = formatCNPJ(cnpj);
  
    // Verifica a validade do CNPJ formatado e do código INEP
    if (!isValidCNPJ(formattedCNPJ)) {
      antdMessage.error("CNPJ inválido. Deve ter 14 dígitos.");
      return;
    }

    LoginEscola(formattedCNPJ, password)
  }
  useEffect(() => {
    if (logado) {
        if (cnpjContext) {
            navigate('/dashboard/escola');
        }
    }
}, [logado, navigate, cnpjContext]);

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
              <Button size="large" variant="contained" type="button" onClick={RealizaLoginEscolar} style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>
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
