import React, { useState } from 'react';
import Style from '../Styles/Login.module.css';
import Logo from '../Photos/logo_athena 1.png';
import Input from '../Components/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomSelect from '../Components/Select'; // O Select reutilizável
import LocationCityIcon from '@mui/icons-material/LocationCity';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [school, setSchool] = useState('');
  const [role, setRole] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  };

    const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const schoolOptions = [
    { value: 10, label: 'SESI' },
    { value: 20, label: 'SENAI' },
    { value: 30, label: 'COC' },
  ];

  const roleOptions = [
    { value: 'inspetor', label: 'Inspetor' },
    { value: 'estudante', label: 'Estudante' },
    { value: 'professor', label: 'Professor' },
    { value: 'diretor', label: 'Diretor' },
    { value: 'limpeza', label: 'Limpeza' },
    { value: 'cozinha', label: 'Cozinha' },
    { value: 'coordenador', label: 'Coordenador' },
    { value: 'outro', label: 'Outro' },
  ];

  return (
    <div className={Style.bg}>
      <div className={Style.container}>
        <div>
          <img src={Logo} className={Style.logo} alt="Logo" />
        </div>
        {isLogin ? (
          <>
            <div className={Style.highbox}>
              <p className={Style.text}>BEM VINDO DE VOLTA!</p>
              <WavingHandIcon className={Style.hand} />
            </div>
            <div className={Style.lowcontainer}>
              <div className={Style.inputdiv}>
                <Input name="Digite seu e-mail" icon={AccountCircle} />
                <Input name="Digite sua senha" type="password" icon={KeyOutlinedIcon} />
              </div>
              <div>
                <a href="#" onClick={handleToggle} className={Style.lowtext}>Ainda não é cadastrado?</a>
              </div>
              <div className={Style.btndiv}>
                <Button size="large" variant="contained" style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>ENTRAR</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={Style.highbox}>
              <p className={Style.text}>CADASTRE-SE</p>
              <AssignmentIndIcon className={Style.hand} />
            </div>
            <div className={Style.lowcontainer}>
              <div className={Style.inputGrid}>
                {/* Coluna da esquerda: informações pessoais */}
                <div className={Style.inputColumn}>
                  <Input name="Digite seu nome" icon={AccountCircle} />
                  <Input name="Digite seu e-mail" icon={MailIcon} />
                  <Input name="Digite seu telefone" icon={CallIcon} />
                  <Input name="Digite seu CPF" icon={DescriptionIcon} />
                  <CustomSelect
                    label="Escola"
                    menuItems={schoolOptions}
                    value={school}
                    onChange={handleSchoolChange}
                  />
                </div>
                
                {/* Coluna da direita: informações de endereço */}
                <div className={Style.inputColumn}>
                  <Input name="Digite sua rua" icon={LocationCityIcon} />
                  <Input name="Digite sua cidade" icon={LocationCityIcon} />
                  <Input name="Digite seu CEP" icon={LocationCityIcon} />
                  <Input name="Digite seu Estado" icon={LocationCityIcon} />
                  <CustomSelect
                    label="Função"
                    menuItems={roleOptions}
                    value={role}
                    onChange={handleRoleChange}
                  />
                </div>
              </div>
              <div>
                <a href="#" onClick={handleToggle} className={Style.lowtext}>Já tem uma conta? Faça login</a>
              </div>
              <div className={Style.btndiv}>
                <Button size="large" variant="contained" style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>CADASTRAR</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
