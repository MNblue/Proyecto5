import NavbarOne from '../../components/navbar/NavbarOne';
import Footer from '../../components/footer/Footer.jsx';
import LoginPopUp from '../../components/loginPopUp/LoginPopUp';
import React, { useState } from 'react';
import CardOne from '../../components/card/CardOne';
import Filter from '../../components/filter/Filter';
import { useEffect } from 'react';
import NavbarOne from '../../components/navbar/NavbarOne';

import './user.css';


function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [optionFilter, setOptionFilter] = useState('option1');

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const optionFilterM = (selectedOption) => {
    setOptionFilter(selectedOption);
  }

  useEffect(() => {

  }, [optionFilter]); // Se ejecutará cada vez que optionFilter cambie, es decir que pinchemos en un radiobutton

  return (
    <>
      <NavbarOne openModal={openModal} isLogged={isLogged} />
      {isModalOpen && <LoginPopUp closeModal={closeModal} />}

      <Filter optionSelected={optionFilterM} />

      <CardOne isLogged={isLogged} selectOpt={optionFilter} />
        <Footer />
    </>
  )
}
export default User;