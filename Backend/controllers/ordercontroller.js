import Order from "../models/ordermodel.js";
import User from "../models/usermodel.js";
import Stripe from 'stripe'

//globals
const currency = 'inr'
const deliverycharges = 10

//Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET);

//placing orders using COD
const placeOrder = async(req,res) => {
    try {
        const {items, amount, address} = req.body;
        const userId = req.user._id;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentmethod: "COD",
            payment: false,
            date: Date.now()
        }

        const neworder = new Order(orderData);
        console.log(neworder);
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
    try {
        const {items, amount, address} = req.body
        const {origin} = req.headers;
        const userId = req.user._id;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentmethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        
        const neworder = new Order(orderData);
        console.log(neworder);
        await neworder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliverycharges*100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
            line_items,
            mode: 'payment'
        })
        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const veriyStripe = async(req,res) => {
    const {orderId, success, userId} = req.body;
    try {
        if(success === 'true') {
            await Order.findByIdAndUpdate(orderId, {payment: true, paymentmethod: "Stripe"});
            await User.findByIdAndUpdate(userId, {cartdata: {}});
            res.json({success: true});
        }
        else{
            await Order.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
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
        const userId = req.user._id;
        const orders = await Order.find({userId})
        res.json({success: true, orders})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//update order status from admin pannel
const updateStatus = async(req,res) => {
    try {
        const {orderId, Status} = req.body;
        await Order.findByIdAndUpdate(orderId, {Status})
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {placeOrder,veriyStripe, placeOrderStrip, allorders, updateStatus, Userorderdata}