import React from 'react'
import Style from '../Styles/Login.module.css'
import Logo from '../Photos/logo_athena 1.png'

function Login() {
  return (
    <div className={Style.bg}>
      <div className={Style.container}>
        <img src={Logo} className={Style.logo}/>
        <div>
        <p>Bem vindo de volta</p>
      </div>
      </div>
    </div>
  )
}

export default Login
