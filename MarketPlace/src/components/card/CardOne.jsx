import './cardOne.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'; // Importa useEffect para llamar a getData una vez que el componente se ha montado
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { productService } from '../../service/productService';
import CardDetail from './CardDetail';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


function CardOne({ isLogged }) {

    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    //esta es la función que carga los datos almacenados en el json
    async function getData() {
        try {
            // Accedo a productService, en concreto a su método GET. 
            const products = await productService.getAllProducts();
            // Ahora actualizo el estado de userList con esta variable (usuarios)
            setProductList(products);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    // Llamo a getData() para traer los datos una vez que el componente se ha montado
    useEffect(() => {
        getData();
    }, []); // Pasa un arreglo vacío como segundo argumento para asegurar que getData solo se ejecute una vez

    useEffect(() => {
        getData();
    }, [productList]);

    function handleClick(id) {
        // let btn=document.getElementById(id);
        // alert(btn.id);
        const findedProduct = productList.find(product => product.id === id);
        setProductSelected(findedProduct);
        navigate('/CardDetail', { state: { findedProduct, isLogged } });
    }



    return (
        <>
        
            <Container>
                <Row>
                    {productList.map((product, index) => (
                        <Col key={index} md={3} className="mb-2">
                            <Card className="sombreado" style={{ width: '14rem' }}>
                                <Card.Text style={{ color: 'green', textAlign: 'center', backgroundColor: 'lightgray' }}>
                                    {product.category}
                                </Card.Text>
                                <Card.Img variant="top" src={product.file} />
                                <Card.Body>
                                    <Card.Title style={{ color: 'green' }}>{product.name}</Card.Title>
                                    <Card.Text>
                                        {product.description}<br></br>
                                        <span className="precioDestacado">{product.price}</span>
                                    </Card.Text>
                                    <div style={{ textAlign: 'center' }}>

                                        {/* {isLogged ? (<Button variant="primary" disabled ={!isLogged}>Comprar</Button>):
                                        ((<Button variant="primary" disabled ={!isLogged} >Comprar2222</Button>))
                                        }
                                         */}

                                        {isLogged ? (
                                            <Button variant="primary" disabled={!isLogged}>Comprar</Button>
                                        ) : (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-disabled">Debes Logearte para poder comprar</Tooltip>}
                                                trigger={['hover', 'focus']} // Muestra el tooltip en el hover y el foco
                                            >
                                                <span className="d-inline-block">
                                                    <Button variant="primary" disabled={!isLogged}>Comprar2222</Button>
                                                </span>
                                            </OverlayTrigger>
                                        )}



                                        <span style={{ margin: '0 2px' }}></span>

                                        <Button variant="primary" id={product.id} onClick={() => handleClick(product.id)}>ver más</Button>

                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
export default CardOne;