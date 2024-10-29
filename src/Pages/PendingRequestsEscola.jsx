import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Grid, Typography } from '@mui/material';
import UserRequestBox from '../Components/BoxUserRequest';

function PendingRequestsEscola() {
  const [schoolId, setSchoolId] = useState('');
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:3030/school/data", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
      setSchoolId(json.message._id);
    });
  }, []);

  function GetPendingRequests(){
    const token = localStorage.getItem('token');
    if (schoolId) {
      fetch(`http://localhost:3030/schools/${schoolId}/pending-requests`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((resposta) => resposta.json())
      .then((json) => {
        if (json.pendingUsers) {
          setPendingUsers(json.pendingUsers);
        }
      });
    }
  }

  useEffect(() => {
    GetPendingRequests();
  }, [schoolId]);

  // Função para remover usuário da lista local
  const removeUserFromList = (userId) => {
    setPendingUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
  };

  return (
    <>
      <Header />
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Grid item xs={12} sm={10} sx={{ backgroundColor: 'white', borderRadius: 2, padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxShadow: 2, height: '600px', maxWidth: '900px', gap: 5 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>SOLICITAÇÕES PENDENTES</Typography>
          <Grid container direction="column" spacing={2} sx={{ width: '100%' }}>
            {pendingUsers.map((user) => (
              <Grid item key={user._id}>
                <UserRequestBox 
                  name={user.name} 
                  rm={user.cpf} 
                  userId={user._id} 
                  IdSchool={schoolId}
                  removeUserFromList={removeUserFromList} // Passa a função de remoção
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PendingRequestsEscola;
