import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputWithIcon(props) {

    const { name, type, icon: Icon } = props;

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {Icon && <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
        <TextField id="input-with-sx" label={name} variant="standard" type={type} sx={{ width: '250px'}}/>
      </Box>
    </Box>
  );
}