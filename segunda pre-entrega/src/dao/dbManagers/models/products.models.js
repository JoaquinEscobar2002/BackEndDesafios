import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
        type: Boolean,
        default: true
    },
    is_delete:{
        type: Boolean,
        default: false
    }
});

productsSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model(productsCollection, productsSchema);