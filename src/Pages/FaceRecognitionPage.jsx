import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import * as faceapi from "face-api.js";

const FaceRecognitionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState(null);

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
  }, [isLoaded]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
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

        // Verificar se há detecções e pegar o descriptor
        if (detections.length > 0) {
          const descriptor = detections[0].descriptor; // Pega o primeiro descriptor
          setFaceDescriptor(descriptor); // Armazena o descriptor no estado
          console.log("Face Descriptor:", descriptor); // Exibe no console
        }

        requestAnimationFrame(detectFaces); // Chama a função novamente para a próxima frame
      };

      detectFaces(); // Inicia a detecção
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Reconhecimento Facial</h1>
      <video
        ref={videoRef}
        autoPlay
        onPlay={handleVideoPlay}
        style={{ width: '640px', height: '480px' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: 0, top: 0 }}
      />
      <Button variant="contained" onClick={startVideo} disabled={isLoaded === false}>
        Iniciar Webcam
      </Button>
    </div>
  );
};

export default FaceRecognitionPage;
