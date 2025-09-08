import mongoose from "mongoose";
import {reviewSchema} from './reviewmodel.js'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    categories: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    bestseller : {
        type: Boolean,
    },
    date: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema]

})

const Product = mongoose.model("Product",productSchema);

export default Product