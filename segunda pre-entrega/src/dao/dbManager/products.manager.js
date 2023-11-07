import { ProductsModel } from './models/products.models.js';

export default class Products {
    constructor() {
        console.log('Products database operations are ready.');
    }

    //Traer productos
    async getProducts() {
        const products = await ProductsModel.find();
        return products;
    }

    //Agregar producto
    async addProduct(product) {
        const result = await ProductsModel.create(product);
        return result;
    }

    //Traer producto por el id
    async getProductById(id) {
        const result = await ProductsModel.findById(id);
        return result;
    }

    //Actualizar producto
    async updateProduct(id, update) {
        const result = await ProductsModel.updateOne({ _id: id }, update);
        return result;
    }

    //Borrar producto
    async deleteProduct(id) {
        const result = await ProductsModel.deleteOne({ _id: id });
        return result;
    }
}