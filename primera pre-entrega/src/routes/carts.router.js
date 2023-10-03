import {Router} from 'express';
import CartManager from '../manager/CartManager.js';
import ProductManager from '../manager/ProductManager.js';

const manager = new CartManager('../src/files/carts.json');
const managerProduct = new ProductManager('../src/files/productos.json');
const router = Router();


//Agregar producto
router.post('/', async (req, res) => {
    const cart = req.body; //Obtenerel json con los datos del carrito
    await manager.addCart(cart);
    res.send({status:'success', payload: cart });
});

//Traer por id
router.get('/:cid', async (req, res) => {
    res.send(await manager.getCartById(req.params.cid));
})

router.post('/:cid/products/:pid', async (req, res) => {

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
    
    
    
})

export default router;