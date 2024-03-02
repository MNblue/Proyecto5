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
      <NavbarOne openModal={openModal} isLogged={isLogged} />
      <FormAddProduct />
      <Filter optionSelected={optionFilterM} />
      <CardOne isLogged={isLogged} selectOpt={optionFilter} />
     
    
      <Footer />
    </>
  );
}

export default Admin;
