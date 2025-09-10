import express from 'express';
import {placeOrder, placeOrderStrip, placeorderRazorpay, allorders, updateStatus, Userorderdata} from '../controllers/ordercontroller.js'
import adminauth from '../middlewares/Adminauth.js';
import authUser from '../middlewares/userAuth.js';

const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminauth, allorders);
orderRouter.post('/status',adminauth, updateStatus);

//payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/',authUser)
