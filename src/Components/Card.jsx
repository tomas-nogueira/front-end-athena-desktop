import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({
  image,
  title,
  description,
  button1Text,
  button2Text,
  button1Route,
  button2Route
}) {
  const navigate = useNavigate(); // Hook para navegação

  const handleButton1Click = () => {
    navigate(button1Route); // Navegar para a rota do botão 1
  };

  const handleButton2Click = () => {
    navigate(button2Route); // Navegar para a rota do botão 2
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleButton1Click}>
          {button1Text}
        </Button>
        <Button size="small" onClick={handleButton2Click}>
          {button2Text}
        </Button>
      </CardActions>
    </Card>
  );
}
