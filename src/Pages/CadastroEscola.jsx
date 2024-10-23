import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  Alert,
  Chip,
  Autocomplete,
  FormControl,
  InputLabel
} from '@mui/material';
import { message as antdMessage } from 'antd';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Style from '../Styles/Login.module.css';
import Logo from '../Photos/logo_athena 1.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authProvider';

const CadastroEscola = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inepCode, setInepCode] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [street, setStreet] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [educationLevels, setEducationLevels] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [message,setMessage] = useState('')

  const navigate = useNavigate();

  const { CadastrarEscola, logado, cnpjContext } = useContext(AuthContext);


  function isValidCNPJ(cnpj) {
    // Validação básica de CNPJ formatado (XX.XXX.XXX/XXXX-XX)
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; 
    return regex.test(cnpj);
  }
  
  function isValidINEP(inepCode) {
    // Validação básica do código INEP (7 dígitos)
    const regex = /^\d{7}$/; 
    return regex.test(inepCode);
  }
  
  function formatCNPJ(cnpj) {
    // Formatar o CNPJ no padrão XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }
  
  function RealizaCadastroEscola() {
    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !phone || !inepCode || !cnpj || !street || !cep || !state || !city || !institutionType || !educationLevels.length || !password) {
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
  
    if (!isValidINEP(inepCode)) {
      antdMessage.error("Código INEP inválido. Deve ter 7 dígitos.");
      return;
    }
  
    if (password !== confirmpassword) {
      antdMessage.error("As senhas não coincidem");
      return;
    }
  
    // Realiza o cadastro enviando o CNPJ formatado para a API
    CadastrarEscola(name, email, phone, inepCode, formattedCNPJ, street, cep, state, city, institutionType, educationLevels, password);
  }
  
  
  useEffect(() => {
    if (logado) {
        if (cnpjContext) {
            navigate('/dashboard/escola');
        }
    }
}, [logado, navigate, cnpjContext]);

  const educationOptions = [
    "infantil",
    "fundamental I",
    "fundamental II",
    "médio",
    "técnico",
    "superior",
    "pós-graduação",
    "mestrado",
    "doutorado",
    "educação de jovens e adultos (EJA)",
    "outro",
  ];

  return (
    <div className={Style.bg}>
      <div className={Style.container}>
        <div>
          <img src={Logo} className={Style.logo} alt="Logo" />
        </div>
        <div className={Style.highbox}>
            <p className={Style.text}>CADASTRE SUA ESCOLA!</p>
            <AssignmentIndIcon className={Style.hand} />
        </div>
        <Grid elevation={3} style={{ padding: '20px', width: '100%', backgroundColor: 'transparent', border: 'none' }}>
          <form className={Style.lowcontainer}>
            <div className={Style.inputGrid}>
              <div className={Style.inputColumn}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Nome da Escola"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Email"
                    variant="standard"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Telefone"
                    variant="standard"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="CNPJ"
                    variant="standard"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Código INEP"
                    variant="standard"
                    value={inepCode}
                    onChange={(e) => setInepCode(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Confirme sua senha"
                    variant="standard"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
              </div>
              <div className={Style.inputColumn}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Rua"
                    variant="standard"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Cidade"
                    variant="standard"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="CEP"
                    variant="standard"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Estado"
                    variant="standard"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    sx={{ width: '250px' }}
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <FormControl variant="standard" sx={{ width: '250px', marginLeft: '8px' }} required>
                    <InputLabel>Tipo da Instituição</InputLabel>
                    <Select
                      value={institutionType}
                      onChange={(e) => setInstitutionType(e.target.value)}
                    >
                      <MenuItem value="escola publica">Escola Pública</MenuItem>
                      <MenuItem value="escola privada">Escola Privada</MenuItem>
                      <MenuItem value="universidade publica">Universidade Pública</MenuItem>
                      <MenuItem value="instituto técnico">Instituto Técnico</MenuItem>
                      <MenuItem value="creche">Creche</MenuItem>
                      <MenuItem value="curso livre">Curso Livre</MenuItem>
                      <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Autocomplete
  multiple
  options={educationOptions}
  value={educationLevels}
  onChange={(event, newValue) => setEducationLevels(newValue)}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="standard"
      label="Níveis de Educação"
      placeholder="Selecione"
    />
  )}
  renderTags={(value, getTagProps) =>
    value.map((option, index) => {
      // Pega as props sem incluir a key
      const { key, ...tagProps } = getTagProps({ index });
      return (
        <Chip
          key={option} // Passa a key diretamente aqui
          variant="outlined"
          label={option}
          {...tagProps} // Resto das propriedades é espalhado sem o key
          sx={{ fontWeight: 'bold' }}
        />
      );
    })
  }
  sx={{ width: '250px', marginLeft: '8px' }}
/>

                </Box>
              </div>
            </div>
            <div>
              <a href="/login/escola" className={Style.lowtext}>Já tem uma conta da escola? Faça login</a>
            </div>
            <div>
              <a href="/login" className={Style.lowtext}>Não é um usuário escola? Clique aqui</a>
            </div>
            <div className={Style.btndiv}>
              <Button size="large" variant="contained" type="button" onClick={RealizaCadastroEscola} style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>
                CADASTRAR
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    </div>
  );
};

export default CadastroEscola;
