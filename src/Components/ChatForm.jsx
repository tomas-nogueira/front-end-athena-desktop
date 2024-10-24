import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, FormControlLabel, Checkbox } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import Style from "../Styles/ChatForm.module.css";
import logoMin from '../Photos/logo_min.png';
import userIcon from '../Photos/user.png';

const ChatForm = ({ onSendMessage, userId, userType }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false); // Estado para o checkbox

    useEffect(() => {
        // Verifica se o usuário já optou por não mostrar os termos novamente
        const termsAccepted = localStorage.getItem('termsAccepted');
        if (!termsAccepted) {
            setOpenTerms(true); // Abre os termos de uso se não foi aceito
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);

            fetch("http://localhost:3030/teste/assisthena/message", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    userId: "userId",
                    userType: "professor"
                })
            })
                .then(response => response.json())
                .then(json => {
                    if (json.response) {
                        setMessages((prevMessages) => [...prevMessages, { text: json.response, sender: 'assisthena' }]);
                    }
                })
                .catch(error => {
                    console.error('Erro ao enviar mensagem:', error);
                });

            setMessage('');
        }
    };

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

    return (
        <Box className={Style.popupContainer}>
            <IconButton className={Style.chatIcon} onClick={handleOpenChat}>
                <ChatIcon />
            </IconButton>

            <Dialog open={openChat} onClose={handleCloseChat} className={Style.dialog} fullWidth maxWidth="md" PaperProps={{ className: Style.dialogPaper }}>
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

            {/* Termos de uso Popup, centralizado na tela */}
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
