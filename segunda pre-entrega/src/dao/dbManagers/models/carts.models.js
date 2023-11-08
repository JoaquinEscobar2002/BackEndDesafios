import mongoose from 'mongoose';

const cartsCollection = 'carts';


const cartsSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: []
    },
    is_delete: {
        type: Boolean,
        default: false
    }
});

export const CartsModel = mongoose.model(cartsCollection, cartsSchema);