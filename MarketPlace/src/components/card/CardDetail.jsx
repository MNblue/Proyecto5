import './cardDetail.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'; // Importa useEffect para llamar a getData una vez que el componente se ha montado
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { productService } from '../../service/productService';
import * as formik from "formik";
import * as yup from "yup";
import NavbarOne from '../navbar/NavbarOne';
import LoginPopUp from '../loginPopUp/LoginPopUp';
import turnleft from './turnleft.png';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import { center } from '@cloudinary/transformation-builder-sdk/qualifiers/textAlignment';


function CardDetail() {
  const location = useLocation();
  const product = location.state?.findedProduct;
  const { Formik } = formik;
  const isLogged = location.state?.isLogged;
  const [imageUrl, setImageUrl] = useState(product.file);


  const [editable, setEditable] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const [isModalOpen, setIsModalOpen] = useState(false);

  //si hacemos clic en el boton de editar entonces la variable editable es true para que se pueda editar ya que al inicio es false
  const handleEditClick = () => {
    setEditable(true);
  };

  //cuando hagamos cambios en cualquier campo, que esto se indica por name, cambiamos su value asi tomamos el nuevo valor
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  //cuando hacemos clic en el boton guardar, actualizamos los datos en el json y luego la vble editable a false para que se pongan los campos como No editables otra vez
  const handleSaveClick = () => {
    updateData();
    setEditable(false);
  };

  async function updateData() {
    try {
      const products = await productService.updateProduct(editedProduct, editedProduct.id);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  // Función para cambiar la imagen
  const changeImage = () => {
    // const newImageUrl = 'nueva/ruta/imagen.jpg';
    // setImageUrl(newImageUrl);



  };

  const handleUploadClick = (setFieldValue, setFieldTouched) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dgusxuq9j",
        uploadPreset: "nfmirk0o",
      },
      (error, result) => {
        // Comprobar si el widget se cerró sin cargar una imagen
        if (error && error.event === 'widget.closed') {
          // Marcar el campo como tocado para mostrar el error de validación
          // setFieldTouched ('file', true);
          console.log("error al cargar la imagen");
        }
        // Comprueba si el evento es 'success'
        if (result.event === "success") {
          console.log("La imagen se ha cargado con éxito");
          const url = result.info.secure_url;
          setImageUrl(url);
          // formik.setFieldValue("file", imageUrl);
          // setFieldTouched ('file', true);
          setEditedProduct({ ...editedProduct, file: url });
          updateData();



        }
      }
    );
    widget.open();
  };

  // const ImageUpload = () => {
  //   const handleSubmit = async (values) => {
  //     // Obtener la URL de la imagen del estado
  //     const imageUrl = values.file;
  //     // Hacer algo con la URL, como enviarla a otro servicio o mostrarla en la interfaz
  //   };
  // }

  return (
    <>
      <NavbarOne />
      <main>

        <Link
          to="/" 
          style={{
            position: 'absolute',
            top: '100px',
            right: '200px',
            zIndex: '9999',
            marginTop: '30px',
            marginRight: '300px',
            padding: '5px',
            backgroundColor: 'white',
            boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.2)',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            textDecoration: 'none', 
            fontFamily: 'Fredoka One',

          }}
        >
          Volver <img src={turnleft} style={{ width: '30px', height: '30px' }} />
        </Link>

       
        <Container className="containerDetail" style={{ width: '30%'}}>
  <Row>
    <Col>
      <Row>
        <Col md={3} className="detail">
          <Card className="classCategory1" style={{ width: '40rem', height: '50rem', display: 'flex', flexDirection: 'column', boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.2)' , marginTop: '50px' }}>

            {/* ... Otras partes del código ... */}

            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px', gap: '20px', textAlign: 'center', position: 'relative' }}>
              <Card.Img variant="top" src={imageUrl} className='imgCardDetail' />
              <div className='btnChangeImg' style={{ width: '100%' }}>
                {editable && <Button variant="success" onClick={handleUploadClick} style={{ backgroundColor: '#EBE8E8', color: 'black', width: '100%' }}>Cambiar imagen</Button>}
              </div>
            </div>

            <Card.Body style={{ flex: '1', padding: '0px', display: 'flex', flexDirection: 'column' }}>

<div style={{ width: '100%' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
    <div className='textCategoryName'>
      <select name="category" value={editable ? editedProduct.category : product.category} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none', alignItems: 'center', width: '100%' }}>
        <option value="Categoría">Categoría</option>
        <option value="De la huerta a la mesa">De la huerta a la mesa</option>
        <option value="Artesanía local">Artesanías Locales</option>
        <option value="Elaborados">Productos Elaborados</option>
      </select>
    </div>
    <div className="productName">
      <Card.Title style={{ color: 'grey' }}>Producto :
        <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }} />
      </Card.Title>
    </div>
  </div>

  <div className="description" style={{ width: '100%' }}>
    Descripción del Producto:
    <textarea name="description" value={editedProduct.description} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none', width: '100%', overflowX: 'auto' }} />
  </div>
</div>

<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
  <div className="boxSmallPriceDetail"

   >
    <span className="precioDestacado">Precio:
      <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }} /> €
    </span>
  </div>

  <div className="boxSmallStock" 
  
  >
    Unidades disponibles:
    <span className="stock">
      <input type="number" name="stock" value={editedProduct.stock} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }} />
    </span>
  </div>
</div>

</Card.Body>

<div style={{ width: '100%', textAlign: 'center' }}>
{editable
  ? <Button className="editProduct" variant="success" onClick={handleSaveClick} style={{ width: '100%' }}>Guardar</Button>
  : <Button className="editProduct" variant="primary" onClick={handleEditClick} style={{ display: isLogged ? 'inline' : 'none', width: '100%' }}>Editar producto</Button>
}
</div>

</Card>
</Col>
</Row>
</Col>
</Row>
</Container>





      </main >
      <Footer />
    </>
  );
}

export default CardDetail;
