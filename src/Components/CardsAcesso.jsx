import React from 'react';
import { useNavigate } from 'react-router-dom';
import Style from '../Styles/CardsAcesso.module.css'
import {  Button } from '@mui/material';

function CardsAcesso({ texto1, texto2, rotaBotao, imagemSrc, imagemAlt }) {
  const navigate = useNavigate(); // Hook para navegar entre as rotas

  return (
        <div className={Style.container}>
            <div className='high-box'>
                <div>
                    <p className={Style.texto1}>{texto1}</p>
                </div>
                <div>
                    <p>{texto2}</p>
                </div>
                <div>
                    <Button variant='contained' onClick={() => navigate(rotaBotao)}>ACESSAR</Button>
                </div>
            </div>
            <img src={imagemSrc} alt={imagemAlt} className={Style.img}/>
        </div>
  );
}

export default CardsAcesso;
