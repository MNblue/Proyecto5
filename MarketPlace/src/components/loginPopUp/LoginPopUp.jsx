import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const LoginPopUp = ({ closeModal }) => {
  return (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
        <input type='email'/>
        <input type='password'/>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="primary">Log in</Button>
      </Modal.Footer>
    </Modal.Dialog>

    
  </div>

  );
};

export default LoginPopUp;