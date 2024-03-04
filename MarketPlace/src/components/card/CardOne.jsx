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

function CardOne({ isLogged, selectOpt }) {

    //const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    //indice para recorrer el slider
    const [startIndex, setStartIndex] = useState(0);
    const [filteredProductList, setFilteredProductList] = useState([]);

// Define la variable para controlar el número de elementos a mostrar
// const numItemsToShow = window.innerWidth >= 763 ? 4 : 3; // Si el ancho de la ventana es mayor o igual a 992px, muestra 4 elementos, de lo contrario muestra 2 elementos

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
        if (windowWidth >= 890) {
            return 4;
        } else if (windowWidth >= 880) {
            return 3;
        } else if (windowWidth >= 560) {
            return 2;
        } else {
            return 1;
        }
    }

    //para el boton izquierdo llevar la cuenta
    const handleClickLeft = () => {
        setStartIndex(startIndex > 0 ? startIndex - 1 : startIndex);
    };
    //para el boton derecho llevar la cuenta
    const handleClickRight = () => {
        setStartIndex(startIndex + 1);
    };

   // Llamo a getData() para traer los datos una vez que el componente se ha montado
    useEffect(() => {
        getData();
    }, []); // Pasa un arreglo vacío como segundo argumento para asegurar que getData solo se ejecute una vez


 // getData();
    useEffect(() => {

        filterData();
        // getData();
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
            setFilteredProductList(products);
           // filterData();
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


    // useEffect(() => {
    //     getData();
    // }, [productList]);



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
            // getData();
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
            <div className="containerA" style={{ width: '100%' }}>
                <Row className='rowContent'>
                    {/* <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{backgroundColor:'green'}}> */}
                    <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '60px',margin:'1px',padding:'0' }}>
                        {/* <button onClick={handlePrevious} disabled={startIndex === 0} className='btnArrow' style={{ visibility: startIndex === 0 ? 'hidden' : 'visible' }} ><img src='/src/components/card/atras.png' style={{ width: '16px', height: '16px' }} /></button> */}
                        <button onClick={handlePrevious} disabled={startIndex === 0} className='btnArrow' style={{ visibility: startIndex === 0 ? 'hidden' : 'visible' }} ><img src='/src/components/card/atras.png' style={{ width: '16px', height: '16px' }} /></button>

                    </Col>
                    <Col >
                        <Row className='colCenterSmall'>
                            {filteredProductList.slice(startIndex, startIndex + numItemsToShow).map((product, index) => (
                                //  {productList.slice(startIndex, startIndex + 4).map((product, index) => (

                                <Col key={index} md={3} className='colContent'>
                                    <Card className="classCategory" style={{ display: 'flex', flexDirection: 'column', boxShadow: ' 1px 12px 16px -1px rgba(174,187,209,0.81)' }}>
                                        <Card.Text style={{ textAlign: 'center', marginTop: '5px', paddingBottom: '0px', marginBottom: '0px', fontSize: '12px' }}>

                                            <div className={isLogged ? 'btnDeleteDch' : 'btnDeleteDchUser'}>
                                                <div className='textCategory'> {product.category}</div>
                                                <div style={{ textAlign:'right'}}>
                                                    {isLogged && (<button disabled={!isLogged} onClick={() => handleClickDelete(product.id)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', outline: 'none', marginLeft: 'auto' }}><img src='/src/components/card/delete.png' style={{ width: '16px', height: '18px', border: 'none' }} /></button>)}
                                                </div>
                                            </div>

                                        </Card.Text>
                                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '0px', gap: '20px', textAlign: 'center', position: 'relative' }}>
                                            <Card.Img variant="top" src={product.file} className='imgCard' />
                                            <div className='boxSmallPrice'>
                                                {product.price} €
                                            </div>
                                        </div>
                                        <Card.Body style={{ flex: '1', padding: '0px' }}>
                                            <div style={{ textAlign: 'right', paddingBottom: '5px' }}><span className='boxSmall'>Stock: {product.stock}</span></div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                <div style={{ padding: '8px' }}>
                                                    <Card.Title className='text1'>{product.name}</Card.Title>
                                                    <Card.Text className="descripcion">
                                                        {product.description}<br></br>
                                                    </Card.Text>
                                                </div>
                                                <div className='containerBtn' style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', gap: '27px' }}>
                                                    {isLogged ? (
                                                        <button disabled={!isLogged} className='btn3' onClick={() => handleClickUpdateStock(product)}><img src='/src/components/card/carrito1.png' style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '5px', marginTop: '-2px' }} /> Comprar</button>
                                                    ) : (
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip className="custom-tooltip">Debes Logearte para poder comprar</Tooltip>}
                                                            trigger={['hover', 'focus']}
                                                        >
                                                            <button disabled={!isLogged} className='btn1'> <img src='/src/components/card/carrito1.png' className='imgCarrito' style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '5px', marginTop: '-2px' }} /> Comprar</button>
                                                        </OverlayTrigger>
                                                    )}
                                                    <button id={product.id} onClick={() => handleClick(product.id)} className='btn2' style={{ display: 'flex', alignItems: 'center' }}><img src='/src/components/card/mas.png' style={{ width: '13px', height: '13px',verticalAlign: 'middle', marginRight: '5px', marginTop: '-2px' }} /> Ver más</button>
                                                </div>
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '40px' }} >
                        <button onClick={handleNext} disabled={startIndex >= filteredProductList.length - 4} className='btnArrow' style={{ visibility: startIndex === filteredProductList.length - 4 ? 'hidden' : 'visible' }}><img src='/src/components/card/sig.png' style={{ width: '16px', height: '16px' }} /></button>
                    </Col>


                </Row>
            </div>

        </>
    );

}
export default CardOne;