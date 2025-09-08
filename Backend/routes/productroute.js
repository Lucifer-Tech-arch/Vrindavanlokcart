import express from 'express'
import {addProduct, listProduct, removeProduct, singleProduct} from '../controllers/productcontroller.js'
import upload from '../middlewares/multer.js'
import adminauth from '../middlewares/Adminauth.js';

const productRouter = express.Router();

productRouter.post('/add',adminauth,upload.fields([{name: 'image1',maxCount:1},{name: 'image2',maxCount:1},{name: 'image3',maxCount:1},{name: 'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminauth,removeProduct);
productRouter.post('/single',adminauth,singleProduct)
productRouter.get('/list',adminauth,listProduct);

export default productRouter