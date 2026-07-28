import Booking from "../models/booking.model.js";
import Room from "../models/Room.model.js";
import Hotel from "../models/Room.model.js";

// Function to check room availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      status: { $ne: "cancelled" },
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0;
  } catch (error) {
    throw error;
  }
};

// API to check room availability
// POST /api/booking/check-availability
const checkAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;

    if (!checkInDate || !checkOutDate || !room) {
      return res.status(400).json({
        success: false,
        message: "Check-in date, check-out date, and room are required",
      });
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    return res.status(200).json({
      success: true,
      isAvailable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to create a new booking
// POST /api/booking/book
const createBooking = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room, guests } = req.body;
    const user = req.user._id;

    if (!checkInDate || !checkOutDate || !room || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Check room availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available",
      });
    }

    // Get room details
    const roomData = await Room.findById(room).populate("hotel");

    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Calculate total price
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const totalPrice = roomData.pricePerNight * nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      guests: Number(guests),
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all bookings for a user
// GET /api/booking/user
const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;

    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      owner: req.user._id,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "No hotel found",
      });
    }

    const bookings = await Booking.find({
      hotel: hotel._id,
    })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    // Total bookings
    const totalBookings = bookings.length;

    // Total revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0,
    );

    return res.status(200).json({
      success: true,
      dashboardData: {
        totalBookings,
        totalRevenue,
        bookings,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  checkAvailabilityAPI,
  createBooking,
  getUserBookings,
  getHotelBookings,
};
