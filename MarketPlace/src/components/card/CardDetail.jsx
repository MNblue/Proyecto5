import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'; // Importa useEffect para llamar a getData una vez que el componente se ha montado
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { productService } from '../../service/productService';





function CardDetail() {
  const location = useLocation();
  const product = location.state?.findedProduct;

  const isLogged = location.state?.isLogged;


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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card className="sombreado" style={{ width: '44rem' }}>
        <div style={{ color: 'green', textAlign: 'center', backgroundColor: 'lightgray' }}>
          {/* <input type="text" name="category" value={editable ? editedProduct.category : product.category} onChange={handleInputChange} disabled={!editable}  style={{ border: 'none', outline: 'none' }}/> */}
          <select name="category" value={editable ? editedProduct.category : product.category} onChange={handleInputChange} disabled={!editable} style={{ border: 'none', outline: 'none' }}>
            <option value="huerta">De la huerta a la mesa</option>
            <option value="artesanias">Artesanías Locales</option>
            <option value="elaborados">Productos Elaborados</option>
          </select>
        </div>
        <Card.Img variant="top" src={editedProduct.file || product.file} />
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
    </div>
  );
}

export default CardDetail;
