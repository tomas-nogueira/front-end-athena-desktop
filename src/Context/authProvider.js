import { createContext, useState } from "react";
import { message as antdMessage } from 'antd';

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [messageContext, setMessageContext] = useState('');
    const [logado, setLogado] = useState(false);
    const [roleContext, setRoleContext] = useState('');

    function Login(email, senha) {
        fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: senha
            })
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if (json.token && json.role) {
                setLogado(true);
                setRoleContext(json.role);
                setMessageContext(json.message);
                localStorage.setItem("token", json.token);
                antdMessage.success('Login realizado com sucesso!');
            } else {
                setLogado(false);
                setMessageContext('Erro ao fazer login, verifique suas credenciais.');
                antdMessage.error('Erro ao fazer login, verifique suas credenciais.'); 
                localStorage.setItem("role", json.role)
            }
        }
        )}

    function Cadastrar(nome, email, senha, school, classe, telefone, cpf, role, rua, cep, estado, cidade) {
        fetch("http://localhost:8080/user/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                email: email,
                password: senha,
                phone: telefone,
                cpf: cpf,
                role: role,
                IdSchool: school,
                IdClass: classe || null,
                address: {
                    street: rua,
                    cep: cep,
                    state: estado,
                    city: cidade
                },
            })
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if (json.token && json.role) {
                setLogado(true);
                setRoleContext(json.role);
                setMessageContext(json.message);
                localStorage.setItem("token", json.token);
                antdMessage.success('Cadastro realizado com sucesso!');
                localStorage.setItem("role", json.role)
            }
        })
        .catch((error) => {
            setLogado(false);
            setMessageContext('Erro ao tentar realizar o cadastro.');
            antdMessage.error('Erro ao tentar realizar o cadastro.');
            console.error('Erro ao tentar cadastrar:', error);
        });
    }
    
    function Logout() {
        setLogado(false);
        localStorage.clear();
        antdMessage.info('Você foi deslogado.'); 
    }

    return (
        <AuthContext.Provider value={{ Login, Cadastrar, messageContext, logado, roleContext, Logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
