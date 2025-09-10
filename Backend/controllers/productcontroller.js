import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/productmodel.js'

//function to add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, categories, material, size, bestseller } = req.body;
        const image1 = req.files?.image1?.[0] || null;
        const image2 = req.files?.image2?.[0] || null;
        const image3 = req.files?.image3?.[0] || null;
        const image4 = req.files?.image4?.[0] || null;

        const images = [image1,image2,image3,image4].filter((item) => item != undefined);

        let imageurl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            image: imageurl,
            categories,
            material,
            size,
            bestseller: bestseller === "true" ? "true" : "false",
            date: Date.now()
        }

        console.log(productData);
        const product = new Product(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error);
    }
}

//function to list product
const listProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success: true, products})
    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(error)
    }
}

//function to remove product
const removeProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product Removed"});

    } catch (error) {
        res.json({success: false, message: error.message})
        console.log(error);
    }
}

//function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const {productId} = req.body;
        const product = await Product.findById(productId);
        res.json({success: true, product});

    } catch (error) {
        res.json({success: false, message: error.message});
        console.log(error);
    }
}

export { addProduct, listProduct, removeProduct, singleProduct } 