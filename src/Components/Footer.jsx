import Style from '../Styles/Footer.module.css'
import Logo from '../Photos/logo_athena 3.png'

function Footer(){
    return(
        <>
    <footer>
        <div className={Style.footercontent} id='footer'>
            <div className={Style.footercontacts}>
                <div className={Style.logo}>
                    <img  alt="" src={Logo}/>
                </div>
                <p className={Style.sublogo}>Educação Inovadora</p>

                <div className={Style.footersocialmedia}>
                    <a href="" target='_blank' className={`${Style.footerlink} ${Style.instagram}`}>
                        <i class="fa-brands fa-instagram"></i>
                    </a>

                    <a href="" target='_blank' className={`${Style.footerlink} ${Style.facebook}`}>
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                    <a href="" className={`${Style.footerlink} ${Style.whatsapp}`}>
                        <i class="fa-brands fa-whatsapp"></i>
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

                <p>
                    Coloque seu e-mail para receber notificações sobre nossas novidades da Athena
                </p>

                <div className={Style.inputgroup}>
                    <input type="email" id="email" placeholder='Insira seu Email...'/>
                    <button>
                    <i class="fa-solid fa-envelope"></i>                    
                    </button>
                </div>
            </div>
        </div>

        <div className={Style.footercopyright}>
            Athena &
            2024 all rights reserved
        </div>
    </footer>
        </>
    )
}
export default Footer;