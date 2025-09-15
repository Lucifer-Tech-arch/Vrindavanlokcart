import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Reviews = ({ productId }) => {
  const { token, backendurl } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch existing reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/review/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data.allreview || []);
      setComment("");
      setRating(0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to submit review", { autoClose: 2000 });
      return;
    }
    if (!rating || !comment.trim()) {
      toast.error("Please add both rating and comment", { autoClose: 2000 });
      return;
    }

    try {
      await axios.post(
        `${backendurl}/api/review`,
        { rating, comment, product: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review added successfully!", { autoClose: 2000 });
      fetchReviews(); // Refresh reviews list after submitting
    } catch (err) {
      console.error(err);
      toast.error("Failed to add review", { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className="mt-6 p-5 rounded-xl border border-gray-200 shadow-sm w-full sm:w-4/5">
        {/* Review Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 cursor-pointer transition-transform hover:scale-110"
                fill={(hover || rating) >= star ? "#facc15" : "none"}
                viewBox="0 0 24 24"
                stroke="#facc15"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.5l2.25 4.56 5.02.73-3.64 3.55.86 5-4.49-2.36-4.49 2.36.86-5-3.64-3.55 5.02-.73 2.25-4.56z"
                />
              </svg>
            ))}
          </div>

          <textarea
            className="border border-gray-300 rounded-lg p-3 text-sm w-full"
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            className="self-start px-6 py-2 cursor-pointer text-white rounded-lg text-sm font-medium bg-[#c2410c]"
          >
            Add Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-2xl font-medium ml-2 mb-3 mt-4 text-[#c2410c]">
          All Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet..</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-medium text-sm text-gray-800">
                    {rev.user?.name || rev.user || "Anonymous"}
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        fill={star <= rev.rating ? "#facc15" : "none"}
                        viewBox="0 0 24 24"
                        stroke="#facc15"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.5l2.25 4.56 5.02.73-3.64 3.55.86 5-4.49-2.36-4.49 2.36.86-5-3.64-3.55 5.02-.73 2.25-4.56z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{rev.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
