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
import turnleft from './turnleft.png';




function CardDetail() {
  const location = useLocation();
  const product = location.state?.findedProduct;
  const { Formik } = formik;
  const isLogged = location.state?.isLogged;
  const [imageUrl, setImageUrl] = useState(product.file);
  

  const [editable, setEditable] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

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
    <main>
    <Button style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '9999', marginTop:"40px", marginRight:"200px", backgroundColor: "white", boxShadow: "1px 18px 25px -8px rgba(107,102,107,0.73)", color:"black", border:"none" }} onClick={() => history.push('/')}>Volver <img src={turnleft} style={{width:"30px",height:"30px"}}/></Button>

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








<Container className="containerA" style={{ width: '60%' }}>
                <Row >
                    {/* <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{backgroundColor:'green'}}> */}
                    <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '40px' }}>
                        {/* <button onClick={handlePrevious} disabled={startIndex === 0} className='btnArrow' style={{ visibility: startIndex === 0 ? 'hidden' : 'visible' }} ><img src='/src/components/card/atras.png' style={{ width: '16px', height: '16px' }} /></button> */}
                        <button onClick={handlePrevious} disabled={startIndex === 0} className='btnArrow' style={{ visibility: startIndex === 0 ? 'hidden' : 'visible' }} ><img src='/src/components/card/atras.png' style={{ width: '16px', height: '16px' }} /></button>

                    </Col>
                    <Col >
                        <Row>
                            {filteredProductList.slice(startIndex, startIndex + 4).map((product, index) => (
                                //  {productList.slice(startIndex, startIndex + 4).map((product, index) => (

                                <Col key={index} md={3} className="mb-1">
                                    <Card className="classCategory" style={{ width: '10rem', display: 'flex', flexDirection: 'column', boxShadow: ' 1px 12px 16px -1px rgba(174,187,209,0.81)' }}>
                                        <Card.Text style={{ textAlign: 'center', marginTop: '5px', paddingBottom: '0px', marginBottom: '0px', fontSize: '12px' }}>

                                            <div className={isLogged ? 'btnDeleteDch' : 'btnDeleteDchUser'}>
                                                <div > {product.category}</div>
                                                <div style={{ textAlign:'right'}}>
                                                    {isLogged && (<button disabled={!isLogged} onClick={() => handleClickDelete(product.id)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', outline: 'none', marginLeft: 'auto' }}><img src='/src/components/card/delete.png' style={{ width: '14px', height: '14px', border: 'none' }} /></button>)}
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
                                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                    {isLogged ? (
                                                        <button disabled={!isLogged} className='btn2' onClick={() => handleClickUpdateStock(product)}><img src='/src/components/card/carrito1.png' style={{ width: '16px', height: '16px' }} /> Comprar</button>
                                                    ) : (
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip className="custom-tooltip">Debes Logearte para poder comprar</Tooltip>}
                                                            trigger={['hover', 'focus']}
                                                        >
                                                            <button disabled={!isLogged} className='btn1'> <img src='/src/components/card/carrito1.png' style={{ width: '16px', height: '16px' }} /> Comprar</button>
                                                        </OverlayTrigger>
                                                    )}
                                                    <button id={product.id} onClick={() => handleClick(product.id)} className='btn2'><img src='/src/components/card/mas.png' style={{ width: '14px', height: '14px' }} /> Ver más</button>
                                                </div>
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    {/* <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '40px' }} >
                        <button onClick={handleNext} disabled={startIndex >= productList.length - 4} className='btnArrow' style={{ visibility: startIndex === productList.length - 4 ? 'hidden' : 'visible' }}><img src='/src/components/card/sig.png' style={{ width: '16px', height: '16px' }} /></button>
                    </Col> */}

                    <Col xs="auto" className="d-flex align-items-center justify-content-center" style={{ width: '40px' }} >
                        <button onClick={handleNext} disabled={startIndex >= filteredProductList.length - 4} className='btnArrow' style={{ visibility: startIndex === filteredProductList.length - 4 ? 'hidden' : 'visible' }}><img src='/src/components/card/sig.png' style={{ width: '16px', height: '16px' }} /></button>
                    </Col>


                </Row>
            </Container>



            
    </main>
    </>
  );
}

export default CardDetail;
