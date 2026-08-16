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
      .sort({ createdAt: -1 })
      .lean();

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
    }).populate("hotel").lean();

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

// API to update a room (owner only)
const updateRoom = async (req, res) => {
  try {
    const { roomId, roomType, pricePerNight, amenities } = req.body;

    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel || roomData.hotel.toString() !== hotel._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to modify this room" });
    }

    if (roomType) roomData.roomType = roomType;
    if (pricePerNight) roomData.pricePerNight = Number(pricePerNight);
    if (amenities) {
      try {
        roomData.amenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities;
      } catch {
        roomData.amenities = amenities;
      }
    }

    if (req.files && req.files.length > 0) {
      const uploadImages = req.files.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.path);
        return response.secure_url;
      });
      const newImages = await Promise.all(uploadImages);
      roomData.images = [...roomData.images, ...newImages];
    }

    await roomData.save();

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: roomData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete a room (owner only)
const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel || roomData.hotel.toString() !== hotel._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this room" });
    }

    const activeBooking = await Booking.findOne({
      room: roomId,
      status: { $in: ["confirmed", "pending"] },
      checkOutDate: { $gte: new Date() },
    });

    if (activeBooking) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete room with active bookings",
      });
    }

    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to remove a room image (owner only)
const removeRoomImage = async (req, res) => {
  try {
    const { roomId, imageUrl } = req.body;

    if (!roomId || !imageUrl) {
      return res.status(400).json({ success: false, message: "Room ID and image URL are required" });
    }

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel || roomData.hotel.toString() !== hotel._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (roomData.images.length <= 1) {
      return res.status(400).json({ success: false, message: "Room must have at least one image" });
    }

    roomData.images = roomData.images.filter((img) => img !== imageUrl);
    await roomData.save();

    return res.status(200).json({
      success: true,
      message: "Image removed successfully",
      room: roomData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createRoom, getRooms, getOwnerRooms, toggleRoomAvailability, updateRoom, deleteRoom, removeRoomImage };
