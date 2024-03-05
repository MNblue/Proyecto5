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
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function CardOne({ isLogged, selectOpt }) {

    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [filteredProductList, setFilteredProductList] = useState([]);


    const [numItemsToShow, setNumItemsToShow] = useState(getNumItemsToShow());

    useEffect(() => {
        function handleResize() {
            setNumItemsToShow(getNumItemsToShow());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getNumItemsToShow() {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1043) {
            return 4;
        } else if (windowWidth >= 978) {
            return 3;
        } else if (windowWidth >= 650) {
            return 2;
        } else {
            return 1;
        }
    }

    // useEffect(() => {
    //     getData();
    // }, []);

    getData();
    useEffect(() => {
        filterData();
    }, [selectOpt]);


    async function getData() {
        try {
            const products = await productService.getAllProducts();

            setProductList(products);
            setFilteredProductList(productList);
            setFilteredProductList(products);
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
            setStartIndex(0);
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
        if (startIndex < productList.length - numItemsToShow) {
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
            const products = await productService.deleteProduct(id);
            const newList = productList.filter(producto => producto.id !== id);
            setProductList(newList);
            setFilteredProductList(newList);
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
        }
    };


    function handleClickUpdateStock(product) {

        solicitarCantidad(parseInt(product.stock))
            .then((cantidad) => {
                const nuevoStock = parseInt(product.stock) - cantidad;
                product.stock = nuevoStock.toString();
                actualizarStock(product);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }



    const actualizarStock = (productoActualizado) => {
        updateProduct(productoActualizado, productoActualizado.id);
    };

    async function updateProduct(id) {
        try {
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
            <div className="containerA">
                <Row className='rowContent'>
                    <Col xs="auto" className="d-flex align-items-center justify-content-center colBtnA1">
                        <button onClick={handlePrevious} disabled={startIndex === 0} className='btnArrow' style={{ visibility: startIndex === 0 ? 'hidden' : 'visible' }} ><img src='/src/components/card/atras.png' className="arrowBackImg" /></button>
                    </Col>
                    <Col className='centralCol'>
                        <Row className='colCenterSmall'>
                            {filteredProductList.slice(startIndex, startIndex + numItemsToShow).map((product, index) => (
                                <Col key={index} md={3} className='colContent'>
                                    <Card className="classCategory" >
                                        <Card.Text className='cardTextStyle' >
                                            <div className={isLogged ? 'btnDeleteDch' : 'btnDeleteDchUser'}>
                                                <div className='textCategory'> {product.category}</div>
                                                <div style={{ textAlign: 'right' }}>
                                                    {isLogged && (<button disabled={!isLogged} onClick={() => handleClickDelete(product.id)} className='btnDeleteStyle' ><img src='/src/components/card/delete.png' style={{ width: '16px', height: '18px', border: 'none' }} /></button>)}
                                                </div>
                                            </div>
                                        </Card.Text>
                                        <div className='containerPrice' >
                                            <Card.Img variant="top" src={product.file} className='imgCard' />
                                            <div className='boxSmallPrice'>
                                                {product.price} €
                                            </div>
                                        </div>
                                        <Card.Body className='cardBody' >
                                            <div className='containerStock'><span className='boxSmall'>Stock: {product.stock}</span></div>
                                            <div className='containerMiddle'>
                                                <div style={{ padding: '8px' }}>
                                                    <Card.Title className='text1'>{product.name}</Card.Title>
                                                    <Card.Text className="descripcion">
                                                        {product.description}<br></br>
                                                    </Card.Text>
                                                </div>
                                                <div className='containerBtn' >
                                                    {isLogged ? (
                                                        <button disabled={!isLogged} className='btn3' onClick={() => handleClickUpdateStock(product)}><img className='imgBtnComprar' src='/src/components/card/carrito1.png' /> Comprar</button>
                                                    ) : (
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip className="custom-tooltip">Debes Logearte para poder comprar</Tooltip>}
                                                            trigger={['hover', 'focus']}
                                                        >
                                                            <button disabled={!isLogged} className='btn1'> <img src='/src/components/card/carrito1.png' className='imgCarrito' /> Comprar</button>
                                                        </OverlayTrigger>
                                                    )}
                                                    <button id={product.id} onClick={() => handleClick(product.id)} className='btn2' ><img className='imgMas' src='/src/components/card/mas.png' /> Ver más</button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center justify-content-center colBtnA1" >
                        {/* <button onClick={handleNext} disabled={startIndex >= filteredProductList.length - 4} className='btnArrow' style={{ visibility: startIndex === filteredProductList.length - 4 ? 'hidden' : 'visible' }}><img src='/src/components/card/sig.png' className='arrowNextImg' /></button> */}
                        <button onClick={handleNext} disabled={startIndex >= filteredProductList.length - numItemsToShow} className='btnArrow' style={{ visibility: startIndex === filteredProductList.length - numItemsToShow ? 'hidden' : 'visible' }}><img src='/src/components/card/sig.png' className='arrowNextImg' /></button>
                    </Col>
                </Row>
            </div>

        </>
    );

}
export default CardOne;