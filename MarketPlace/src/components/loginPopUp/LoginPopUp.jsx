import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { userService } from '../../service/userService';
import { useNavigate } from 'react-router-dom'; 
import Validate from './Validate';


const LoginPopUp = ({ closeModal }) => {
  const [user, setUser] = useState({
    useremail: '',
    userpassword: ''
  });
  
  const navigate = useNavigate();


  const handleLogin = async () => {

  let flag = Validate(user);
  if (!flag) {return}

  else {
    try {
        const allUsers = await userService.getAllUser();
        const foundUser = allUsers.find(u => u.useremail === user.useremail && u.userpassword === user.userpassword);
        if (foundUser) {
          navigate('/admin');
        } else {
          alert('Tu pasword es caca :c');
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
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>Correo Electronico
            <input type='email'  name='useremail' value={user.useremail} onChange={handleUserChange} placeholder='ejemplo@gmail.com' required />
          </label>
          <label>Contraseña
            <input type='password' name='userpassword' value={user.userpassword} onChange={handleUserChange} placeholder='contraseña' required />
          </label>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" onClick={handleLogin}>Log in</Button>
        </Modal.Footer>
      </Modal.Dialog>


    </div>

  );
};

export default LoginPopUp;