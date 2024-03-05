import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import User from "./User"
import { BrowserRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('User components', () => {
    test('renders welcome message', () => {
        render(
            <BrowserRouter>
                <User />
            </BrowserRouter>
        );

        const mainTitle = screen.getByText(/¡Descubre el sabor auténtico del campo en Rincón Rural!/i);

        expect(mainTitle).toBeInTheDocument();



    });


})