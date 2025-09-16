import mongoose from "mongoose";
import Review from "../models/reviewmodel.js";

const addReview = async (req, res) => {
    try {
        const { comment, rating, product } = req.body;

        if (!comment || !rating || !product) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        if (!mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const newreview = new Review({
            comment,
            rating,
            author: req.user._id,
            product
        });

        await newreview.save();
        await newreview.populate("author", "username");

        res.status(201).json({ success: true, newreview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const showallreview = async (req, res) => {
    try {
        const allreview = await Review.find({ product: req.params.productId })
            .populate("author", "username")
            .sort({ createdAt: -1 });

        res.json({ success: true, allreview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export { addReview, showallreview };
