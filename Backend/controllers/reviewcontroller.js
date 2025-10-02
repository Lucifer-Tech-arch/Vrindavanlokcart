import mongoose from "mongoose";
import Review from "../models/reviewmodel.js";

// ------------------- Add Review -------------------
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

// ------------------- Show All Reviews -------------------
const showallreview = async (req, res) => {
  try {
    const allreview = await Review.find({ product: req.params.productId })
      .populate("author", "username _id")
      .sort({ createdAt: -1 });

    const userId = req.user ? req.user._id.toString() : null;

    const mapped = allreview.map((rev) => ({
      ...rev.toObject(),
      canDelete: userId && rev.author?._id.toString() === userId
    }));

    res.json({ success: true, allreview: mapped });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// ------------------- Delete Review -------------------
const deletereview = async (req, res) => {
    try {
        const reviewid = req.params.id;
        const review = await Review.findById(reviewid);

        if (!review) {
            return res.status(404).json({ success: false, message: "Review doesn't exist!" });
        }

        if (review.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "You are not the author of this review!" });
        }

        await Review.findByIdAndDelete(reviewid);
        res.status(200).json({ success: true, message: "Review deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addReview, showallreview, deletereview };
