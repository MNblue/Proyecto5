import CardOne from '../../components/card/CardOne';
import React, { useState } from 'react';
import FormAddProduct from '../../components/formAddProduct/FormAddProduct'
import Footer from '../../components/footer/Footer.jsx'


function Admin() {

  const [isLogged, setIsLogged] = useState(true);


  return (
    <>
      <main>
        <FormAddProduct />
        <CardOne isLogged={isLogged} />
      </main>
      <Footer />
    </>
  )
}

export default Admin;