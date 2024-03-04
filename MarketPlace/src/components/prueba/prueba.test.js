import React from "react";
import { render, screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Prueba from "./prueba.jsx";

describe("<Prueba/>",()=>{
    test("Funcionalidad del h1 Count", ()=>{
        render(<Prueba/>);

        const h1 = screen.getByText(/Decir hola/i);

        expect(h1).toBeInTheDocument();

    });
})