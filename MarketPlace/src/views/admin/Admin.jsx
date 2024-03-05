import CardOne from "../../components/card/CardOne";
import React, { useState } from "react";
import FormAddProduct from "../../components/formAddProduct/FormAddProduct";
import NavbarOne from "../../components/navbar/NavbarOne";
import Filter from '../../components/filter/Filter';
import Footer from "../../components/footer/Footer";
import "./admin.css"

function Admin() {
  const [isLogged, setIsLogged] = useState(true);
  const [optionFilter, setOptionFilter] = useState('option1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const optionFilterM = (selectedOption) => {
    setOptionFilter(selectedOption);
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="containerMain">
        <div >
          <NavbarOne openModal={openModal} isLogged={isLogged} />
        </div>
        <div >
          <FormAddProduct />
        </div>
        <div>
          <Filter optionSelected={optionFilterM} />
        </div>
        <div className="cardC">
          <CardOne isLogged={isLogged} selectOpt={optionFilter} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
