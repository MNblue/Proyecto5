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
          to="/" // Esta línea establece la URL a la que se dirigirá el enlace
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
            textDecoration: 'none', // Elimina la subrayado predeterminado del enlace
            fontFamily: 'Fredoka One',

          }}
        >
          Volver <img src={turnleft} style={{ width: '30px', height: '30px' }} />
        </Link>

        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card className="sombreado" style={{ width: '44rem' }}>
        <div style={{ color: 'green', textAlign: 'center', backgroundColor: 'lightcolor' }}>
         
          <select name="category" value={editable ? editedProduct.category : product.category} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }}>
            <option value="De la huerta a la mesa">De la huerta a la mesa</option>
            <option value="Artesanía local">Artesanías Locales</option>
            <option value="Elaborados">Productos Elaborados</option>
          </select>
        </div>
        <Card.Img variant="top" src={imageUrl} />

        {editable && <Button  variant="success" onClick={handleUploadClick}>Cambiar imagen</Button>}
       
        <Card.Body>
          <Card.Title style={{ color: 'green' }}>
            <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }} />
          </Card.Title>
          <Card.Text>
            <textarea name="description" value={editedProduct.description} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none', width: '100%', overflowX: 'auto' }} />
            <br />
            <span className="precioDestacado">
              <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }} /> €
            </span><br></br> Stock 
            <span className="stock">
              <input type="number" name="stock" value={editedProduct.stock} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }} />
            </span>
          </Card.Text>
          <div style={{ textAlign: 'center' }}>
            {editable 
              ? <Button variant="success" onClick={handleSaveClick} >Guardar</Button>
              : <Button variant="primary" onClick={handleEditClick} style={{ display: isLogged? 'inline' : 'none' }}>Editar</Button>
            }
          </div>
        </Card.Body>
      </Card>
       
    </div> */}








        <Container className="containerDetail" style={{ width: '30%' }}>
          <Row >
            {/* <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{backgroundColor:'green'}}> */}

            <Col>
              <Row>


                <Col md={3} className="detail">
                  <Card className="classCategory1" style={{ width: '40rem', height: '50rem', display: 'flex', flexDirection: 'column', boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.2)' }}>

                    <Card.Text style={{ textAlign: 'center', marginTop: '20px', paddingBottom: '0px', marginBottom: '0px', fontSize: '20px', color: 'black',}}>

                      {/* <div className={isLogged ? 'btnDeleteDch' : 'btnDeleteDchUser'}> */}
                      {/* <div > {product.category}</div> */}
                      {/* <div style={{ textAlign:'right'}}>
                                                    {isLogged && (<button disabled={!isLogged} onClick={() => handleClickDelete(product.id)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', outline: 'none', marginLeft: 'auto' }}><img src='/src/components/card/delete.png' style={{ width: '14px', height: '14px', border: 'none' }} /></button>)}
                                                </div>
                                            </div> */}

                    </Card.Text>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '0px', gap: '20px', textAlign: 'center', position: 'relative' }}>
                      <Card.Img variant="top" src={product.file} className='imgCardDetail' />

                    </div>

                    <Card.Body style={{ flex: '1', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                          <div>
                            <Card.Title className='textCategoryName'>Categoría: {product.category}</Card.Title>
                          </div>

                          <div>
                            <Card.Title className='textProductName'>Producto: {product.name}</Card.Title>
                          </div>

                        </div>
                        
                        <Card.Text className="description" style={{ textAlign: 'center', margin: '0 20px' }}> Descripción: 
                          {product.description}<br></br>
                        </Card.Text>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                          <div className='boxSmallDetail' style={{ textAlign: 'center' }}>
                            Unidades: {product.stock}
                          </div>

                          <div className='boxSmallPriceDetail' style={{ textAlign: 'center' }}>
                            Precio: {product.price} €
                          </div>
                          
                        </div>
                      </div>
                    </Card.Body>


                  </Card>
                </Col>

              </Row>
            </Col>



          </Row>
        </Container>




      </main>
      <Footer />
    </>
  );
}

export default CardDetail;
