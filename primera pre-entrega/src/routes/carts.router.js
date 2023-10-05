import {Router} from 'express';
import CartManager from '../manager/CartManager.js';
import ProductManager from '../manager/ProductManager.js';
import { __dirname } from "../utils.js";
import path from 'node:path';

const CartsFilePath = path.join(__dirname, "./files/carts.json");
const manager = new CartManager(CartsFilePath);

const productsFilePath = path.join(__dirname, "./files/products.json");
const managerProduct = new ProductManager(productsFilePath);

const router = Router();

//Agregar producto
router.post('/', async (req, res) => {
    try {
        const cart = req.body; //Obtener el json con los datos del carrito
        await manager.addCart(cart);
        res.send({status:'success', payload: cart });
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

//Traer por id
router.get('/:cid', async (req, res) => {
    try {
        res.send(await manager.getCartById(req.params.cid));
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await manager.getCartById(req.params.cid)
        const product = await managerProduct.getProductById(req.params.pid)
        if(cart.id != req.params.cid){
            res.send({status:'not success', payload:"el carro no existe con este id" })
        } else {
            if(!product.id){
                res.send({status:'not success', payload:"el producto no existe" })            
            } else {
                await manager.updateCartProduct(req.params.cid,product)
                const cart = await manager.getCartById(req.params.cid)
                res.send({status:'success', payload: cart})
            }
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }    
})

export default router;