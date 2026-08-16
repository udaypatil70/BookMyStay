import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Pay At Hotel", "Card", "UPI"],
      default: "Pay At Hotel",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ hotel: 1, status: 1 });
bookingSchema.index({ room: 1, status: 1, checkInDate: 1, checkOutDate: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
