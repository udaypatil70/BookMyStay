import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    address: {
      type: String,
      required: true,
      maxlength: 300,
    },
    contact: {
      type: String,
      required: true,
      maxlength: 20,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

hotelSchema.index({ city: 1 });
hotelSchema.index({ owner: 1 }, { unique: true });

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
