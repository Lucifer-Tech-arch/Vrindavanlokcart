import express from 'express'
import {loginUser, registerUser, adminLogin, sendotp, verifyotp, resetPassword} from '../controllers/usercontroller.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/adminlogin',adminLogin);
userRouter.post('/sendotp',sendotp);
userRouter.post('/verifyotp',verifyotp);
userRouter.post('/resetpassword', resetPassword)

export default userRouter