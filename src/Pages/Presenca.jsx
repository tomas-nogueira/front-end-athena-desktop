import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, CircularProgress, Box, Paper, Container } from '@mui/material';
import { notification } from 'antd';
import * as faceapi from "face-api.js";
import Header from '../Components/Header'; // Certifique-se de que o Header está corretamente configurado
import CadastroBack from '../Photos/Cadastro-back.png'; // Caminho da imagem de fundo

const Presenca = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [studentId, setStudentId] = useState(''); // Aqui você pode configurar a obtenção do ID do estudante
  const [classId, setClassId] = useState(''); // Aqui você pode configurar a obtenção do ID da turma
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      try {
        const response = await fetch('http://localhost:3030/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Dados da API:", data);

        if (response.ok && data.message) {
          const {  _id } = data.message;
          setStudentId(_id);
        } else {
            alert("erro")
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
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
        setTimeout(() => handleVideoPlay(), 2000); // Tempo para o usuário se centralizar
      })
      .catch((err) => console.error("Erro ao acessar a webcam:", err));
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
    videoRef.current.addEventListener('loadedmetadata', () => {
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detectFaces = async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

        if (detections.length > 0) {
          const descriptor = detections[0].descriptor;
          setFaceDescriptor(descriptor);
        } else {
          requestAnimationFrame(detectFaces);
        }
      };

      detectFaces();
    });
  };

  const handleSaveRecognition = async () => {
    if (faceDescriptor && studentId) {
      setIsSaving(true);
      try {
        const body = { descriptor: Array.from(faceDescriptor), studentId }; 
        const response = await fetch('http://localhost:3030/attendance/registerWithFaceDescriptor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const responseData = await response.json();
        if (response.ok) {
          notification.success({
            message: 'Sucesso',
            description: 'Reconhecimento facial salvo com sucesso!',
          });
          stopVideo();
        } else {
          notification.error({
            message: 'Erro',
            description: responseData.message || 'Erro ao salvar o reconhecimento facial.',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Erro',
          description: 'Erro ao enviar para a API.',
        });
      } finally {
        setIsSaving(false);
      }
    } else {
      notification.error({
        message: 'Erro',
        description: 'É necessário um descritor facial, ID do aluno e ID da turma.',
      });
    }
  };

  return (
    <>
      <Header textBar1="dashboard" textBar2="Registro de Presença" />
      <section style={{
        backgroundImage: `url(${CadastroBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                Registro de Presença
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
                Por favor, centralize seu rosto na câmera antes de iniciar.
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    style={{ width: '100%', borderRadius: '10px', marginBottom: '20px', display: cameraActive ? 'block' : 'none' }}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{ position: 'absolute', left: 0, top: 0, display: cameraActive ? 'block' : 'none' }}
                  />
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
                        onClick={handleSaveRecognition}
                        disabled={isSaving}
                        sx={{ marginTop: '20px', backgroundColor: '#2196f3', color: '#fff', borderRadius: '25px', padding: '10px 20px' }}
                      >
                        {isSaving ? <CircularProgress size={24} /> : 'Salvar Reconhecimento'}
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </Container>
      </section>
    </>
  );
};

export default Presenca;
