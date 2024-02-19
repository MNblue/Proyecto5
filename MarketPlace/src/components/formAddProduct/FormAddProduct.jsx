import Card from "react-bootstrap/Card";
import "./formAddProduct.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";

function FormAddProduct() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required("El nombre es requerido"),
    lastName: yup.string().required("El apellido es requerido"),
    category: yup.string().required("La categoría es requerida"),
    price: yup.string().required("El precio es requerido"),
    description: yup.string().required("La descripción es requerida"),
    file: yup.mixed().required("La imagen es requerida"),
  });

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Row>
        <Col>
          <Card style={{ width: "30rem"}}>
            <Card.Body>
              <Card.Title className="text-center">Agregar Productos</Card.Title>
              <Formik
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  // Aquí debes manejar la subida del producto
                  console.log(values);
                  setSubmitting(false);
                }}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  category: "",
                  price: "",
                  description: "",
                  file: null,
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormik101"
                      className="position-relative"
                    >
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstName && !!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* ... */}
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormik102"
                      className="position-relative"
                    >
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationFormik103"
                      className="position-relative"
                    >
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.category && !!errors.category}
                      >
                        <option>Selecciona tu categoría</option>
                        <option value="De la huerta a la mesa">
                          De la huerta a la mesa
                        </option>
                        <option value="Elaborados">Elaborados</option>
                        <option value="Artesanía local">Artesanía local</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormik104"
                      className="position-relative">
                    
                      <Form.Label>Precio</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="price"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.price && !!errors.price}/>
  
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1">
                    
                      <Form.Label>Descripción de artículo</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}/>
                      
                      <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Imagen </Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.file && !!errors.file}/>
                      
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
