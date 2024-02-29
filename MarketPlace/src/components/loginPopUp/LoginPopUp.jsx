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
    backgroundColor: '#fff',
    color: '#00DFF0',
    width: '80%',
    height: 'auto',
    border: 'none',
    borderRadius: '20px',
    boxShadow: '0 0 10px #e9e0e9',
    margin: '10px auto'
    

  };
  const stylesCloseBtn = {
    backgroundColor: 'transparent',
    color: '#000',
    height: 'auto',
    border: 'none',
    boxShadow: '0 0 10px #e9e0e9',
  };

  const stylesModalDialog = {
    backgroundColor: '#7e90e6',
    backdropFilter: 'none',
    color: '',
    height: '',
    border: '',
    boxShadow: '0 0 10px #e9e0e9',
    };
  ///////////////////////////////////

///////////Google-Sing-In//////////
const [googleUserData, setGoogleUserData] = useState(null);

const login = useGoogleLogin({
  onSuccess: async (response) => {
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
    }  catch (err) {
      console.log('Error', err);
    };
    },
});

////////////////////////////////////////
  const [user, setUser] = useState({
    useremail: '',
    userpassword: ''
  });

  const navigate = useNavigate();


  const handleLogin = async () => {

    let flag = Validate(user);
    if (!flag) { return }

    else {
      try {
        const allUsers = await userService.getAllUser();
        const foundUser = allUsers.find(u => u.useremail === user.useremail && u.userpassword === user.userpassword);
        if (foundUser) {
          navigate('/admin');
        } else {
          Swal.fire({
            imageUrl: 'https://media.tenor.com/TWMxi0kGDTgAAAAi/hmm.gif',
            title: 'Login o contraseña no esta correcta',
        });
          //alert('Login o contraseña no esta correcta ');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al intentar loguearte');
      }
    }

  };

  function handleUserChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <div
      className="modal show"
      style={styleModalShow}>

      <Modal.Dialog style={stylesModalDialog}>
        <Modal.Header style={stylesModalDialog}>
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
              <div className="btnHolder">
                <Button style={customStylesLogin} onClick={handleLogin}>Log in</Button>
                <Button style={customStylesLogin} onClick={() => login()}>Sign in with Google 🚀</Button>
              </div>
              <div className="register-link">
                <p>¿Todavía no tienes la cuenta?
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