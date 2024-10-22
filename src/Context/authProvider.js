import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [messageContext, setMessageContext] = useState('')
    const [logado, setLogado] = useState(false)
    const [roleContext, setRoleContext] = useState('')

    function Login(email, senha) {
        fetch("http://localhost:3030/user/login", {
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
                localStorage.setItem("role", json.role)
            }
        })
        .catch((error) => {
            setLogado(false)
            console.error('Erro ao tentar cadastrar:', error);
        });
    }

    function Cadastrar(nome, email, senha, school, classe, telefone, cpf, role, rua, cep, estado, cidade) {
        fetch("http://localhost:3030/user/create", {
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
                console.log(setMessageContext(json.message))
                localStorage.setItem("token", json.token);
                localStorage.setItem("role", json.role)
            }
        })
        .catch((error) => {
            console.log(error)
            setLogado(false)
            console.error('Erro ao tentar cadastrar:', error);
        });
    }
    
    
    function Logout(){
        setLogado(false);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ Login, Cadastrar, messageContext: messageContext, logado: logado, roleContext: roleContext, Logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;