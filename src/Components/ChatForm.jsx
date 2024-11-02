import React, { useState } from 'react';
import { TextField, IconButton, Box, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, FormControlLabel, Checkbox } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import Style from "../Styles/ChatForm.module.css";
import logoMin from '../Photos/logo_min.png';
import userIcon from '../Photos/user.png';

const ChatForm = ({ userId, userType }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);
    const [wantsToListen, setWantsToListen] = useState(false); // Novo estado para controlar a preferência de ouvir respostas
    const apiUrl = process.env.REACT_APP_BASE_URL_ASSISTHENA; 

    const handleOpenChat = () => {
        if (!localStorage.getItem('termsAccepted')) {
            setOpenTerms(true);
        } else {
            setOpenChat(true);
        }
    };

    const handleCloseChat = () => {
        setOpenChat(false);
    };

    const handleCloseTerms = () => {
        if (doNotShowAgain) {
            localStorage.setItem('termsAccepted', 'true');
        }
        setOpenTerms(false);
        setOpenChat(true);
    };

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
            fetch(`${apiUrl}/api/process`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userInput: message,
                    userId: "teste",
                    userType: "estudante"
                })
            })
                .then(response => response.json())
                .then(json => {
                    if (json.response) {
                        setMessages((prevMessages) => [...prevMessages, { text: json.response, sender: 'assisthena' }]);
                        // Se o checkbox estiver marcado, fala a resposta
                        if (wantsToListen) {
                            speakText(json.response);
                        }
                    }
                })
                .catch(error => {
                    console.error('Erro ao enviar mensagem:', error);
                });

            setMessage('');
        }
    };

    return (
        <Box className={Style.popupContainer}>
            <IconButton className={Style.chatIcon} onClick={handleOpenChat}>
                <ChatIcon className={Style.chat} />
            </IconButton>
            <Dialog
                open={openChat}
                onClose={handleCloseChat}
                fullWidth
                maxWidth="md"
                PaperProps={{ className: Style.dialogPaper, style: { position: 'fixed', bottom: '80px', right: '20px' } }}
            >
                <DialogTitle className={Style.dialogTitle}>Assisthena</DialogTitle>
                <DialogContent>
                    <List className={Style.messageList}>
                        {messages.map((msg, index) => (
                            <ListItem key={index} className={msg.sender === 'user' ? Style.userMessage : Style.assisthenaMessage}>
                                {msg.sender === 'user' ? (
                                    <>
                                        <ListItemText primary={msg.text} />
                                        <img src={userIcon} alt="User" className={Style.messageIcon} />
                                    </>
                                ) : (
                                    <>
                                        <img src={logoMin} alt="Assisthena" className={Style.messageIcon} />
                                        <ListItemText primary={msg.text} />
                                    </>
                                )}
                            </ListItem>
                        ))}
                    </List>

                    {/* Checkbox para permitir que o usuário ouça as respostas */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={wantsToListen}
                                onChange={(e) => setWantsToListen(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Ouvir as respostas"
                    />

                    <form onSubmit={handleSubmit} className={Style.form}>
                        <TextField
                            label="Digite sua mensagem"
                            variant="outlined"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={Style.textField}
                        />
                        <IconButton type="submit" color="primary" className={Style.sendButton}>
                            <SendIcon />
                        </IconButton>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Termos de uso Popup */}
            <Dialog open={openTerms} onClose={handleCloseTerms} fullWidth maxWidth="sm" className={Style.termsDialog}>
                <DialogTitle>A Athena Alerta:</DialogTitle>
                <DialogContent>
                    <p>A IA Assisthena é uma ferramenta de apoio educacional...</p>
                    <p>Ao continuar, você concorda com o uso de dados...</p>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={doNotShowAgain}
                                onChange={(e) => setDoNotShowAgain(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Não mostrar novamente"
                    />
                    <IconButton onClick={handleCloseTerms} color="primary">Aceitar</IconButton>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ChatForm;
