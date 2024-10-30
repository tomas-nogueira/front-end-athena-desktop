import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GradeIcon from '@mui/icons-material/Grade';

function CardNota({ teacherName, subjectTask, feedbackTask, gradeTask }) {
  const getIcon = (grade) => {
    if (grade <= 4) {
      return <SentimentDissatisfiedIcon sx={{ color: '#FF4C4C', fontSize: 70 }} />;
    } else if (grade >= 5 && grade <= 7) {
      return <SentimentSatisfiedAltIcon sx={{ color: '#FFA500', fontSize: 70 }} />;
    } else {
      return <EmojiEmotionsIcon sx={{ color: '#83E509', fontSize: 70 }} />;
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 10,
        boxShadow: 3,
        backgroundColor: "#FFFFFF",
        maxWidth: '400px',
        margin: '1rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 2 }}>
          {subjectTask}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 1 }}>
          <PersonIcon sx={{ color: '#666', marginRight: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#555' }}>
            Professor(a): <span style={{ fontWeight: 'normal' }}>{teacherName}</span>
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', width: '100%', margin: '12px 0' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666' }}>
            FEEDBACK:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
            <FeedbackIcon sx={{ color: '#666', marginRight: 1 }} />
            <Typography variant="body2" sx={{ color: '#444', fontStyle: 'italic', backgroundColor: '#e3f2fd', padding: '8px', borderRadius: '5px' }}>
              "{feedbackTask}"
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', width: '100%', margin: '12px 0' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666' }}>
            NOTA:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d1e7dd', borderRadius: '5px', padding: '10px', margin: '8px 0' }}>
            <GradeIcon sx={{ color: '#666', marginRight: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
              {gradeTask}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          {getIcon(gradeTask)}
        </Box>
      </CardContent>
      <Box sx={{
        padding: '8px',
        backgroundColor: '#f0f0f0',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        textAlign: 'center'
      }}>
        <Typography variant="caption" sx={{ color: '#777' }}>
          Última Atualização: {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Card>
  );
}

export default CardNota;
