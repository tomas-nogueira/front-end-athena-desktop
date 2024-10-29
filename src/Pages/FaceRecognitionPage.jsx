import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import * as faceapi from "face-api.js";

const FaceRecognitionPage = ({ onFaceDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [mediaStream, setMediaStream] = useState(null); // Armazenar o stream da câmera

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      ]);
      setIsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      startVideo();
    }

    return () => {
      // Parar o stream quando o componente for desmontado
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isLoaded, mediaStream]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setMediaStream(stream); // Armazena o stream
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleVideoPlay = async () => {
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
          setFaceDescriptor(descriptor); // Salvar o descriptor no estado
          stopVideo(); // Parar a câmera após detectar o rosto
        } else {
          requestAnimationFrame(detectFaces);
        }
      };

      detectFaces();
    });
  };

  const handleSaveRecognition = async () => {
    if (faceDescriptor) {
      try {
        const response = await fetch('http://localhost:3030/face', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ descriptor: Array.from(faceDescriptor) })
        });
        if (response.ok) {
          alert("Reconhecimento facial salvo com sucesso!");
          onFaceDetected(); // Chame a função de callback para o face detected
        } else {
          alert("Erro ao salvar o reconhecimento facial.");
        }
      } catch (error) {
        console.error("Erro ao enviar para a API:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Reconhecimento Facial</h1>
      <video
        ref={videoRef}
        autoPlay
        onPlay={handleVideoPlay}
        style={{ width: '640px', height: '480px', display: faceDescriptor ? 'none' : 'block' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: 0, top: 0, display: faceDescriptor ? 'none' : 'block' }}
      />
      {faceDescriptor ? (
        <Button variant="contained" onClick={handleSaveRecognition}>
          Salvar Reconhecimento
        </Button>
      ) : (
        <Button variant="contained" onClick={startVideo} disabled={!isLoaded}>
          Iniciar Webcam
        </Button>
      )}
    </div>
  );
};

export default FaceRecognitionPage;
