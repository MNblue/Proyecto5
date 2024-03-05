import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer'; // Asegúrate de que la ruta de importación sea correcta

describe('<Footer/>', () => {
    test('renders the text © InnoConsulting Solutions', () => {
        render(<Footer />);

        // Busca el texto "© InnoConsulting Solutions"
        const textElement = screen.getByText(/© InnoConsulting Solutions/i);

        // Verifica que el texto esté en el documento
        expect(textElement).toBeInTheDocument();
    });
});

