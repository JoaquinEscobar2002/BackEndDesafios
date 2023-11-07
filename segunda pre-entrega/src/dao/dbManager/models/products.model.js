import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    status: {
        default: true
    },
    is_delete:{
        default: false
    }
});

export const ProductsModel = mongoose.model(productsCollection, productsSchema);