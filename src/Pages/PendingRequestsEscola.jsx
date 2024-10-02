import React from 'react'
import Header from '../Components/Header'
import { Grid, Typography } from '@mui/material';
import UserRequestBox from '../Components/BoxUserRequest';

function PendingRequestsEscola() {
  return (
    <>
      <Header />
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        <Grid item xs={12} sm={10} sx={{ backgroundColor: 'white', borderRadius: 2, padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxShadow: 2, height: '600px',maxWidth: '900px', gap: 5  }}>
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>SOLICITAÇÕES PENDENTES</Typography>
          <Grid container direction="column" spacing={2}sx={{ width: '100%' }}>
            <Grid item>
              <UserRequestBox name="Tomás" rm="3416" />
            </Grid>
            <Grid item>
              <UserRequestBox name="Valmir" rm="3416" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PendingRequestsEscola;
