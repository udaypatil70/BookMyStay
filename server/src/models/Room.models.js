import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"],
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: {
      type: [String],
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.index({ hotel: 1 });
roomSchema.index({ isAvailable: 1, pricePerNight: 1 });
roomSchema.index({ isAvailable: 1, roomType: 1 });

const Room = mongoose.model("Room", roomSchema);

export default Room;
