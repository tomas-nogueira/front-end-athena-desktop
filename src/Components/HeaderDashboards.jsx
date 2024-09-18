import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from '../Photos/logo_athena 5.png';

function HeaderDashboards({ role, name, institution }) {
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems='center'>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100px' }} />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography sx={{ color: '#1754F0', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 30 }} variant="h6">
            SEÇÃO DIDÁTICA
            <Typography variant="body2" sx={{ color: '#676767', fontSize: 25 }}>{institution}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ fontSize: 30, display: 'flex', flexDirection: 'row' }}>
            Olá, <Typography variant="body1" sx={{ fontSize: 30, color: '#1754F0', fontWeight: 'bold' }}>{name}</Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: '#676767', fontSize: 25 }}>{role}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HeaderDashboards;
