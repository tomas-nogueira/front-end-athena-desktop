import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [school, setSchool] = React.useState('');

  const handleChange = (event) => {
    setSchool(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Escola</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={school}
          label="School"
          onChange={handleChange}
        >
          <MenuItem value={10}>SESI</MenuItem>
          <MenuItem value={20}>SENAI</MenuItem>
          <MenuItem value={30}>COC</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}