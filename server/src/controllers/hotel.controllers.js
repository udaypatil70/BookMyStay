import Hotel from "../models/Hotel.models.js";
import User from "../models/user.models.js";

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

export {registerHotel};