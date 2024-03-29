import "./navbarOne.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../img/logo (2).svg";
import shoppingIcon from "../../img/shoppingIcon.svg";
import logIn from "../../img/logIn.svg";
import logOutIcon from "../../img/logoutIcon.svg";
import { useCookies } from "react-cookie";

function NavbarOne({ openModal, isLogged }) {
  const navigate = useNavigate();
  const [cookies] = useCookies(["userImage"]);

  return (

    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Container fluid>
            <Row className="align-items-center">
              <Col md={2} xs={2} className="d-none d-sm-block">
                <Nav.Link onClick={() => navigate('/')}>
                  <img src={logo} alt="" />
                </Nav.Link>
              </Col>
              <Col md={8} xs={8} className="text-center">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </Col>
              <Col md={2} xs={2} className="d-flex justify-content-end gap-5">
                {isLogged ? (
                  <>
                    <button className="button-style" >
                      <img src={shoppingIcon} alt="Logout" />
                    </button>
                    <button className="button-style">
                      {cookies.userImage ? (
                        <img src={cookies.userImage} alt="User"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            boxShadow: '0 0 5px rgba(225, 225, 225)'
                          }} />
                      ) : (
                        <img src={logOutIcon} alt="Logout" />
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="button-style">
                      <img src={logIn} onClick={openModal} alt="Login" />
                    </button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarOne;
