import fs from 'fs'

export default class CartManager {

    constructor(path) {
        this.path = path;
    }

    //Traemos los archivos de carts.json
    getCarts = async () => {
        try {
            if(fs.existsSync(this.path)){
                //Si existe entonces voy a leer el contenido
                const data = await fs.promises.readFile(this.path,'utf-8');
                const carts = await JSON.parse(data).filter((p) => p.isDelete !== "true");
                return carts;
            } else {
                //Si no existe entonces devuelve un arreglo vacio, empezamos de cero
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getCartsTotal = async () => {
        try {
            if(fs.existsSync(this.path)){
                //Si existe entonces voy a leer el contenido
                const data = await fs.promises.readFile(this.path,'utf-8');
                const carts = JSON.parse(data);
                return carts;
            } else {
                //Si no existe entonces devuelve un arreglo vacio, empezamos de cero
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Buscar la card por el id
    getCartById = async (id) => {
        
        try {
            //Obtener TODOS los productos no eliminados
            const carts = await this.getCarts()
            //Buscamos segun id
            const cartId = carts.find((p) => p.id === parseInt(id))
            //Validamos si se encontro resultado
            if(cartId){
                return cartId
            } else{
                return "Not found, el id no fue encontrado"
            }
        } catch (error) {
            console.log(error);
        }
    }


    //Añadir carrito
    addCart = async (products, id, isDelete = "false" ) =>{
        try {
            const carrito = {
                id, products, isDelete
            }
            //Obtener TODOS los carros
            const carts = await this.getCartsTotal()
            if(products.length < 1){
                return console.log("El carro esta vacio");
            } else{
                if(carts.length === 0) {
                    carrito.id = 1;
                } else {
                    carrito.id = carts[carts.length - 1].id + 1;
                }
                //Insertamos el elemento
                carts.push(carrito);
                //Escribimos el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                return carrito;
            }
        } catch (error) {
            console.log(error);
        }
    }     
    
    //Actualizar producto
    updateCartProduct = async (idCart, product) => {

        const carts = await this.getCartsTotal()
        const cart = await this.getCartById(idCart)

        const productIndex = cart.products.findIndex((p) => p.idp === product.id)
        if(productIndex === -1){
            const update = {idp : product.id, qty : 1}

            cart.products.push(update);

            carts[cart.id - 1] = cart     
            
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

        } else {

            cart.products[productIndex].qty++

            carts[cart.id - 1] = cart

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        }
        


        
        
        
    }


}