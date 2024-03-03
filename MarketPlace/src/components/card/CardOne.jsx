import './cardOne.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
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
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function CardOne({ isLogged, selectOpt }) {

    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    //indice para recorrer el slider
    const [startIndex, setStartIndex] = useState(0);
    const [filteredProductList, setFilteredProductList] = useState([]);


    getData();


    useEffect(() => {
        filterData();
        console.log("datos...............");
        console.log(productList);
    }, [selectOpt]);


    //esta es la función que carga los datos almacenados en el json
    async function getData() {
        try {
            // Accedo a productService, en concreto a su método GET. 
            const products = await productService.getAllProducts();

            // Ahora actualizo el estado de userList con esta variable (usuarios)
            setProductList(products);
            setFilteredProductList(productList);
            filterData();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    async function filterData() {

        if (selectOpt !== 'option1') {
            let auxSelectOpt;
            if (selectOpt === 'option2') {
                auxSelectOpt = 'De la huerta a la mesa';
            } else if (selectOpt === 'option3') {
                auxSelectOpt = 'Elaborados';
            } else if (selectOpt === 'option4') {
                auxSelectOpt = 'Artesanía local';
            }
            let filteredList = productList.filter(product => product.category === auxSelectOpt);
            setFilteredProductList(filteredList);
            setStartIndex(0); // Reiniciar el índice al principio de la lista filtrada
        } else {
            setFilteredProductList(productList);
        }
    }

    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleNext = () => {
        if (startIndex < productList.length - 4) {
            setStartIndex(startIndex + 1);
        }
    };


    function handleClick(id) {
        const findedProduct = productList.find(product => product.id === id);
        setProductSelected(findedProduct);
        navigate('/CardDetail', { state: { findedProduct, isLogged } });
    }

    async function deleteData(id) {
        try {
            // Accedo a productService, 
            const products = await productService.deleteProduct(id);
            const newList = productList.filter(producto => producto.id !== id);
            // Actualizar el estado con la nueva lista de productos
            setProductList(newList);
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
        }
    };


    function handleClickUpdateStock(product) {

        solicitarCantidad(parseInt(product.stock))
            .then((cantidad) => {
                // La cantidad se recupera aquí 
                const nuevoStock = parseInt(product.stock) - cantidad;
                product.stock = nuevoStock.toString();
                // Llamar a la función para actualizar el stock
                actualizarStock(product);
            })
            .catch((error) => {
                // Manejo de errores, si es necesario
                console.error("Error:", error);
            });
    }


    const actualizarStock = (productoActualizado) => {
        updateProduct(productoActualizado, productoActualizado.id);
    };

    async function updateProduct(id) {
        try {
            // Accedo a productService
            const products = await productService.updateProduct(id);
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    };


    function solicitarCantidad(maxCantidad) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Ingrese la cantidad que desea comprar:',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: (cantidad) => {
                    if (!cantidad || isNaN(cantidad) || cantidad.trim() === "") {
                        Swal.showValidationMessage('Por favor ingrese una cantidad válida');
                    } else {
                        const cantidadNum = parseInt(cantidad);
                        if (cantidadNum > 0 && cantidadNum <= maxCantidad) {
                            return cantidadNum;
                        } else {
                            Swal.showValidationMessage(`La cantidad debe ser mayor que cero y menor o igual que ${maxCantidad}`);
                        }
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(result.value);
                } else {
                    reject('Operación cancelada');
                }
            });
        });
    }


    const handleClickDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de eliminar este elemento?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Rechazar'
        });

        if (result.isConfirmed) {
            deleteData(id);
        }
    };

    return (
        <>
            <Container className="containerA">
                <Row className='firstRow' >
                    <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '40px' }}>
                        <button onClick={handlePrevious} disabled={startIndex === 0} className='btnArrow' style={{ visibility: startIndex === 0 ? 'hidden' : 'visible' }} ><img src='/src/components/card/atras.png' className='imgBtnArrow' /></button>
                    </Col>
                    <Col>
                        <Row className='ContainerCardsRow'>
                            {filteredProductList.slice(startIndex, startIndex + 4).map((product, index) => (
                                <Col key={index} xs={380} md={3} className="mb-1 sizeP">
                                    {/* <Col key= md={3} className="mb-1"> */}
                                    <Card className="classCategory">
                                        <Card.Text className='cardTxt'>
                                            <div className={isLogged ? 'btnDeleteDch' : 'btnDeleteDchUser'}>
                                                <div > {product.category}</div>
                                                <div style={{ textAlign: 'right' }}>
                                                    {isLogged && (<button disabled={!isLogged} onClick={() => handleClickDelete(product.id)} className='deleteBtn' ><img src='/src/components/card/delete.png' className='imgBtnDelete' /></button>)}
                                                </div>
                                            </div>
                                        </Card.Text>
                                        <div className='divCardImg'>
                                            <Card.Img variant="top" src={product.file} className='imgCard' />
                                            <div className='boxSmallPrice'>
                                                {product.price} €
                                            </div>
                                        </div>
                                        <Card.Body className='bodyCards'>
                                            <div style={{ textAlign: 'right', paddingBottom: '5px' }}><span className='boxSmall'>Stock: {product.stock}</span></div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                <div style={{ padding: '8px' }}>
                                                    <Card.Title className='text1'>{product.name}</Card.Title>
                                                    <Card.Text className="descripcion">
                                                        {product.description}<br></br>
                                                    </Card.Text>
                                                </div>
                                                <div className='divBtn' >
                                                    {isLogged ? (
                                                        <button disabled={!isLogged} className='btn2' onClick={() => handleClickUpdateStock(product)}><img src='/src/components/card/carrito1.png' style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '5px', marginTop: '-2px' }} /> Comprar</button>
                                                    ) : (
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip className="custom-tooltip">Debes Logearte para poder comprar</Tooltip>}
                                                            trigger={['hover', 'focus']}
                                                        >
                                                            <button disabled={!isLogged} className='btn1'> <img src='/src/components/card/carrito1.png' className='imgCarrito' /> Comprar</button>
                                                        </OverlayTrigger>
                                                    )}
                                                    <button id={product.id} onClick={() => handleClick(product.id)} className='btn2' style={{ display: 'flex', alignItems: 'center' }}><img src='/src/components/card/mas.png' className='verMas' /> Ver más</button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '60px' }} >
                        <button onClick={handleNext} disabled={startIndex >= filteredProductList.length - 4} className='btnArrow' style={{ visibility: startIndex === filteredProductList.length - 4 ? 'hidden' : 'visible' }}><img src='/src/components/card/sig.png' className='imgBtnArrow' /></button>
                    </Col>
                </Row>
            </Container>
        </>
    );

}
export default CardOne;