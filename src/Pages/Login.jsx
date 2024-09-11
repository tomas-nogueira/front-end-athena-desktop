import React from 'react'
import Style from '../Styles/Login.module.css'
import Logo from '../Photos/logo_athena 1.png'
import Input from '../Components/Input'
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import Button from '@mui/material/Button';

function Login() {
  return (
    <div className={Style.bg}>
      <div className={Style.container}>
        <div>
          <img src={Logo} className={Style.logo}/>
        </div>
          <div className={Style.highbox}>
              <p className={Style.text}>BEM VINDO DE VOLTA!</p>
              <WavingHandIcon className={Style.hand}/>
          </div>
        <div className={Style.lowcontainer}>
          <div className={Style.inputdiv}>
            <Input name='Digite seu e-mail' icon={AccountCircle}/>
            <Input name='Digite sua senha' type='password' icon={KeyOutlinedIcon}/>
          </div>
          <div>
            <a href='/' className={Style.lowtext}>Ainda não é cadastrado?</a>
          </div>
          <div className={Style.btndiv}>
            <Button size="large" variant="contained" style={{backgroundColor: '#235BD5', fontWeight: '500'}}>ENTRAR</Button>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Login
