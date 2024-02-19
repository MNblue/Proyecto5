import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'; // Importa useEffect para llamar a getData una vez que el componente se ha montado
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CardDetail(props) {
    const [productSelected, setProductSelected] = useState(null);

    // useEffect(() => {
    //     const productSelectedString = props.match.params.productSelected;
    //     const decodedProductSelectedString = decodeURIComponent(productSelectedString);
    //     const parsedProductSelected = JSON.parse(decodedProductSelectedString);
    //     setProductSelected(parsedProductSelected);
    // }, [props.match.params.productSelected]);

    // if (!productSelected) {
    //     return <div>Cargando...</div>;
    // }

    return (
        <>
            {/* <h1>{productSelected.name}</h1> */}
            {/* Otro código para mostrar los detalles del producto */}
           <p>fsdfsdfsdfsdf</p> holaaaaaa
        </>
    );
}

export default CardDetail;
