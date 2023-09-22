import express from 'express'
import ProductManager from './manager/ProductManager.js'

const manager = new ProductManager('./src/files/productos.json');


//Crando el servidor http usando express
const app = express();


//Traer todos los productos
app.get('/products', async (req,res) => {
    res.send(await manager.getProducts())
})

//Traer por id
app.get('/products/:pid', async (req,res) => {
    res.send(await manager.getProductById(req.params.pid))
})

//Levantar el servidor en un puerto
app.listen(8080, () => console.log('Listening on port 8080')); 