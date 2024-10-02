import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Grid, Typography } from '@mui/material';
import UserRequestBox from '../Components/BoxUserRequest';

function PendingRequestsEscola() {
  const [schoolId, setSchoolId] = useState('');
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8080/school/data", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
        console.log(json.message)
      setSchoolId(json.message._id);
    });
  }, []);

  useEffect(() => {
    if (schoolId) {
      fetch(`http://localhost:8080/schools/${schoolId}/pending-requests`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resposta) => resposta.json())
      .then((json) => {
        console.log(json);
        if (json.pendingUsers) {
          setPendingUsers(json.pendingUsers);
          console.log(schoolId)
        }
      });
    }
  }, [schoolId]);

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
                  userId={user._id} // Passa o ID do usuário
                  IdSchool={schoolId} // Passa o ID da escola
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
