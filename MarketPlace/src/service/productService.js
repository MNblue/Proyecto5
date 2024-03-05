import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const productService = {

    async getAllProducts() {

        let response = await apiClient.get("/products");

        let allProducts = response.data

        return allProducts;
    },

    async submitProduct(product) {

        let updatedResponse = await apiClient.post("/products", product);
        return updatedResponse;

    },

    async deleteProduct(index) {

        try {
            const url = `/products/${index}`;
            console.log('URL de la solicitud de eliminación:', url);

            let respuesta = await apiClient.delete(url);
            console.log('Producto eliminado:', respuesta);

            return respuesta;
        } catch (error) {
            console.error('Error al eliminar el producto:', error.response ? error.response.data : error.message);

            return null;
        }
    },



    async updateProduct(product, index) {

        let updatedResponse = await apiClient.patch(`/products/${product.id}`, product);
        return updatedResponse;
    },

}