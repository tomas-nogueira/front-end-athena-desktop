import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from '../Photos/logo_athena 5.png';

function HeaderDashboards({ role, name, institution }) {
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingX: { xs: 2, sm: 0 } }}>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems='center'>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px' }} />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: '#1754F0',
              fontWeight: 'bold',
              fontSize: { xs: 22, sm: 30 },
              textAlign: 'center',
            }}
            variant="h6"
          >
            SEÇÃO DIDÁTICA
            <Typography variant="body2" sx={{ color: '#676767', fontSize: { xs: 18, sm: 25 } }}>
              {institution}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ fontSize: { xs: 18, sm: 30 }, display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            Olá, 
            <Typography variant="body1" sx={{ fontSize: { xs: 20, sm: 30 }, color: '#1754F0', fontWeight: 'bold' }}>
              {name}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: '#676767', fontSize: { xs: 16, sm: 25 } }}>
            {role}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HeaderDashboards;
