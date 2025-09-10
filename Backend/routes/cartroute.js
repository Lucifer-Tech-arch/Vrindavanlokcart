import express from 'express';
import {addtocart, updatecart, getusercart} from '../controllers/cartcontroller.js'
import authUser from '../middlewares/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/get',authUser, getusercart);
cartRouter.post('/add',authUser,addtocart);
cartRouter.post('/update',authUser,updatecart);

export default cartRouter