import { createContext, useEffect, useState } from "react";
import { message as antdMessage } from 'antd';

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [messageContext, setMessageContext] = useState('');
    const [logado, setLogado] = useState(false);
    const [roleContext, setRoleContext] = useState('');
    const [cnpjContext, setCnpjContext] = useState('')

    const [dadosUser, setDadosUser] = useState({})
    const [dadosSchool, setDadosSchool] = useState({})

    function LoginFacial(descriptor) {
        fetch("http://localhost:3030/user/facelogin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descriptor })
        })
        .then(response => response.json())
        .then(json => {
            if (json.token) {
                setLogado(true);
                localStorage.setItem("token", json.token);
                localStorage.setItem("role", json.role);
                antdMessage.success('Login bem-sucedido!');
            } else {
                setLogado(false);
                antdMessage.error(`Falha no reconhecimento facial. Similaridade: ${json.similarityScore}.`);
            }
        })
        .catch(error => {
            console.error("Erro ao processar o login facial:", error);
            antdMessage.error("Erro no login facial. Tente novamente.");
        });
    }
    

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
                antdMessage.success('Login realizado com sucesso!');
            } 
            else {
                setLogado(false);
                setMessageContext('Erro ao fazer login, verifique suas credenciais.');
                antdMessage.error('Erro ao fazer login, verifique suas credenciais.'); 
                localStorage.setItem("role", json.role)
            }
        }
        )}

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
                localStorage.setItem("token", json.token);
                antdMessage.success('Cadastro realizado com sucesso!');
                localStorage.setItem("role", json.role)
            }
            else {
                setLogado(false);
                antdMessage.error(json.message); 
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:3030/user", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            setDadosUser(json)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [logado])

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:3030/school/data", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
          .then((resposta) => resposta.json())
          .then((json) => {
            setDadosSchool(json);
          })
          .catch((error) => {
            console.error("Erro ao buscar dados da escola:", error);
          });
    
      }, [logado, cnpjContext]);

    function LoginEscola(cnpj, password){
        fetch("http://localhost:3030/school/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              cnpj, 
              password
            })
          })
          .then(res => res.json())
          .then(json => {
            if(json.token && json.cnpj){
                setLogado(true);
                setCnpjContext(json.cnpj)
                localStorage.setItem("token", json.token);
                antdMessage.success('Login realizado com sucesso!');
                localStorage.setItem("role", "admin")
                console.log(json)
            }
            else{
                setLogado(false);
                antdMessage.error("Erro ao realizar login, verifique suas credenciais"); 
                console.log(json)
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });
    }

    function CadastrarEscola(name, email, phone, inepCode, cnpj, street, cep, state, city, institutionType, educationLevels, password){
        fetch("http://localhost:3030/school/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                inepCode: inepCode,
                cnpj: cnpj,
                address: {
                  street: street,
                  cep: cep, 
                  state: state,
                  city: city, 
                },
                institutionType: institutionType, 
                educationLevels: educationLevels, 
                password: password,
                status: true, 
            })
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if(json.token && json.cnpj)
            {
                setLogado(true);
                setCnpjContext(json.cnpj)
                setMessageContext(json.message);
                localStorage.setItem("token", json.token);
                antdMessage.success('Login realizado com sucesso!');
                localStorage.setItem("role", "admin")
            }
            else{
                setLogado(false);
                antdMessage.error(json.message); 
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    return (
        <AuthContext.Provider value={{ Login, LoginFacial, Cadastrar, messageContext, logado, roleContext, Logout, dadosUser: dadosUser, LoginEscola, CadastrarEscola, cnpjContext, dadosSchool: dadosSchool }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
