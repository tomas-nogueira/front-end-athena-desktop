import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { message as antdMessage } from 'antd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserRequestBox = ({ name, rm, userId, IdSchool, removeUserFromList }) => {
  const apiUrl = process.env.BASE_URL_ATHENA; 

  const handleApprove = () => {
    fetch(`${apiUrl}/user/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ IdSchool, userId }),
    })
    .then((res) => res.json())
    .then((json) => {
        if(json.message && json.user){
        antdMessage.info('Usuário aprovado com sucesso!');
        removeUserFromList(userId); // Remove o usuário da lista
      }
      else{
        antdMessage.error('Erro ao aprovar o usuário:')
      }
    })
    .catch((error) => {
      antdMessage.error('Erro ao aprovar o usuário:', error)
    });
  };

  const handleReject = () => {
    fetch(`${apiUrl}/user/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, IdSchool }),
    })
    .then((res) => res.json())
    .then((data) => {
      antdMessage.info('Usuário rejeitado com sucesso!');
      removeUserFromList(userId); // Remove o usuário da lista
    })
    .catch((error) => {
      console.error('Erro ao rejeitar o usuário:', error);
      antdMessage.error('Erro ao rejeitar o usuário:', error);    });
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
