class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        
        const productoId = this.products.find(
            n => n.id === id            
        )

        if(productoId){
            return productoId
        } else{
            return console.log("Not found, el id no fue encontrado")
        }
    }

    addProduct = (title, description, price, thumbnail, stock, code, id ) =>{

        const producto = {
            id, code, title, description, price, thumbnail,  stock
        }

        if(!title || !description || !price ||  !thumbnail || (!stock && !stock === 0)){
            
            return console.log("Faltan campos");
        } else{
            if(this.products.length === 0) {
                producto.id = 1;
                producto.code = "product-" + producto.id
            } else {
                producto.id = this.products[this.products.length - 1].id + 1;
                producto.code = "product-" + producto.id
            }
    
            this.products.push(producto);
        }

    }
}

const IniciarClase = new ProductManager();



IniciarClase.addProduct("Plancha","La Plancha", 400, "img", 10)
IniciarClase.addProduct("pala","La pala", 500, "img", 10)

//Array completo
console.log(IniciarClase.getProducts())
//Id existente
console.log(IniciarClase.getProductById(2))
//Id no existente
console.log(IniciarClase.getProductById(4))

