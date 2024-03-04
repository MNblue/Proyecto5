import NavbarOne from "../../components/navbar/NavbarOne";
import Footer from "../../components/footer/Footer.jsx";
import LoginPopUp from "../../components/loginPopUp/LoginPopUp";
import React, { useState } from "react";
import CardOne from "../../components/card/CardOne";
import Filter from "../../components/filter/Filter";
import { useEffect } from "react";
import "./user.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [optionFilter, setOptionFilter] = useState("option1");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const optionFilterM = (selectedOption) => {
    setOptionFilter(selectedOption);
  };

  useEffect(() => { }, [optionFilter]); // Se ejecutará cada vez que optionFilter cambie, es decir que pinchemos en un radiobutton

  return (
    <>
      <div style={{ display: 'grid', height: '100%', gridTemplateRows: '7.8% 30% 10% 52% 6%', gap:'0' }}>
        <div >
          <NavbarOne openModal={openModal} isLogged={isLogged} />
          {isModalOpen && <LoginPopUp closeModal={closeModal} />}
        </div>

        <div className="image-container" >
          <Container className="d-flex justify-content-center">
            <Row className="flex-column">
              <Col className="mt-5">
                <h1 className="title-home fs-2">
                  ¡Descubre el sabor auténtico del campo en Rincón Rural!
                  <br />
                  ¡Tu conexión con la frescura del valle!
                </h1>
              </Col>
            </Row>
          </Container>
          <Container className="d-flex justify-content-center">
            <Row>
              <Col>
                <h4 className="subtitle-home mt-3 text-center fs-6">
                  ¡Compra y vende tusproductos frescos, elaborados y artesanía
                  local... Disfruta de lo mejor de nuestra tierra <br />
                  ¡Además todos los productos son denominación de origen, ama tu
                  tierra!
                </h4>
              </Col>
            </Row>
          </Container>
        </div>
        <div >
          <Filter optionSelected={optionFilterM} />
        </div>

        <div className="container-cards" >
          <CardOne isLogged={isLogged} selectOpt={optionFilter} />
        </div>

        <div >
          <Footer />
        </div>
      </div>

    </>
  );
}
export default User;
