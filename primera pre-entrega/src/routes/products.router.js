import ProductManager from '../manager/ProductManager.js';
import {Router} from 'express';
import { __dirname } from "../utils.js";
import path from 'node:path';

const productsFilePath = path.join(__dirname, "./files/products.json");
const manager = new ProductManager(productsFilePath);

const router = Router();

//Traer todos los productos con query de limit
router.get('/', async (req,res) => {
    try {
        const products = await manager.getProducts();
        const queryParamsLimit = parseInt(req.query.limit);
        if(queryParamsLimit){
            let result = products.slice(0, queryParamsLimit);
            res.send(result);
        }else{
            res.send(products);
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }    
});

//Traer por id
router.get('/:pid', async (req,res) => {
    try {
        res.send(await manager.getProductById(req.params.pid));
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

//Agregar producto
router.post('/', async (req, res) => {
    try {
        const {title, description, price, thumbnail, stock, category} = req.body; //Obtenerel json con los datos del producto
        if(!title || !description || !price ||  !thumbnail || !category || (!stock && !stock === 0)){
            res.send({status:'not succes 400', payload: "faltan datos" })
        } else {
            const product = await manager.addProduct(title, description, price, thumbnail, stock, category);
            res.send({status:'success', payload: product });
        }
        
        
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

//Actualizar producto
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const prod = await manager.getProductById(id)
        if(prod.id != id){
            res.send({status:'not succes 400', payload: "id no fue encontrado" })
        } else {
            const product = req.body;
            await manager.updateProduct(id, product);
            res.send({status:'success', payload: {...product, id}});
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

//Borrar producto
router.delete('/:pid', async (req, res) =>{
    try {
        const id = parseInt(req.params.pid);
        const product = await manager.getProductById(id)
        if(product.id != id){
            res.send({status:'not succes 400', payload: "id no fue encontrado" })
        } else {
            await manager.deleteProduct(id)
            res.send({status:'success', payload: `Se elimino el producto: ${product.title} id:${product.id}` });
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }    
})

export default router;