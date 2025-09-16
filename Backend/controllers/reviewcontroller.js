import Review from "../models/reviewmodel.js";

const addReview = async(req,res) => {
    try {
        const {comment, rating, product} = req.body;
        console.log(req.body)
        console.log(req.user);
        if(!comment || !rating) {
            return res.json({success: false, message: "All fields are required!"})
        }
        const newreview =  new Review({comment, rating, author: req.user._id, product});
        console.log("before saved")
        await newreview.save();
        console.log("new review saved");
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
        console.log("All review is listed");
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error.message});
    }
}

export {addReview, showallreview};