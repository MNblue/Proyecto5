// import React from 'react';
// import { render, screen, fireEvent } from "@testing-library/react";
// import '@testing-library/jest-dom';
// // import { Router } from 'react-router-dom';
// // import { createMemoryHistory } from 'history';
// import LoginPopUp from '../loginPopUp/LoginPopUp.jsx';

// describe("<LoginPopUp/>", () => {
//     test("renders login button when not logged in", () => {
//         // Crear un history mock
//         const history = createMemoryHistory();

//         // Renderizar LoginPopUp dentro de un Router
//         render(
//             <Router history={history}>
//                 <LoginPopUp />
//             </Router>
//         );

//         const inputContraseña = screen.getByPlaceholderText(/Contraseña/i);

//         expect(inputContraseña).toBeInTheDocument();
//     });
// });

// describe("<LoginPopUp/>", () => {
//     test("renders login button when not logged in", () => {
//         render(<LoginPopUp/>);
//         const inputContraseña= screen.getByPlaceholderText(/Contraseña/i);

//         expect(inputContraseña).toBeInTheDocument();


//     });
// })


import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import LoginPopUp from '../loginPopUp/LoginPopUp.jsx';
import { BrowserRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));


describe("<LoginPopUp/>",()=>{

    test("it should navigate to index", ()=>{
        render(
            <BrowserRouter>
              <LoginPopUp/>
            </BrowserRouter>
          );

          const inputContraseña= screen.getByPlaceholderText(/Contraseña/i);
          
          expect(inputContraseña).toBeInTheDocument();

    });


})