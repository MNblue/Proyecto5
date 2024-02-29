import CardOne from '../../components/card/CardOne';
import React, { useState } from 'react';
import FormAddProduct from '../../components/formAddProduct/FormAddProduct'



function Admin(){

   const [isLogged, setIsLogged] = useState(true);


 return (
    <>
    <main>

    
    <h1>Holi, esto es una prueba, lo tenemos que borrar</h1>


   
      <FormAddProduct/>

      <CardOne isLogged={isLogged} selectOpt={'option1'} />


    </main>
    </>
 )
}

export default Admin;