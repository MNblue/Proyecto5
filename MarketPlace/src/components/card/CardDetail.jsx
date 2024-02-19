import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'; // Importa useEffect para llamar a getData una vez que el componente se ha montado
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';



function CardDetail() {
    const location = useLocation();
    const product = location.state?.findedProduct;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className="sombreado" style={{ width: '44rem'  }}>
                <Card.Text style={{ color: 'green', textAlign: 'center', backgroundColor: 'lightgray' }}>
                    {product.category}
                </Card.Text>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title style={{ color: 'green' }}>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}<br></br>
                        <span className="precioDestacado">{product.price}</span>
                    </Card.Text>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="primary">Editar</Button>
                        <span style={{ margin: '0 2px' }}></span>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardDetail;
