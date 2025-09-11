import Order from "../models/ordermodel.js";
import User from "../models/usermodel.js";

//placing orders using COD
const placeOrder = async(req,res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const neworder = new Order(orderData);
        await neworder.save();
        await User.findByIdAndUpdate(userId, {cartdata: {}});

        res.json({success: true, message: "Order Placed"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//placing orders using Stripe Api
const placeOrderStrip = async(req,res) => {

}

//placing orders using Razor pay
const placeorderRazorpay = async(req,res) => {

}

//All orders data for Admin Pannel
const allorders = async(req,res) => {
    try {
        const orders = await Order.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//User Order Data for frontend
const Userorderdata = async(req,res) => {
    try {
        const {userId} = req.body;
        const orders = await Order.find({userId})
        res.json({success: true, orders})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//update order status from admin pannel
const updateStatus = async(req,res) => {

}

export {placeOrder, placeOrderStrip, placeorderRazorpay, allorders, updateStatus, Userorderdata}