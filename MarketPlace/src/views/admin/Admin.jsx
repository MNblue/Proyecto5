import CardOne from '../../components/card/CardOne';
import React, { useState } from 'react';
import FormAddProduct from '../../components/formAddProduct/FormAddProduct'
import Footer from '../../components/footer/Footer.jsx'


function Admin() {

  const [isLogged, setIsLogged] = useState(true);


  return (
    <>
     
        <FormAddProduct />
        <CardOne isLogged={isLogged} selectOpt={'option1'} />
    
      <Footer />
    </>
  )
}

export default Admin;