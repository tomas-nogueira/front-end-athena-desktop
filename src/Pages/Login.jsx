import React, { useState, useContext, useEffect } from 'react';
import Style from '../Styles/Login.module.css';
import Logo from '../Photos/logo_athena 1.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomSelect from '../Components/Select';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { AuthContext } from '../Context/authProvider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { Login, Cadastrar, logado, roleContext, messageContext} = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [role, setRole] = useState('');
    const [rua, setRua] = useState('');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [school, setSchool] = useState('');
    const [confirmsenha, setConfirmSenha] = useState('')

    const [schoolOptions, setSchoolOptions] = useState([])

    const [classOptions, setClassOptions] = useState([])

    const [classes, setClasses] = useState('')

    const [message, setMessage] = useState('')
    const navigate = useNavigate();


    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleSchoolChange = (event) => {
        setSchool(event.target.value);
    };

    const handleClassesChange = (event) => {
        setClasses(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };


    const roleOptions = [
        { value: 'inspetor', label: 'Inspetor' },
        { value: 'estudante', label: 'Estudante' },
        { value: 'professor', label: 'Professor' },
        { value: 'diretor', label: 'Diretoria' },
        { value: 'limpeza', label: 'Limpeza' },
        { value: 'cozinha', label: 'Cozinha' },
        { value: 'coordenador', label: 'Coordenador' },
        { value: 'outro', label: 'Outro' },
    ];

    function RealizaLogin() {
        Login(email, senha);
    }

    function RealizaCadastro() {
      if (!nome || !email || !senha || !confirmsenha || !telefone || !cpf || !role || !rua || !cep || !estado || !cidade || !school) {
          setMessage( "Por favor, preencha todos os campos");
          return;
      }
  
      if (senha !== confirmsenha) {
        setMessage( "As senhas não coincidem");
        return;
      }
  
      Cadastrar(nome, email, senha, school, classes, telefone, cpf, role, rua, cep, estado, cidade);
  }

  useEffect(() => {
    if (logado) {
        if (roleContext === 'estudante') {
            navigate('/home/aluno');
        } 
        else if (roleContext === 'professor') {
            navigate('/home/professor');
        } 
        else if (roleContext === 'diretor' || roleContext === 'coordenador') {
            navigate('/dashboard/diretoria');
        } 
        else if (roleContext === 'inspetor' || roleContext === 'limpeza' || roleContext === 'cozinha') {
            navigate('/dashboard/funcionarios');
        } 
        else {
            navigate('/');
        }
    }
}, [logado, navigate, roleContext]);

    useEffect(() =>{
        fetch("http://localhost:8080/school", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
        const options = json.schools.map(school => ({
            value: school._id,
            label: school.name,
        }));
        setSchoolOptions(options);    })
    .catch((error) => {
    });
    }, [])

    useEffect(() =>{
        fetch(`http://localhost:8080/class/${school}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resposta) => resposta.json())
    .then((json) => {
        console.log(json);
    
        // Verifica se a resposta contém uma array de classes
        if (Array.isArray(json.message) && json.message.length > 0) {
            const optionsClass = json.message.map(classes => ({
                value: classes._id,
                label: classes.name,
            }));
            setClassOptions(optionsClass);
        } else {
            // Se a array estiver vazia, define um texto padrão
            setClassOptions([{ value: '', label: 'Nenhuma sala encontrada' }]);
        }
    })
    .catch((error) => {
        console.error('Erro ao buscar as classes:', error);
    });
    
    }, [school])

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
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        label="Digite seu e-mail"
                                        variant="standard"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{ width: '250px' }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        label="Digite sua senha"
                                        variant="standard"
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        sx={{ width: '250px' }}
                                    />
                                </Box>
                            </div>
                            <div>
                                <a href="#" onClick={handleToggle} className={Style.lowtext}>Ainda não é cadastrado?</a>
                            </div>
                            <div>
                                <a href="/cadastro/escola" onClick={handleToggle} className={Style.lowtext}>Quer cadastrar sua escola ou realizar Login? Clique aqui</a>
                            </div>
                            <div className={Style.btndiv}>
                                <Button size="large" variant="contained" onClick={RealizaLogin} style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>ENTRAR</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={Style.highbox}>
                            <p className={Style.text}>CADASTRE-SE</p>
                            <AssignmentIndIcon className={Style.hand} />
                        </div>
                        {messageContext && 
                        (<Alert variant='filled' severity="error" sx={{ textAlign:"center", borderRadius: '5px'}}>{messageContext}</Alert>)}
                        {message && 
                        (<Alert variant='filled' severity="error" sx={{ textAlign:"center", borderRadius: '5px'}}>{message}</Alert>)}
                        <div className={Style.lowcontainer}>
                            <div className={Style.inputGrid}>
                                <div className={Style.inputColumn}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite seu nome"
                                            variant='standard'
                                            type='text'
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite seu email"
                                            variant='standard'
                                            type='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite seu telefone"
                                            variant='standard'
                                            type='tel'
                                            value={telefone}
                                            onChange={(e) => setTelefone(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <DescriptionIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite seu CPF"
                                            variant='standard'
                                            type='text'
                                            value={cpf}
                                            onChange={(e) => setCpf(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite sua senha"
                                            variant='standard'
                                            type='password'
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Confime sua senha"
                                            variant='standard'
                                            type='password'
                                            value={confirmsenha}
                                            onChange={(e) => setConfirmSenha(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <CustomSelect
                                        label="Escolha sua escola"
                                        variant='outlined'
                                        menuItems={schoolOptions}
                                        value={school}
                                        onChange={handleSchoolChange}
                                    />
                                    <CustomSelect
                                        label="Escolha sua sala"
                                        variant='outlined'
                                        menuItems={classOptions}
                                        value={classes}
                                        onChange={handleClassesChange}
                                    />
                                </div>
                                <div className={Style.inputColumn}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite a rua"
                                            variant='standard'
                                            type='text'
                                            value={rua}
                                            onChange={(e) => setRua(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite sua cidade"
                                            variant='standard'
                                            type='text'
                                            value={cidade}
                                            onChange={(e) => setCidade(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite seu CEP"
                                            variant='standard'
                                            type='text'
                                            value={cep}
                                            onChange={(e) => setCep(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            label="Digite seu estado"
                                            variant='standard'
                                            type='text'
                                            value={estado}
                                            onChange={(e) => setEstado(e.target.value)}
                                            sx={{ width: '250px' }}
                                        />
                                    </Box>
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
                            <div>
                                <a href="/cadastro/escola" onClick={handleToggle} className={Style.lowtext}>Quer cadastrar sua escola ou realizar Login? Clique aqui</a>
                            </div>
                            <div className={Style.btndiv}>
                                <Button size="large" variant="contained" onClick={RealizaCadastro} style={{ backgroundColor: '#235BD5', fontWeight: '500' }}>CADASTRAR</Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
