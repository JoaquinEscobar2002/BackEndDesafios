import fs from 'fs'

export default class ProductManager {

    constructor(path) {
        this.path = path;
    }

    //Traemos los archivos de Productos.js
    getProducts = async () => {
        try {
            if(fs.existsSync(this.path)){
                //Si existe entonces voy a leer el contenido
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = await JSON.parse(data).filter((p) => p.isDelete !== "true");
                return products;
            } else {
                //Si no existe entonces devuelve un arreglo vacio, empezamos de cero
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductsTotal = async () => {
        try {
            if(fs.existsSync(this.path)){
                //Si existe entonces voy a leer el contenido
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                //Si no existe entonces devuelve un arreglo vacio, empezamos de cero
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            //Obtener TODOS los productos
            const products = await this.getProducts()
            //Buscamos segun id
            const productoId = products.find((p) => p.id === parseInt(id))
            if(productoId){
                return productoId
            } else{
                return "Not found, el id no fue encontrado"
            }
        } catch (error) {
            console.log(error);
        } 
    }

    //Añadir producto
    addProduct = async (title, description, price, thumbnail, stock, category, code, id, status = true, isDelete = "false" ) =>{
        try {
            const producto = {
                id, code, title, description, price, thumbnail, stock, category, status, isDelete
            }
            //Obtener TODOS los productos
            const products = await this.getProductsTotal()
            if(!title || !description || !price ||  !thumbnail || !category || (!stock && !stock === 0)){
                return console.log("Faltan campos");
            } else{
                if(products.length === 0) {
                    producto.id = 1;
                    producto.code = "product-" + producto.id
                } else {
                    producto.id = products[products.length - 1].id + 1;
                    producto.code = "product-" + producto.id
                }
                //Insertamos el elemento
                products.push(producto);
                //Escribimos el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return producto;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Actualizar producto
    updateProduct = async (id, updateData) => {

        try {
            const products = await this.getProductsTotal()
            const product = await this.getProductById(id)
            if(!product){
                return console.log("el producto no existe")
            } else{
                if(!updateData.id){

                    const update = {...product, ...updateData}

                    products[product.id - 1] = update;

                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

                } else {
                    console.log("id no es un campo actualizable")
                }
            }
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }


    deleteProduct = async (id) => {
        try {
            await this.updateProduct(id, {isDelete: "true"})
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    unDeleteProduct = async (id) => {
        try {
            await this.updateProduct(id, {isDelete: "false"})
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}