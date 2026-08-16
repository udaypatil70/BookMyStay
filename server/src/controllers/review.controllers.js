import Review from "../models/Review.models.js";
import Room from "../models/Room.models.js";
import Hotel from "../models/Hotel.models.js";
import Booking from "../models/bookings.models.js";

const addReview = async (req, res) => {
  try {
    const { roomId, rating, comment } = req.body;

    if (!roomId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Room ID and rating are required",
      });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const room = await Room.findById(roomId).populate("hotel");
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const hasBooking = await Booking.findOne({
      user: req.user._id,
      room: roomId,
      status: { $in: ["confirmed", "completed"] },
    });

    if (!hasBooking) {
      return res.status(403).json({
        success: false,
        message: "You can only review rooms you have booked",
      });
    }

    const existingReview = await Review.findOne({
      user: req.user._id,
      room: roomId,
    });

    if (existingReview) {
      existingReview.rating = ratingNum;
      existingReview.comment = comment || existingReview.comment;
      await existingReview.save();
      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
      });
    }

    await Review.create({
      user: req.user._id,
      room: roomId,
      hotel: room.hotel._id,
      rating: ratingNum,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this room",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoomReviews = async (req, res) => {
  try {
    const { roomId } = req.params;

    const reviews = await Review.find({ room: roomId })
      .populate("user", "username image")
      .sort({ createdAt: -1 })
      .lean();

    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : 0;

    return res.status(200).json({
      success: true,
      reviews,
      totalReviews,
      avgRating: Number(avgRating),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHotelReviews = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const reviews = await Review.find({ hotel: hotelId })
      .populate("user", "username image")
      .sort({ createdAt: -1 })
      .lean();

    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : 0;

    return res.status(200).json({
      success: true,
      reviews,
      totalReviews,
      avgRating: Number(avgRating),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addReview, getRoomReviews, getHotelReviews };
