import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, CircularProgress, Box, Paper, Container, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { notification } from 'antd';
import * as faceapi from "face-api.js";
import Header from '../Components/Header';
import CadastroBack from '../Photos/Cadastro-back.png';

const FaceRecognitionPage = ({ onFaceDetected = () => {} }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [password, setPassword] = useState('');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [attempts, setAttempts] = useState(0); 
  const [isBlocked, setIsBlocked] = useState(false);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA; 
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [home, setHome] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      if (role === 'estudante') {
        setHome('HOME');
      } else if (role === 'diretor') {
        setHome('home');
      } else if (role === 'professor') {
        setHome('Home');
      } else {
        setHome(''); 
      }
    }
    const blockedData = localStorage.getItem('accessBlocked');
    if (blockedData) {
      const { timeBlocked, attemptsCount } = JSON.parse(blockedData);
      const currentTime = Date.now();
      const elapsedTime = currentTime - timeBlocked;


      if (elapsedTime < 43200000) { 
          setIsBlocked(true);
          setAttempts(attemptsCount);
          setTimeRemaining(43200000 - elapsedTime); 
          const timeToUnlock = setTimeout(() => {
              localStorage.removeItem('accessBlocked');
              setIsBlocked(false);
              setAttempts(0);
          }, 43200000 - elapsedTime);
      
      
        return () => clearTimeout(timeToUnlock);
      } else {
        localStorage.removeItem('accessBlocked');
      }
    }
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      ]);
      setIsLoaded(true);
      setLoading(false);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const checkImageExists = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/check-image`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setImageExists(data.imageExists);
    };
    checkImageExists();
  }, [apiUrl]);

  useEffect(() => {
    if (isLoaded && cameraActive) {
      handleVideoPlay();
    }
    return () => {
      stopVideo();
    };
  }, [isLoaded, cameraActive]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
        setCameraActive(true);
        setTimeout(() => handleVideoPlay(), 2000); 
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const stopVideo = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setCameraActive(false);
    }
    setFaceDescriptor(null);
  };

  const handleVideoPlay = () => {
    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };
  
    if (canvasRef.current) {
      canvasRef.current.width = displaySize.width;
      canvasRef.current.height = displaySize.height;
      faceapi.matchDimensions(canvasRef.current, displaySize);
  
      const detectFaces = async () => {
        if (!videoRef.current || !canvasRef.current) return;
  
        const detections = await faceapi.detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptors();
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
  
        if (detections.length > 0) {
          const descriptor = detections[0].descriptor;
          setFaceDescriptor(descriptor);
        }
  
        requestAnimationFrame(detectFaces);
      };
  
      detectFaces();
    }
  };

  const handleSaveRecognition = async () => {
    const token = localStorage.getItem('token');

    if (faceDescriptor) {
      setIsSaving(true);
      try {
        const body = { descriptor: Array.from(faceDescriptor), password };
        const response = await fetch(`${apiUrl}/face`, {
          method: imageExists ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(body)
        });
  
        const responseData = await response.json();
        if (response.ok) {
          notification.success({
            message: 'Sucesso',
            description: 'Reconhecimento facial salvo com sucesso!',
          });
          onFaceDetected();
          stopVideo();
        } else {
          notification.error({
            message: 'Erro',
            description: responseData.message || 'Erro ao salvar o reconhecimento facial.',
          });
          setAttempts(prev => prev + 1); // Incrementar tentativas
          if (attempts + 1 >= 3) {
            setIsBlocked(true);
            const currentTime = Date.now();
            localStorage.setItem('accessBlocked', JSON.stringify({ timeBlocked: currentTime, attemptsCount: attempts + 1 }));
            setTimeout(() => {
                setIsBlocked(false);
                setAttempts(0);
            }, 43200000); // 12 horas em milissegundos
        }
        
        }
      } catch (error) {
        notification.error({
          message: 'Erro',
          description: 'Erro ao enviar para a API.',
        });
      } finally {
        setIsSaving(false);
        setOpenPasswordDialog(false);
        setPassword('');
      }
    }
  };


  const handlePasswordSubmit = async () => {
    if (isBlocked) {
      const hoursRemaining = Math.ceil(timeRemaining / 3600000); // Converte milissegundos em horas
      notification.error({
        message: 'Acesso Bloqueado',
        description: `Você excedeu o número de tentativas. Tente novamente em ${hoursRemaining} horas.`,
    });
      return;
    }
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/confirm-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      handleSaveRecognition();
    } else {
      notification.error({
        message: 'Senha Incorreta',
        description: 'A senha inserida está incorreta. Tente novamente.',
      });
      setAttempts(prev => prev + 1); // Incrementar tentativas
      if (attempts + 1 >= 3) {
        setIsBlocked(true);
        const currentTime = Date.now();
        localStorage.setItem('accessBlocked', JSON.stringify({ timeBlocked: currentTime, attemptsCount: attempts + 1 }));
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
        }, 86400000); // 24 horas em milissegundos
      }
    }
  };

  return (
    <>
      <Header textBar1={home} />
      <section style={{
        backgroundImage: `url(${CadastroBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative'
      }}>
        <Container maxWidth="md" style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: 2,
            borderRadius: '15px',
          }}>
            <Paper elevation={5} sx={{
              padding: 3,
              borderRadius: '15px',
              textAlign: 'center',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
            }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#2196f3' }}>
                Reconhecimento Facial
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
                Por favor, centralize seu rosto na câmera antes de iniciar.
              </Typography>

              {isBlocked && (
                <Typography variant="body2" color="error">
                  Você excedeu o número de tentativas. Tente novamente em {Math.ceil(timeRemaining / 3600000)} horas.
                </Typography>
              )}
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                    <video
                      ref={videoRef}
                      autoPlay
                      style={{ width: '100%', borderRadius: '10px', display: cameraActive ? 'block' : 'none' }}
                    />
                    <canvas
                      ref={canvasRef}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        display: cameraActive ? 'block' : 'none'
                      }}
                    />
                  </div>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    {!cameraActive ? (
                      <Button
                        variant="contained"
                        onClick={startVideo}
                        sx={{ backgroundColor: '#2196f3', color: '#fff', borderRadius: '25px', padding: '10px 20px', marginBottom: '10px' }}
                      >
                        Abrir Câmera
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={stopVideo}
                        sx={{ backgroundColor: '#f44336', color: '#fff', borderRadius: '25px', padding: '10px 20px', marginBottom: '10px' }}
                      >
                        Fechar Câmera
                      </Button>
                    )}
                    {faceDescriptor && (
                      <Button
                        variant="contained"
                        onClick={() => setOpenPasswordDialog(true)}
                        disabled={isSaving || isBlocked}
                        sx={{ marginTop: '20px', backgroundColor: '#2196f3', color: '#fff', borderRadius: '25px', padding: '10px 20px' }}
                      >
                        {isSaving ? <CircularProgress size={24} /> : imageExists ? 'Atualizar Face' : 'Salvar Reconhecimento'}
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </Container>
      </section>
      
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Confirmação de Senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, insira sua senha para continuar com a atualização facial.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isBlocked} // Desabilitar se bloqueado
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FaceRecognitionPage;
