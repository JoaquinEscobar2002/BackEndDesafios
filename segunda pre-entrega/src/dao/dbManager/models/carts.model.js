import mongoose from 'mongoose';

const cartsCollection = 'carts';


const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: []
    },
    is_delete: {
        default: false
    }
});

export const CartsModel = mongoose.model(cartsCollection, cartsSchema);