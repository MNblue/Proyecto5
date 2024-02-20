import NavbarOne from '../../components/navbar/NavbarOne';
import LoginPopUp from '../../components/loginPopUp/LoginPopUp';
import React, { useState } from 'react';


import './user.css'


function User (){
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


    return (
        <>
        <NavbarOne openModal={openModal} />
        {isModalOpen && <LoginPopUp closeModal={closeModal} />}
        </>
    )
}
export default User;