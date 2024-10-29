import React, { useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import "../Styles/FaceLogin.css";
import { AuthContext } from '../Context/authProvider';

function FaceLogin() {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mediaStream, setMediaStream] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
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
            if (!loggedIn) {
                detectFace();
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            closeCamera();
        };
    }, [loggedIn]);

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
            handleFaceLogin(detections);
        }
    };

    const handleFaceLogin = async (detections) => {
        const descriptor = Array.from(detections.descriptor);
        await LoginFacial(descriptor);
        const role = localStorage.getItem("role")
        if (role === 'estudante') {
            navigate('/home/aluno');
        } 
        else if (role === 'professor') {
            navigate('/home/professor');
        } 
        else if (role === 'diretor' || role === 'coordenador') {
            navigate('/dashboard/diretoria');
        } 
        else if (role === 'inspetor' || role === 'limpeza' || role === 'cozinha') {
            navigate('/dashboard/funcionarios');
        } 
        closeCamera();
    };

    return (
        <div className="face-login-container">
            <h2>Login com Reconhecimento Facial</h2>
            <video ref={videoRef} autoPlay muted width="480" height="360" onPlay={() => setIsLoading(false)} />
            {isLoading ? <p>Carregando...</p> : <p>Aguardando reconhecimento facial...</p>}
        </div>
    );
}

export default FaceLogin;
