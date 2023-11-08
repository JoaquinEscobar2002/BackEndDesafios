import { Router } from "express";
import Carts from '../dao/dbManagers/carts.managers.js';

const router = Router();
const cartManager = new Carts();

//POST crea un carro vacío
router.post('/', async (req, res) => {
    try {
        const Cart = await cartManager.addCart();
        res.status(201).send({ status: 'success', payload: Cart });
    } catch (error) {
        res.status(500).send({ status: 'error', payload: error.message });
    }
});

//GET obtiene todos los productos del carro segun id
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid).populate('products.product').exec();

        if (cart) {
            res.status(200).send({ status: 'success', payload: cart.products });
        } else {
            res.status(404).send({ status: 'error', payload: 'El carro no existe o no fue encontrado' });
        }
    } catch (error) {
        res.status(500).send({ status: 'error', payload: error.message });
    }
});

//Agrega al carro de a un producto
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;

        // Obtiene el carrito actual
        const cart = await cartManager.getCartById(idCart);
        if (!cart) {
            return res.status(404).send({ error: "El carro no existe" });
        }

        // Busca el índice del producto en el carrito
        const productIndex = cart.products.findIndex(p => p.product.toString() === idProd);

        // Si no se encuentra el producto, lo añade al carrito
        if (productIndex === -1) {
            cart.products.push({ product: idProd, quantity: 1 });
        } else {
            // Si el producto ya está en el carrito, incrementa la cantidad
            cart.products[productIndex].quantity++;
        }

        // Actualiza el carrito con los nuevos productos
        const updatedCart = await cartManager.updateCart(idCart, cart.products);

        res.status(200).send({ status: 'success', payload: updatedCart });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

//Elimina del carro el producto segun el id
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;

        const result = await cartManager.deleteProduct(idCart, idProd);

        res.status(200).send({ status: 'success', payload: result });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

////
// Actualiza la cantidad de ejemplares directamente en la base de datos
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const newQuantity = req.body.quantity;

        const result = await cartManager.updateCart(idCart, {
            'products.product': idProduct
        }, {
            $set: {
                'products.$.quantity': newQuantity
            }
        });

        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

//Elimina todos los productos del carrito seleccionado
router.delete('/:cid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const result = await cartManager.updateCart(idCart, { products: [] });
        res.status(200).send({ status: 'success', payload: result });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;