import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Carinha feliz
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; // Carinha triste
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'; // Carinha neutra

function CardNota({ teacherName, subjectTask, feedbackTask, gradeTask }) {
  // Lógica para determinar o ícone com base na nota
  const getIcon = (grade) => {
    if (grade <= 4) {
      return <SentimentDissatisfiedIcon sx={{ color: '#004FFF', fontSize: 50 }} />; // Carinha triste
    } else if (grade >= 5 && grade <= 7) {
      return <SentimentSatisfiedAltIcon sx={{ color: '#004FFF', fontSize: 50  }} />; // Carinha neutra
    } else {
      return <EmojiEmotionsIcon sx={{ color: '#004FFF', fontSize: 50  }} />; // Carinha feliz
    }
  };

  return (
    <Card variant="outlined" sx={{ paddingLeft: 5, paddingRight: 5, borderRadius: 2, boxShadow: 2, backgroundColor: "#D9D9D9", maxWidth: '400px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          Professor(a): 
          <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>{teacherName}</Typography>
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          Tarefa de: 
          <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>{subjectTask}</Typography>
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center', color: '#004FFF', fontWeight: 'bold' }}>
          FEEDBACK: 
          <Typography variant="h6" sx={{ fontWeight: 'bolder', color:'black' }}>{feedbackTask}</Typography>
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center', color: '#004FFF', fontWeight: 'bold' }}>
          NOTA: 
          <Typography variant="h6" sx={{ fontWeight: 'bolder', color:'black' }}>{gradeTask}</Typography>
        </Typography>
        <Typography>
            {getIcon(gradeTask)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardNota;
