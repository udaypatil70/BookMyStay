import Hotel from "../models/Hotel.models.js";
import Room from "../models/Room.models.js";
import Booking from "../models/bookings.models.js";
import { v2 as cloudinary } from "cloudinary";

// API to create a new room for a hotel
const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({
      owner: req.user._id,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "No hotel found",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: JSON.parse(amenities),
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms (with optional date filtering)
const getRooms = async (req, res) => {
  try {
    const { checkInDate, checkOutDate } = req.query;

    // Base query: only available rooms
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    // If dates are provided, filter out rooms that are booked for those dates
    if (checkInDate && checkOutDate) {
      const bookedRoomIds = await Booking.distinct("room", {
        status: { $ne: "cancelled" },
        checkInDate: { $lte: new Date(checkOutDate) },
        checkOutDate: { $gte: new Date(checkInDate) },
      });

      const availableRooms = rooms.filter(
        (room) => !bookedRoomIds.some((id) => id.toString() === room._id.toString()),
      );

      return res.status(200).json({
        success: true,
        rooms: availableRooms,
      });
    }

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms for a specific hotel
const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({
      owner: req.user._id,
    });

    if (!hotelData) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const rooms = await Room.find({
      hotel: hotelData._id,
    }).populate("hotel");

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to toggle availability of room
const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await Room.findById(roomId);

    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Verify the room belongs to the owner's hotel
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel || roomData.hotel.toString() !== hotel._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to modify this room",
      });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    return res.status(200).json({
      success: true,
      message: "Room availability updated successfully",
      isAvailable: roomData.isAvailable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createRoom, getRooms, getOwnerRooms, toggleRoomAvailability };
