import {Router} from 'express';
import CartManager from '../manager/CartManager.js';

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

    
})

/* const env = async () => {
    const products = await manager.getCartsTotal()
    console.log(products)

    const p = []

    await manager.addCart(p)

    const products2 = await manager.getCartsTotal()
    console.log(products2)

    const cartid = await manager.getCartById(15)
    console.log(cartid)
} 

env()*/

export default router;