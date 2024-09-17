import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({
  imageSrc,  // Adicionada prop para a imagem
  word,
  wordType,
  definition,
  buttonText,
  onButtonClick
}) {
  return (
    <Card sx={{ maxWidth: 320, backgroundColor:"#BCC7CF" }}>
      <CardContent>
        {imageSrc && (
          <Box
            component="img"
            sx={{ width: '50px', mb: 2 }}
            src={imageSrc}
            alt="Card image"
          />
        )}
        <Typography variant="h5" component="div">
          {word}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {wordType}
        </Typography>
        <Typography variant="body2">
          {definition}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
