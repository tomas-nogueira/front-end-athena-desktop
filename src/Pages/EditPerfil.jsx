import React, { useState, useEffect, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { AuthContext } from "../Context/authProvider";
import { useNavigate } from 'react-router-dom';
import Style from "../Styles/EditPerfil.module.css";
import Footer from '../Components/Footer';
import Header from '../Components/Header';



const EditPerfil = () => {
  const { userId } = useContext(AuthContext);
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [street, setStreet] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token de autenticação não encontrado.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3030/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Dados da API:", data);

        if (response.ok && data.message) {
          const { name, email, phone, cpf, _id, address } = data.message;
          setName(name || '');
          setEmail(email || '');
          setPhone(phone || '');
          setCpf(cpf || '');
          setStreet(address?.street || '');
          setCep(address?.cep || '');
          setState(address?.state || '');
          setId(_id);
          setCity(address?.city || '');
        } else {
          setError(data.message || 'Erro ao buscar dados do usuário.');
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setError('Erro ao buscar dados do usuário.');
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token de autenticação não encontrado.');
      return;
    }

    if (!id) {
      setError('ID de usuário não encontrado.');
      return;
    }

    console.log("Atualizando usuário com ID:", id);

    try {
     

      const response = await fetch(`http://localhost:3030/user/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          cpf,
          address: {
            street,
            cep,
            state,
            city,
          },
        }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (response.ok) {
        setMessage(data.message || 'Usuário atualizado com sucesso.');
      } else {
        setError(data.message || 'Erro ao atualizar usuário.');
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      setError('Erro ao atualizar dados do usuário.');
    }
  };

  return (
    <div className={Style.bg}>
      <div className={Style.header}>
        <Header textBar1="Home"/>
      </div>
      <div className={Style.container}>
        <div className={Style.highbox}>
          <p className={Style.text}>Edite o seu perfil</p>
          <AssignmentIndIcon className={Style.hand} />
        </div>
        {error && (
          <Alert variant='filled' severity="error" sx={{ textAlign:"center", borderRadius: '5px' }}>{error}</Alert>
        )}
        {message && (
          <Alert variant='filled' severity="info" sx={{ textAlign:"center", borderRadius: '5px' }}>{message}</Alert>
        )}
        <Grid elevation={3} style={{ padding: '20px', width: '100%', backgroundColor: 'transparent', border: 'none' }}>
          <form className={Style.lowcontainer}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Nome"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Email"
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Telefone"
                variant="standard"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="CPF"
                variant="standard"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Rua"
                variant="standard"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="CEP"
                variant="standard"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Estado"
                variant="standard"
                value={state}
                onChange={(e) => setState(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: "20px" }}>
              <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Cidade"
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ width: '450px' }}
                required
              />
            </Box>
            <div className={Style.btndiv}>
              <Button size="large" variant="contained" type="button" onClick={handleSubmit} style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>
                Atualizar
              </Button>
            </div>
          </form>
        </Grid>
      </div>
      <Footer/>
    </div>
  );
};

export default EditPerfil;
