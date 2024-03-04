import { Container, Row, Col, Stack } from 'react-bootstrap';
import './footer.css'
import homeIcon from '../../img/HomeLogoFooter.svg';
import facebook from '../../img/facebook.svg';
import instagram from '../../img/instagram.svg';
import twitter from '../../img/twitter.svg';


function Footer() {

    return (
        <>
            <footer>

                <Stack direction="horizontal" gap={5} className='stack-footer'>

                    <div className="p-2"><img src={homeIcon} className='logoFooter' /></div>

                    <div className="p-2 rrssFooter">
                        <a href="https://www.facebook.com/?locale=es_ES" target="_blank" alt="Facebook">
                            <img src={facebook} className='fbFooter' />
                        </a>

                        <a href="https://www.instagram.com/" target="_blank" alt="Instagram">
                            <img src={instagram} className='instagramFooter' />
                        </a>
                        <a href="https://twitter.com/home?lang=es" target="_blank" alt="Twitter">
                            <img src={twitter} className='twitterFooter' />
                        </a>
                    </div>

                    <div className="p-2">© InnoConsulting Solutions</div>

                </Stack>

            </footer >
        </>
    )
}

export default Footer;