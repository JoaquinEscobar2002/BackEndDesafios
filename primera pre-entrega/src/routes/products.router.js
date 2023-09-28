import ProductManager from '../manager/ProductManager.js';
import {Router} from 'express';

const manager = new ProductManager('../src/files/productos.json');
const router = Router();

//Traer todos los productos con query de limit
router.get('/', async (req,res) => {
    const products = await manager.getProducts();
    const queryParamsLimit = parseInt(req.query.limit);
    if(queryParamsLimit){
        let result = products.slice(0, queryParamsLimit);
        res.send(result);
    }else{
        res.send(products);
    }
});

//Traer por id
router.get('/:pid', async (req,res) => {
    res.send(await manager.getProductById(req.params.pid));
});

//Agregar producto
router.post('/', async (req, res) => {
    const product = req.body; //Obtenerel json con los datos del producto
    await manager.addProduct(product.title, product.description, product.price, product.thumbnail, product.stock);
    res.send({status:'success', payload: product });
});

//Actualizar producto
router.put('/:pid', async (req, res) => {
    const product = req.body;
    const id = parseInt(req.params.pid);
    await manager.updateProduct(id, product);
    res.send({status:'success', payload: {...product, id}});
});

//Borrar producto
router.delete('/:pid', async (req, res) =>{
    
    const id = parseInt(req.params.pid);
    const product = await manager.getProductById(id)
    await manager.deleteProduct(id)
    res.send({status:'success', payload: `Se elimino el producto: ${product.title} id:${product.id}` });
})

export default router;