import CardOne from '../../components/card/CardOne';
import React, { useState } from 'react';
import FormAddProduct from '../../components/formAddProduct/FormAddProduct'
import Prueba from '../../components/prueba/prueba';



function Admin(){

   const [isLogged, setIsLogged] = useState(true);


 return (
    <>
    <main>

    
    <h1>Holi, esto es una prueba, lo tenemos que borrar</h1>


   
      <FormAddProduct/>
      <CardOne isLogged={isLogged} selectOpt={'option1'} />
      <Prueba />


    </main>
    </>
 )
}

export default Admin;