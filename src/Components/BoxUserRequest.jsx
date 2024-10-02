import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserRequestBox = ({ name, rm }) => {
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
        <Typography variant="body2" color="textSecondary">RM: {rm}</Typography>
      </Box>
      <Typography variant="body1" textAlign="center">Quer ingressar na sua escola</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton color="success">
          <CheckCircleIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserRequestBox;
