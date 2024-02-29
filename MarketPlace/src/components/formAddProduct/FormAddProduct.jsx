import Card from "react-bootstrap/Card";
import "./formAddProduct.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { productService } from "../../service/productService";
import Swal from "sweetalert2";

function FormAddProduct() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    stock: yup.string().required("El stock es requerido"),
    category: yup.string().required("La categoría es requerida"),
    price: yup.number().required("Solo valores numéricos"),
    description: yup.string().required("La descripción es requerida"),
    file: yup.string().required("La imagen es requerida"),
  });

  const [imageUrl, setImageUrl] = useState("");

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
          setFieldTouched ('file', true);
        }
        // Comprueba si el evento es 'success'
        if (result.event === "success") {
          console.log("La imagen se ha cargado con éxito");
          const url = result.info.secure_url;
          setImageUrl(url);
          formik.setFieldValue("file", imageUrl);
          setFieldTouched ('file', true);
        } 
      }
    );
    widget.open();
  };

  const ImageUpload = () => {
    const handleSubmit = async (values) => {
      // Obtener la URL de la imagen del estado
      const imageUrl = values.file;
      // Hacer algo con la URL, como enviarla a otro servicio o mostrarla en la interfaz
    };
  }

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Row>
        <Col>
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title className="text-center">Agregar Productos</Card.Title>
              <Formik
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // Aquí debes manejar la subida del producto
                  productService.submitProduct(values);
                  setSubmitting(false);
                  resetForm();
                  Swal.fire({
                    title: "Gracias!",
                    text: "Se añadio tu artículo correctamente!",
                    icon: "success",
                  });
                }}
                initialValues={{
                  name: "",
                  stock: "",
                  category: "",
                  price: "",
                  description: "",
                  file: "",
                }}
                validationSchema={schema}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        sm="4"
                        controlId="validationFormik101"
                        className="position-relative"
                      >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Nombre"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        sm="4"
                        controlId="validationFormik102"
                        className="position-relative"
                      >
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                          type="number"
                          name="stock"
                          placeholder="Stock"
                          value={values.stock}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.stock && !!errors.stock}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.stock}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik103"
                        className="position-relative"
                      >
                        <Form.Label>Selecciona tu Categoría</Form.Label>
                        <Form.Select
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.category && !!errors.category}
                        >
                          <option>Categoría</option>
                          <option value="De la huerta a la mesa">
                            De la huerta a la mesa
                          </option>
                          <option value="Elaborados">Elaborados</option>
                          <option value="Artesanía local">
                            Artesanía local
                          </option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.category}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik104"
                        className="position-relative"
                      >
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="price"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.price && !!errors.price}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Descripción de artículo</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Imagen </Form.Label>
                      <Form.Control
                        //type="file
                        value={imageUrl}
                        name="file"
                        onChange={(event) => {
                          // Asegúrate de que el evento esté configurado para actualizar imageUrl
                          const newImageUrl = event.target.value;
                          setFieldValue('file', newImageUrl);
                        }}
                        onBlur={handleBlur}
                        isInvalid={touched.file && !!errors.file}
                      />
                      <Form.Label htmlFor="fileInput">
                        <Button onClick={handleUploadClick}>
                          Select image
                        </Button>
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {errors.file}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting}>
                      Enviar
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormAddProduct;
