import CardOne from "../../components/card/CardOne";
import React, { useState } from "react";
import FormAddProduct from "../../components/formAddProduct/FormAddProduct";
import NavbarOne from "../../components/navbar/NavbarOne";
import Filter from '../../components/filter/Filter';
import Footer from "../../components/footer/Footer";

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
      <div style={{ display: 'flex', flexDirection:'column' }}>
        <div style={{backgroundColor:'blue'}}>
          <NavbarOne openModal={openModal} isLogged={isLogged} />
        </div>
        <div style={{backgroundColor:'yellow'}}>
          <FormAddProduct />
        </div>
        <div style={{backgroundColor:'green'}}>
          <Filter optionSelected={optionFilterM} />
        </div>
        <div style={{backgroundColor:'pink'}}>
          <CardOne isLogged={isLogged} selectOpt={optionFilter} />
        </div>
        <div style={{backgroundColor:'blue'}}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
