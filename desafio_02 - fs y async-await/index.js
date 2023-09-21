const { ProductManager } = require("./manager/ProductManager");

const manager = new ProductManager('./files/Productos.json');

const env = async () => {

    /* //Traer productos
    const products = await manager.getProducts();
    console.log(products)

    //Añadir producto
    await manager.addProduct("Plancha","La Plancha", 400, "img", 10);

    //Traer productos nuevamente
    const productsDos = await manager.getProducts();
    console.log(productsDos) */

    /* //Buscar Id existente
    console.log(await manager.getProductById(4))
    //Buscar Id no existente
    console.log(await manager.getProductById(40)) */


    /* await manager.updateProduct(10,{title: "guitarra", stock: 200})
    console.log(await manager.getProductById(10)) */

    /* //Marcar un producto como eliminado
    await manager.deleteProduct(9) */
}

env();