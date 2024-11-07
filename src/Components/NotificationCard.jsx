import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box } from '@mui/material';
import styles from '../Styles/NotificationCard.module.css';

const NotificationCard = ({ year, userId, userType }) => {
  const [open, setOpen] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInsights, setIsInsights] = useState(false); 
  const apiUrl = process.env.REACT_APP_BASE_URL_ASSISTHENA; 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    setLoading(true);
    setChatLog([]); 

    const dynamicMessage = `O professor está pedindo mais detalhes e feedbacks e insights sobre o ${year}`;

    fetch(`${apiUrl}/api/process`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: dynamicMessage,
        userId: "professor",
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

  const getInsights = async () => {
    setLoading(true);
    setChatLog([]); 
    setIsInsights(true);

    const messageInsights = `quais são os tópicos mais importantes para o  ${year}`

    fetch(`${apiUrl}/api/process`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: messageInsights,
        userType: "default",
        userId: "professor",

      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.insight) {
          const formattedResponse = formatResponse(json.insight);
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

  const formatResponse = (responseText) => {
    return responseText
      .replace(/\n\n/g, "\n\n")
      .replace(/### (.+)\n/g, "<strong>$1</strong>\n")
      .replace(/- \*\*(.+?)\*\*/g, "<li><strong>$1</strong></li>");
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
              {isInsights ? "Insight Especial Athena" : "Assisthena"}
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
            {isInsights ? (
              <Button variant="outlined" onClick={() => { setIsInsights(false); setChatLog([]); handleClick(); }}>
                Voltar ao Feedback Detalhado
              </Button>
            ) : (
              <>
                <Button variant="outlined" color="primary" onClick={() => { handleClick(); setIsInsights(false); }}>
                  Entenda Melhor
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => { getInsights(); }}>
                  Insights
                </Button>
              </>
            )}
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
