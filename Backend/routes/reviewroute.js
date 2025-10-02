import express from 'express'
import { addReview, showallreview, deletereview } from '../controllers/reviewcontroller.js';
import userAuth from '../middlewares/userAuth.js'

const reviewRouter = express.Router();

reviewRouter.post('/',userAuth,addReview);
reviewRouter.delete('/:reviewid',userAuth, deletereview);
reviewRouter.get('/:productId',showallreview);

export default reviewRouter