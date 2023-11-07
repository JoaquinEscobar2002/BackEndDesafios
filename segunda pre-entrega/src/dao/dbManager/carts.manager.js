import { CartsModel } from './models/carts.models.js';

export default class Carts {
    constructor() {
        console.log('Carts database operations are ready.');
    }

    //Traer carros
    async getCarts() {
        const result = await CartsModel.find().lean();
        return result;
    }

    //Agregar al carro
    async addCart() {
        const result = await CartsModel.create({});
        return result;
    }

    //Traer carro por id
    getCartById(id) {
        return CartsModel.findById(id);
    }

    //Borrar producto
    async deleteProduct(cid, pid) {
        const result = await CartsModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
        return result;
    }

    //Encuentra el carrito y actualízalo con el nuevo arreglo de productos
    async updateCartWithProducts(cartId, update) {
        //
        const updatedCart = await CartsModel.findByIdAndUpdate(
            cartId,
            { $set: { products: update } },
            //{ new: true, runValidators: true }
        );

        return updatedCart;
    }

    //Actualizar carro
    async updateCart(id, update) {
        // Esta operación encuentra un carrito por ID y actualiza sus productos.
        const updatedCart = await CartsModel.findOneAndUpdate(
            { _id: id },
            { $set: { products: update } },
            //{ new: true, runValidators: true }
        );

        /* if (!updatedCart) {
            throw new Error("The cart was not found or no update was made.");
        } */

        return updatedCart;
    }

    //Borrar carro (borrado fisico)
    async deleteCart(id) {
        const cart = await CartsModel.findById(id);
        if (!cart) {
            throw new Error("The cart you are trying to delete does not exist.");
        }
        const result = await CartsModel.deleteOne({ _id: id });
        return result;
    }
}