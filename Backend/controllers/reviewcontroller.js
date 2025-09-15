import Review from "../models/reviewmodel.js";

const addReview = async(req,res) => {
    try {
        const {comment, rating, product} = req.body;
        if(!comment || !rating) {
            return res.json({success: false, message: "All fields are required!"})
        }
        console.log(req.body);
        console.log(req.user);
        const newreview =  new Review({comment, rating, author: req.user._id, product});
        await newreview.save();
        res.json({success: true, newreview})
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error.message});
    } 
}

const showallreview = async(req,res) => {
    try {
        const allreview = await Review.find({product: req.params.productId}).populate("author", "name").sort({createdAt: -1});
        res.json({success: true, allreview});
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error.message});
    }
}

export {addReview, showallreview};