import React, { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, postReview } from "../../store/slices/productSlice";

const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { isReviewDeleting, isPostingReview } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const reviewData = { rating, comment };

    // Action dispatch - Object
    const result = await dispatch(
      postReview({ productId: product.id, review: reviewData }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      setComment("");
      setRating(5);
    }
  };

  return (
    <div className="mt-12">
      {/* Overall Product Average Rating */}
      <div className="flex items-center space-x-6 mb-10 p-6 glass-card w-fit">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            {product.ratings || 0}
          </h2>
          <p className="text-sm text-white/40 mt-1">Average Rating</p>
        </div>
        <div className="h-12 w-px bg-white/10" />
        <div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.ratings) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
              />
            ))}
          </div>
          <p className="text-sm text-white/60">
            {productReviews?.length || 0} Customer Reviews
          </p>
        </div>
      </div>

      {/* Review Form*/}
      {authUser && (
        <form
          onSubmit={handleReviewSubmit}
          className="mb-10 p-6 glass-card border border-primary/20 space-y-4"
        >
          <h4 className="text-lg font-semibold text-white">
            Share your thoughts
          </h4>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className={`text-3xl transition-all duration-200 ${i < rating ? "text-yellow-400 scale-110" : "text-gray-600 hover:text-gray-400"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="What did you like or dislike?"
            className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={isPostingReview || !comment.trim()}
            className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:glow-on-hover transition-all disabled:opacity-50"
          >
            {isPostingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Customer Review List */}
      <h3 className="text-2xl font-bold text-white mb-6">Verified Reviews</h3>

      {productReviews && productReviews.length > 0 ? (
        <div className="space-y-4">
          {productReviews.map((review) => (
            <div
              key={review.review_id}
              className="glass-card p-6 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.reviewer?.avatar?.url || "/avatar-holder.avif"}
                    alt={review?.reviewer?.name}
                    className="w-12 h-12 rounded-full border border-primary/30 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white">
                      {review?.reviewer?.name}
                    </h4>
                    <div className="flex mt-1">
                      {/* User Rating */}
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-700"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {authUser?.id === review.reviewer?.id && (
                  <button
                    onClick={() =>
                      dispatch(
                        deleteReview({
                          productId: product.id,
                          reviewId: review.review_id,
                        }),
                      )
                    }
                    disabled={isReviewDeleting}
                    className="p-2 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    {isReviewDeleting ? (
                      <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
              <p className="mt-4 text-white/70 italic font-light leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/30 italic">No reviews yet for this product.</p>
      )}
    </div>
  );
};

export default ReviewsContainer;
