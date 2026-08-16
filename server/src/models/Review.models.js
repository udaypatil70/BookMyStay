import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

reviewSchema.index({ room: 1, user: 1 }, { unique: true });
reviewSchema.index({ hotel: 1, createdAt: -1 });
reviewSchema.index({ room: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
