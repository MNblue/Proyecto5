import "./cardDetail.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react"; // Importa useEffect para llamar a getData una vez que el componente se ha montado
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import { productService } from "../../service/productService";
import * as formik from "formik";
import * as yup from "yup";
import NavbarOne from "../navbar/NavbarOne";
import LoginPopUp from "../loginPopUp/LoginPopUp";
import turnleft from "./turnleft.png";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function CardDetail() {
  const location = useLocation();
  const product = location.state?.findedProduct;
  const { Formik } = formik;
  const isLogged = location.state?.isLogged;
  const [imageUrl, setImageUrl] = useState(product.file);

  const [editable, setEditable] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    handlePopUp();
  };

  async function updateData() {
    try {
      const products = await productService.updateProduct(
        editedProduct,
        editedProduct.id
      );
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  }

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
        if (error && error.event === "widget.closed") {
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

  const handlePopUp = async () => {
    const result = await Swal.fire({
      title: "Tu producto se ha guardado correctamente",
      text: " ",
      icon: "succes",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });
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
      <main className="contenedorPpal">
        <div className="item1">
          <NavbarOne openModal={openModal} isLogged={isLogged} />
          {isModalOpen && <LoginPopUp closeModal={closeModal} />}
        </div>
        <Container className="d-flex justify-content-end mt-5">
          <Row>
            <Col>
              <Link
                to={isLogged ? "/admin" : "/"}
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                  color: "black",
                  border: "none",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Volver{" "}
                <img src={turnleft} style={{ width: "20px", height: "20px" }} />
              </Link>
            </Col>
          </Row>
        </Container>
        <div className="item2 mt-5 me-4 ms-4">
          <Card
            className="cardStyle "
            style={{
              width: "28rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "100px",
            }}
          >
            <div
              className="d-flex justify-content-center"
              style={{ position: "relative" }}
            >
              <Card.Img
                variant="top"
                src={imageUrl}
                style={{
                  width: "95%",
                  height: "95%",
                  marginTop: "10px",
                  borderRadius: "8px",
                  borderColor: "#aca6a6",
                  border: "1px solid",
                }}
              />
              {editable && (
                <button
                  className="btn3a"
                  onClick={handleUploadClick}
                  style={{
                    position: "absolute",
                    bottom: "18px",
                    right: "10px",
                  }}
                >
                  Cambiar imagen
                </button>
              )}
            </div>

            <Card.Body
              style={{
                backgroundColor: "#F5F5F5",
                marginRight: "10px",
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                width: "100%",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ marginBottom: "20px" }}>
                  <label htmlFor="name">Producto:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                    disabled={!editable}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#EBE8E8",
                      borderRadius: "8px",
                      boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                      width: "90%",
                    }}
                  />
                </div>

                <div>
                  Categoría:
                  <select
                    name="category"
                    value={editable ? editedProduct.category : product.category}
                    onChange={handleInputChange}
                    disabled={!editable}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#EBE8E8",
                      borderRadius: "8px",
                      boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                      width: "90%",
                    }}
                  >
                    <option value="De la huerta a la mesa">De la huerta a la mesa</option>
                    <option value="Artesanías">Artesanías Locales</option>
                    <option value="Elaborados">Productos Elaborados</option>
                  </select>
                </div>
              </div>
              Descripción:
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                disabled={!editable}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  height: "150px",
                  overflowX: "auto",
                  backgroundColor: "#EBE8E8",
                  borderRadius: "8px",
                  boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                }}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  Precio:
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    disabled={!editable}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#EBE8E8",
                      borderRadius: "8px",
                      boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                      width: "90%",
                    }}
                  />
                </div>
                <div>
                  Stock:
                  <input
                    type="number"
                    name="stock"
                    value={editedProduct.stock}
                    onChange={handleInputChange}
                    disabled={!editable}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#EBE8E8",
                      borderRadius: "8px",
                      boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                      width: "90%",
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {editable ? (
                  <>
                    <Button className="btn1a" onClick={handleSaveClick}>
                      Guardar
                    </Button>
                  </>
                ) : (
                  <Button
                    className="btn2a"
                    onClick={handleEditClick}
                    style={{ display: isLogged ? "inline" : "none" }}
                  >
                    Editar
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="item3">
          <Footer />
        </div>
      </main>
    </>
  );
}

export default CardDetail;
