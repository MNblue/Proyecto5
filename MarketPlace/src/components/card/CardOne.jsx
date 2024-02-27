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
// import withReactContent from '@sweetalert2/react-content';

function CardOne({ isLogged }) {

    //const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    //indice para recorrer el slider
    const [startIndex, setStartIndex] = useState(0);
    //para el boton izquierdo llevar la cuenta
    const handleClickLeft = () => {
        setStartIndex(startIndex > 0 ? startIndex - 1 : startIndex);
    };
    //para el boton derecho llevar la cuenta
    const handleClickRight = () => {
        setStartIndex(startIndex + 1);
    };


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
        const findedProduct = productList.find(product => product.id === id);
        setProductSelected(findedProduct);
        navigate('/CardDetail', { state: { findedProduct, isLogged } });
    }

    async function deleteData(id) {
        try {
            // Accedo a productService, en concreto a su método GET. 
            const products = await productService.deleteProduct(id);
            const newList = productList.filter(producto => producto.id !== id);
            // Actualizar el estado con la nueva lista de productos
            setProductList(newList);
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
        }
    };

    // function handleClickDelete(id) {
    //     
    //     //deleteData(id);
    // }

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
            // Accedo a productService, en concreto a su método GET. 
            const products = await productService.updateProduct(id);
            getData();
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    };


    // function solicitarCantidad(maxCantidad) {
    //     return new Promise((resolve, reject) => {
    //         swal({
    //             text: "Ingrese la cantidad que desea comprar:",
    //             content: "input",
    //             buttons: {
    //                 cancel: "Cancelar",
    //                 confirm: "Aceptar"
    //             },
    //         })
    //             .then((value) => {
    //                 // Verificar si se ingresó un número válido
    //                 if (value === null || isNaN(value) || value.trim() === "") {
    //                     swal("Error", "Por favor ingrese una cantidad válida", "error");
    //                     reject("Cantidad inválida");
    //                 } else {
    //                     // Convertir la cantidad a número entero
    //                     const cantidad = parseInt(value);
    //                     // Verificar si la cantidad está dentro del rango permitido
    //                     if (cantidad > 0 && cantidad <= maxCantidad) {
    //                         swal("Éxito", "Has comprado " + cantidad + " productos", "success");
    //                         resolve(cantidad);

    //                     } else {
    //                         swal("Error", "La cantidad debe ser mayor que cero y menor o igual que " + maxCantidad, "error");
    //                         reject("Cantidad fuera de rango");
    //                     }
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error("Error en la solicitud de cantidad:", error);
    //                 reject(error);
    //             });
    //     });
    // }

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
        //      <>

        //    </> //     <Container>
        //         <Row>
        //             {productList.map((product, index) => (
        //                 <Col key={index} md={3} className="mb-2">
        //                     <Card className="sombreado" style={{ width: '18rem' }}>
        //                         <Card.Text style={{ color: 'green', textAlign: 'center', backgroundColor: 'lightgray' }}>
        //                             {product.category}
        //                         </Card.Text>
        //                         <Card.Img variant="top" src={product.file} />
        //                         <Card.Body>
        //                             <Card.Title style={{ color: 'green' }}>{product.name}</Card.Title>
        //                             <Card.Text className="descripcion">
        //                                 {product.description}<br></br>
        //                             </Card.Text>
        //                             <span className="precioDestacado">{product.price}</span> €<br></br>
        //                             Stock <span>{product.stock}</span>
        //                             <div style={{ textAlign: 'center' }}>

        //                                 {/* {isLogged ? (<Button variant="primary" disabled ={!isLogged}>Comprar</Button>):
        //                                 ((<Button variant="primary" disabled ={!isLogged} >Comprar2222</Button>))
        //                                 }
        //                                  */}

        //                                 {isLogged ? (
        //                                     <span>
        //                                         <Button variant="primary" disabled={!isLogged} onClick={() => handleClickUpdateStock(product)} >Comprar</Button>
        //                                         <Button variant="primary" disabled={!isLogged} onClick={() => handleClickDelete(product.id)}>Eliminar</Button>
        //                                     </span>
        //                                 ) : (
        //                                     <OverlayTrigger
        //                                         placement="top"
        //                                         overlay={<Tooltip id="tooltip-disabled">Debes Logearte para poder comprar</Tooltip>}
        //                                         trigger={['hover', 'focus']} // Muestra el tooltip en el hover y el foco
        //                                     >
        //                                         <span className="d-inline-block">
        //                                             <Button variant="primary" disabled={!isLogged}>Comprar</Button>
        //                                         </span>
        //                                     </OverlayTrigger>
        //                                 )}



        //                                 <span style={{ margin: '0 2px' }}></span>

        //                                 <Button variant="primary" id={product.id} onClick={() => handleClick(product.id)}>ver más</Button>

        //                             </div>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //             ))}
        //         </Row>
        //     </Container>
        // </>


        // <>
        //     return (
            <>
                <Container>
                    <Row>
                        {productList.slice(startIndex, startIndex + 4).map((product, index) => (
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
                                            {isLogged ? (
                                                <Button variant="primary" disabled={!isLogged}>Comprar</Button>
                                            ) : (
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-disabled">Debes Logearte para poder

                                                        comprar</Tooltip>}

                                                    trigger={['hover', 'focus']}
                                                >
                                                    <span className="d-inline-block">
                                                        <Button variant="primary" disabled={!isLogged}>Comprar2222</Button>
                                                    </span>
                                                </OverlayTrigger>
                                            )}
                                            <span style={{ margin: '0 2px' }}></span>

                                            <Button variant="primary" id={product.id} onClick={() =>

                                                handleClick(product.id)}>ver más</Button>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button variant="secondary" onClick={handleClickLeft} disabled={startIndex === 0}>Anterior</Button>{' '}
                    <Button variant="secondary" onClick={handleClickRight} disabled={startIndex + 4 >= productList.length}>Siguiente</Button>
                </div>
            </>
            );
    //     </>



    // );
}
export default CardOne;