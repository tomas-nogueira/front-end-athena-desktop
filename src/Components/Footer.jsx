import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import Style from '../Styles/Footer.module.css';
import Logo from '../Photos/logo_athena 3.png';
import emailjs from 'emailjs-com';

const Footer = () => {
    const emailInputRef = useRef(null); // Cria uma referência para o campo de e-mail

    const sendEmail = (e) => {
        e.preventDefault();

        const email = e.target.email.value; // Captura o e-mail do input
        console.log("Email enviado para: ", email); // Log do e-mail

        const templateParams = {
            email: email, // Passa o e-mail capturado
            message: "Olá usuário, somos a equipe de assistência da Logic Wave. Conte mais sobre o seu problema ou curiosidade! Em até 3 dias úteis retornaremos abordando o seu problema! Melhores cumprimentos, Logic Wave" // Mensagem padrão
        };

        emailjs.send('service_j1noq2e', 'template_9jjkinj', templateParams, '2xT1fjT1-SjN2S2rL')
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'E-mail enviado!',
                    text: 'Seu e-mail foi enviado com sucesso!',
                    confirmButtonColor: '#1E9CFA'
                });
                emailInputRef.current.value = ''; // Limpa o campo de e-mail
            }, (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao enviar e-mail',
                    text: 'Houve um problema ao enviar seu e-mail. Tente novamente.',
                    confirmButtonColor: '#1E9CFA'
                });
            });
    };

    return (
        <footer>
            <div className={Style.footercontent} id='footer'>
                <div className={Style.footercontacts}>
                    <div className={Style.logo}>
                        <img alt="" src={Logo} />
                    </div>
                    <p className={Style.sublogo}>Educação Inovadora</p>

                    <div className={Style.footersocialmedia}>
                        <a href="https://www.instagram.com/logicwave.sistemas/" target='_blank' rel="noopener noreferrer" className={`${Style.footerlink} ${Style.instagram}`}>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="#" className={`${Style.footerlink} ${Style.facebook}`}>
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" className={`${Style.footerlink} ${Style.whatsapp}`}>
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                </div>

                <ul className={Style.footerlist}>
                    <li>
                        <h3>Sobre Nós</h3>
                    </li>
                    <li>
                        <a href="#" className={Style.footerlink}>A empresa</a>
                    </li>
                    <li>
                        <a href="#" className={Style.footerlink}>Segurança e Privacidade</a>
                    </li>
                    <li>
                        <a href="#" className={Style.footerlink}>Quem somos</a>
                    </li>
                </ul>

                <ul className={Style.footerlist}>
                    <li>
                        <h3>Suporte</h3>
                    </li>
                    <li>
                        <a href="#" className={Style.footerlink}>Suporte Online</a>
                    </li>
                    <li>
                        <a href="#" className={Style.footerlink}>Suporte por Telefone</a>
                    </li>
                    <li>
                        <a href="#" className={Style.footerlink}>FAQ</a>
                    </li>
                </ul>

                <div className={Style.footersubscribe}>
                    <h3>Inscreva-se Já</h3>
                    <p>Coloque seu e-mail para receber notificações sobre nossas novidades da Athena</p>
                    <form onSubmit={sendEmail} className={Style.inputgroup}>
                        <input type="email" name="email" placeholder='Insira seu Email...' required ref={emailInputRef} />
                        <button type="submit">
                            <i className="fa-solid fa-envelope"></i>
                        </button>
                    </form>
                </div>
            </div>

            <div className={Style.footercopyright}>
                Athena &copy; 2024 all rights reserved
            </div>
        </footer>
    );
}

export default Footer;
