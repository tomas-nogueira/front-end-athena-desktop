import React, { useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import "../Styles/FaceLogin.css";
import { AuthContext } from '../Context/authProvider';

function FaceLogin() {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mediaStream, setMediaStream] = useState(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const navigate = useNavigate();
    const { LoginFacial } = useContext(AuthContext);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            startVideo();
        };
        loadModels();

        const intervalId = setInterval(() => {
            if (!faceDetected) {
                detectFace();
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            closeCamera();
        };
    }, [faceDetected]);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then(stream => {
                videoRef.current.srcObject = stream;
                setMediaStream(stream);
            })
            .catch(err => console.error("Erro ao acessar a câmera:", err));
    };

    const closeCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    const detectFace = async () => {
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detections) {
            setFaceDetected(true); 
        }
    };

    const handleFaceLogin = async () => {
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detections) {
            const descriptor = Array.from(detections.descriptor);
            await LoginFacial(descriptor);
            closeCamera();
        }
    };

    return (
        <div className="face-login-container">
            <h2>Login com Reconhecimento Facial</h2>
            <video ref={videoRef} autoPlay muted width="480" height="360" onPlay={() => setIsLoading(false)} />
            {isLoading ? <p>Carregando...</p> : <p>Aguardando reconhecimento facial...</p>}
            
            {faceDetected && (
                <button onClick={handleFaceLogin} className="login-button">
                    Login
                </button>
            )}

            <button onClick={closeCamera} className="close-button">
                Fechar Câmera
            </button>
        </div>
    );
}

export default FaceLogin;
