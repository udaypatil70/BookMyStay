import Hotel from "../models/Hotel.models.js";
import User from "../models/user.models.js";
import Room from "../models/Room.models.js";
import Booking from "../models/bookings.models.js";

const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Validate input
    if (!name || !address || !contact || !city) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already registered a hotel
    const hotel = await Hotel.findOne({ owner });

    if (hotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel already registered",
      });
    }

    // Create hotel
    await Hotel.create({
      name,
      address,
      contact,
      city,
      owner,
    });

    // Update user role
    await User.findByIdAndUpdate(owner, {
      role: "hotelOwner",
    });

    return res.status(201).json({
      success: true,
      message: "Hotel registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findById(id).populate("owner", "username image").lean();

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Get room count and average rating
    const [roomCount, reviewStats] = await Promise.all([
      Room.countDocuments({ hotel: id, isAvailable: true }),
      Room.aggregate([
        { $match: { hotel: hotel._id } },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "room",
            as: "reviews",
          },
        },
        { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: null,
            avgRating: { $avg: "$reviews.rating" },
            totalReviews: { $sum: { $cond: ["$reviews._id", 1, 0] } },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      hotel: {
        ...hotel.toObject(),
        roomCount,
        avgRating: Number((reviewStats[0]?.avgRating || 0).toFixed(1)),
        totalReviews: reviewStats[0]?.totalReviews || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to update hotel details (owner)
const updateHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;

    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    if (name) hotel.name = name;
    if (address) hotel.address = address;
    if (contact) hotel.contact = contact;
    if (city) hotel.city = city;

    await hotel.save();

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all hotels
const getAllHotels = async (req, res) => {
  try {
    const { city, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (city) filter.city = { $regex: new RegExp(city, "i") };

    const total = await Hotel.countDocuments(filter);
    const hotels = await Hotel.find(filter)
      .populate("owner", "username image")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      hotels,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get owner's hotel details + stats
const getOwnerHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "No hotel found",
      });
    }

    const [roomCount, availableRooms, bookingStats] = await Promise.all([
      Room.countDocuments({ hotel: hotel._id }),
      Room.countDocuments({ hotel: hotel._id, isAvailable: true }),
      Booking.aggregate([
        { $match: { hotel: hotel._id, status: { $ne: "cancelled" } } },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            totalRevenue: {
              $sum: { $cond: ["$isPaid", "$totalPrice", 0] },
            },
            pendingBookings: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            confirmedBookings: {
              $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
            },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      hotel: {
        ...hotel.toObject(),
        stats: {
          totalRooms: roomCount,
          availableRooms,
          totalBookings: bookingStats[0]?.totalBookings || 0,
          totalRevenue: bookingStats[0]?.totalRevenue || 0,
          pendingBookings: bookingStats[0]?.pendingBookings || 0,
          confirmedBookings: bookingStats[0]?.confirmedBookings || 0,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerHotel, getHotelById, updateHotel, getAllHotels, getOwnerHotel };