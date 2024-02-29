import "../loginPopUp/loginPopUp.css"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { userService } from '../../service/userService';
import { useNavigate } from 'react-router-dom';
import Validate from './Validate';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import styled from 'styled-components';

const HoverModal = styled.div`
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;


const LoginPopUp = ({ closeModal }) => {

  ////////////////-STYLE-///////////////////
  const styleModalShow = {

    display: 'block',
    position: 'initial',
    backgroundColor: 'rgba(0, 0, 0, 0.700)',
    // backdropFilter: 'blur(5px)',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,

  }

  const customStylesLogin = {
    backgroundColor: '#3D5B81',
    color: '#FFF',
    width: '80%',
    height: 'auto',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    margin: '10px auto',
    padding: '10px',
    fontSize: '20px'
  };

  const stylesCloseBtn = {
    backgroundColor: 'transparent',
    color: '#000',
    height: 'auto',
    border: 'none',
    boxShadow: '0 0 10px #e9e0e9',
  };

  const stylesModalDialog = {
    backgroundColor: '#fff',
    backdropFilter: 'none',
    borderRadius: '10px',
    color: '',
    height: '',
    border: '',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
  };
  ///////////////////////////////////


  const [user, setUser] = useState({
    useremail: '',
    userpassword: ''
  });

  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = async () => {

    let flag = Validate(user);
    if (!flag) {
      return;
    }

    try {
      const allUsers = await userService.getAllUser();
      const foundUser = allUsers.find(u => u.useremail === user.useremail && u.userpassword === user.userpassword);

      if (!foundUser) {
        Swal.fire({
          imageUrl: 'https://media.tenor.com/TWMxi0kGDTgAAAAi/hmm.gif',
          title: 'Login o contraseña no esta correcta',
        });
        return;
      }

      if (!agree) {
        Swal.fire({
          title: 'Acepta la política de privacidad',
          icon: 'warning',
        });
        return;
      }

      navigate('/admin');

    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al intentar loguearte');
    }
  };


  ///////////Google-Sing-In//////////
  const [googleUserData, setGoogleUserData] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      if (!agree) {
        Swal.fire({
          title: 'Acepta la política de privacidad',
          icon: 'warning',
        });
        return;
      }
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              "Authorization": `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
        setGoogleUserData(res.data);
        navigate('/admin');
      } catch (err) {
        console.log('Error', err);
      };
    },
  });

  ////////////////////////////////////////
  // const handleLogin = async () => {

  //   let flag = Validate(user);
  //   if (!flag) { return }

  //   if (!agree) {
  //     Swal.fire({
  //       title: 'Погодьтесь з політикою конфіденційності',
  //       icon: 'warning',
  //     });
  //     return}

  //   else {
  //     try {
  //       const allUsers = await userService.getAllUser();
  //       const foundUser = allUsers.find(u => u.useremail === user.useremail && u.userpassword === user.userpassword);
  //       if (foundUser) {
  //         navigate('/admin');
  //       } else {
  //         Swal.fire({
  //           imageUrl: 'https://media.tenor.com/TWMxi0kGDTgAAAAi/hmm.gif',
  //           title: 'Login o contraseña no esta correcta',
  //       })
  //     }

  //     } catch (error) {
  //       console.error('Error:', error);
  //       alert('Hubo un error al intentar loguearte');
  //     }
  //   }

  // };

  function handleUserChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  return (
    <div
      className="modal show"
      style={styleModalShow}>

      <Modal.Dialog style={stylesModalDialog}>
        <Modal.Header>
          <Modal.Title>Iniciar Sesión</Modal.Title>
          <Button style={stylesCloseBtn} variant="secondary" onClick={closeModal}>X</Button>
        </Modal.Header>

        <Modal.Body style={stylesModalDialog}>
          <div className='wrapper'>
            <form action="" >
              <div className='input-box'>
                <input type='email' name='useremail' value={user.useremail} onChange={handleUserChange} placeholder='Email: ejemplo@gmail.com' required />
                <FaUser className='icon' />
              </div>
              <div className='input-box'>
                <input type='password' name='userpassword' value={user.userpassword} onChange={handleUserChange} placeholder='Contraseña' required />
                <FaLock className='icon' />
              </div>

              <div className="remember-forgot">
                <label><input type="checkbox" /> Recuérdame</label>
                <Link to="#">¿No recuerdas tu contraseña?</Link>
              </div>

              <div className="privacy-policy">
                <label>
                  <input type="checkbox" id="agree" name="agree" defaultChecked={agree} onChange={handleAgreeChange} /> Acepto la <Link href="#">Política de privacidad</Link>
                  <p>(por favor, lee y acepta la política de privacidad antes de iniciar la sesión. <strong>Es obligatorio!</strong>)</p>
                </label>
              </div>

              <div className="btnHolder">
                <Button style={customStylesLogin} onClick={handleLogin}>Log in</Button>
                <Button style={customStylesLogin}
                  onClick={() => login()}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>Entrar con Google 🚀</Button>
                <HoverModal visible={isHovered}>
                  <p>Acepta la política de privacidad si aún no lo ha hecho</p>
                </HoverModal>
                
              </div>
              <div className="register-link">
                <p>¿Todavía no tienes cuentas?
                  <Link to='#'> Regístrate ahora</Link></p>
              </div>
            </form>
          </div>

        </Modal.Body>
      </Modal.Dialog>


    </div>

  );
};

export default LoginPopUp;