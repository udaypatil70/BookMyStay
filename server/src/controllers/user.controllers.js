import { v2 as cloudinary } from "cloudinary";

const getUserData = async (req, res) => {
  try {
    const { role, recentSearchedCities } = req.user;

    return res.status(200).json({
      success: true,
      role,
      recentSearchedCities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get full user profile
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { username, phone } = req.body;
    const user = req.user;

    if (username !== undefined) {
      if (typeof username !== "string" || username.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: "Username must be at least 2 characters",
        });
      }
      user.username = username.trim();
    }

    if (phone !== undefined) {
      if (phone && typeof phone === "string" && phone.trim().length > 0) {
        // Basic phone validation: allow digits, spaces, dashes, plus
        const phoneClean = phone.replace(/[\s\-+()]/g, "");
        if (!/^\d{7,15}$/.test(phoneClean)) {
          return res.status(400).json({
            success: false,
            message: "Please provide a valid phone number",
          });
        }
      }
      user.phone = phone ? phone.trim() : "";
    }

    // Handle profile image upload
    if (req.file) {
      const response = await cloudinary.uploader.upload(req.file.path);
      user.image = response.secure_url;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;

    if (!recentSearchedCity) {
      return res.status(400).json({
        success: false,
        message: "Recent searched city is required",
      });
    }

    const user = req.user;

    // Remove duplicate if it already exists
    user.recentSearchedCities = user.recentSearchedCities.filter(
      (city) => city !== recentSearchedCity,
    );

    // Keep only the latest 3 cities
    if (user.recentSearchedCities.length >= 3) {
      user.recentSearchedCities.shift();
    }

    user.recentSearchedCities.push(recentSearchedCity);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "City added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleFavourite = async (req, res) => {
  try {
    const { hotelId } = req.body;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const user = req.user;
    const index = user.favouriteHotels.indexOf(hotelId);

    if (index > -1) {
      user.favouriteHotels.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Removed from favourites",
        favourites: user.favouriteHotels,
      });
    } else {
      user.favouriteHotels.push(hotelId);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Added to favourites",
        favourites: user.favouriteHotels,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavourites = async (req, res) => {
  try {
    const user = req.user;
    await user.populate("favouriteHotels");

    return res.status(200).json({
      success: true,
      favourites: user.favouriteHotels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getUserData, getProfile, updateProfile, storeRecentSearchedCities, toggleFavourite, getFavourites };
