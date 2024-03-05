import React from 'react';
import { render, screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import LoginPopUp from '../loginPopUp/LoginPopUp.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));


describe("<LoginPopUp/>",()=>{

    test("it should navigate to index", ()=>{
        render(
          <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
            <BrowserRouter>
              <LoginPopUp/>
            </BrowserRouter>
            </GoogleOAuthProvider>
          );

          const inputContraseña= screen.getByPlaceholderText(/Contraseña/i);
          
          expect(inputContraseña).toBeInTheDocument();

    });


})