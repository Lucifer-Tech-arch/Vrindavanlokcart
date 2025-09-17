import express from 'express';
import {placeOrder, placeOrderStrip, allorders, updateStatus, Userorderdata, veriyStripe} from '../controllers/ordercontroller.js'
import adminauth from '../middlewares/Adminauth.js';
import authUser from '../middlewares/userAuth.js';

const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminauth, allorders);
orderRouter.post('/status',adminauth, updateStatus);

//payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStrip)

//User Features
orderRouter.post('/userorders',authUser, Userorderdata)

//Verify payment 
orderRouter.post('/verifystripe',authUser, veriyStripe)

export default orderRouter
