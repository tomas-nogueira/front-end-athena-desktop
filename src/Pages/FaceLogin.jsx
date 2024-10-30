import React, { useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import  Style from "../Styles/FaceLogin.module.css";
import { AuthContext } from '../Context/authProvider';
import {Box} from '@mui/material'

function FaceLogin() {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mediaStream, setMediaStream] = useState(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const navigate = useNavigate();
    const { LoginFacial } = useContext(AuthContext);
    const [isCameraOpen, setIsCameraOpen] = useState(false);


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
                setIsCameraOpen(true)
            })
            .catch(err => console.error("Erro ao acessar a câmera:", err));
    };

    const closeCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
            setIsCameraOpen(false)

        }
    };

    const openCamera = () => {
        startVideo();
    };

    const detectFace = async () => {
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detections) {
            setFaceDetected(true);
            notification.success({
                message: 'Rosto Detectado',
                description: 'Clique no botão de login para prosseguir.',
                placement: 'topRight',
            });
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
        <div className={Style.container}>
            <h2 className={Style.h2}>Login com Reconhecimento Facial</h2>
            <video className={Style.video} ref={videoRef} autoPlay muted width="480" height="360" onPlay={() => setIsLoading(false)} />
            {isLoading ? <p className={Style.p}>Carregando...</p> : <p className={Style.p}>Aguardando reconhecimento facial...</p>}

            {faceDetected && (
                <>
                    <p>Rosto reconhecido. Clique no botão abaixo para prosseguir com o login.</p>
                    <button onClick={handleFaceLogin} className={Style.button}>
                        Login
                    </button>
                </>
            )}
            {isCameraOpen ? (
                <button onClick={closeCamera} className={Style.button}>
                    Fechar Câmera
                </button>
            ) : (
                <button onClick={openCamera} className={Style.button}>
                    Abrir Câmera
                </button>
            )}

        </div>
    );
}

export default FaceLogin;
