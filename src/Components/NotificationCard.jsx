import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box } from '@mui/material';
import styles from '../Styles/NotificationCard.module.css';

const NotificationCard = ({ message, userId, userType }) => {
  const [open, setOpen] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    setLoading(true);

    fetch("http://localhost:3030/teste/assisthena/message", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        userId: "67102922db9e7ba8075983e9",
        userType: "default",
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.response) {
          const formattedResponse = formatResponse(json.response);
          setChatLog(prevMessages => [...prevMessages, { text: formattedResponse, sender: 'assisthena' }]);
        }
      })
      .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
      })
      .finally(() => {
        setLoading(false);
        handleOpen();
      });
  };

  // Função para formatar o texto da resposta do backend
  const formatResponse = (responseText) => {
    return responseText
      .replace(/\n\n/g, "\n\n") // Duas quebras de linha para parágrafos
      .replace(/### (.+)\n/g, "<strong>$1</strong>\n") // Títulos em negrito
      .replace(/- \*\*(.+?)\*\*/g, "<li><strong>$1</strong></li>"); // Bullet points com negrito
  };

  return (
    <>
      <Card className={styles.notificationCard}>
        <CardContent>
          <Typography variant="h6" component="div">
            Entenda melhor os dados com Assisthena IA!
          </Typography>

          <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>
            {loading ? 'Enviando...' : 'Saiba Mais'}
          </Button>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose} aria-labelledby="chat-modal" aria-describedby="chat-modal-description">
        <Box className={styles.modalBox}>
          <Box sx={{ display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}>          
            <Typography id="chat-modal" variant="h6" component="h2">
            Assisthena
          </Typography>
            <Button variant="outlined" onClick={handleClose}>
              Fechar
            </Button>

          </Box>

          <Box className={styles.chatLog}>
            {chatLog.map((log, index) => (
              <Typography key={index} variant="body1" dangerouslySetInnerHTML={{ __html: log.text }} />
            ))}
          </Box>
          <Box className={styles.buttonsContainer}>
            <Button variant="outlined" color="primary" onClick={() => handleClick('Entenda Melhor')}>
              Entenda Melhor
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleClick('Insights')}>
              Insights
            </Button>
            <Button variant="outlined" color="success" onClick={() => handleClick('Aplicar Athena')}>
              Aplicar Athena
            </Button>
          </Box>

        </Box>
      </Modal>
    </>
  );
};

export default NotificationCard;
