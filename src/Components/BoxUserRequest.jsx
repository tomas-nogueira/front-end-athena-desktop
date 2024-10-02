import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserRequestBox = ({ name, rm, userId, IdSchool }) => {
  const handleApprove = () => {
    console.log(IdSchool, userId)
    fetch(`http://localhost:8080/user/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ IdSchool, userId, }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Aprovação:', data);
      // Lógica pós aprovação
    })
    .catch((error) => {
      console.error('Erro ao aprovar o usuário:', error);
    });
  };

  const handleReject = () => {
    fetch(`http://localhost:8080/user/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, IdSchool }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Rejeição:', data);
      // Aqui você pode adicionar lógica para atualizar a interface após a rejeição
    })
    .catch((error) => {
      console.error('Erro ao rejeitar o usuário:', error);
    });
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2, 
        padding: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 1,
        width: '80vw',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AccountCircleIcon sx={{ fontSize: 40 }} />
        <Typography variant="body1" fontWeight="bold">{name}</Typography>
        <Typography variant="body2" color="textSecondary">CPF: {rm}</Typography>
      </Box>
      <Typography variant="body1" textAlign="center">Quer ingressar na sua escola</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton color="success" onClick={handleApprove}>
          <CheckCircleIcon />
        </IconButton>
        <IconButton color="error" onClick={handleReject}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserRequestBox;
