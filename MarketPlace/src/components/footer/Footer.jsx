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

                        <img src={facebook} className='fbFooter' />
                        <img src={instagram} className='instagramFooter' />
                        <img src={twitter} className='twitterFooter' /></div>

                    <div className="p-2">© InnoConsulting Solutions</div>

                </Stack>

            </footer>
        </>
    )
}

export default Footer;