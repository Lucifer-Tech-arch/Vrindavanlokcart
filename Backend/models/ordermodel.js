import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    Status: {
        type: String,
        required: true,
        default: 'Order-Placed'
    },
    paymentmethod: {
        type: String,
        required: true,
        default: "cod"
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model("Order",orderschema);

export default Order