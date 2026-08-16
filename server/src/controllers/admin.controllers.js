import Booking from "../models/bookings.models.js";
import Room from "../models/Room.models.js";
import Hotel from "../models/Hotel.models.js";
import User from "../models/user.models.js";
import Contact from "../models/Contact.models.js";
import Newsletter from "../models/Newsletter.models.js";
import Review from "../models/Review.models.js";

// API to get admin dashboard stats
const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalHotels,
      totalRooms,
      totalBookings,
      totalReviews,
      totalContacts,
      totalNewsletterSubs,
      recentBookings,
      recentContacts,
    ] = await Promise.all([
      User.countDocuments(),
      Hotel.countDocuments(),
      Room.countDocuments(),
      Booking.countDocuments({ status: { $ne: "cancelled" } }),
      Review.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments({ subscribed: true }),
      Booking.find({ status: { $ne: "cancelled" } })
        .populate("room hotel user")
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
    ]);

    // Revenue stats
    const revenueData = await Booking.aggregate([
      { $match: { isPaid: true, status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          avgBookingValue: { $avg: "$totalPrice" },
        },
      },
    ]);

    // Monthly booking counts (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyBookings = await Booking.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
          revenue: {
            $sum: {
              $cond: [{ $eq: ["$isPaid", true] }, "$totalPrice", 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalHotels,
        totalRooms,
        totalBookings,
        totalReviews,
        totalContacts,
        totalNewsletterSubs,
        totalRevenue: revenueData[0]?.totalRevenue || 0,
        avgBookingValue: Math.round(revenueData[0]?.avgBookingValue || 0),
        monthlyBookings,
        recentBookings,
        recentContacts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all contacts (admin)
const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, unread } = req.query;

    const filter = {};
    if (unread === "true") filter.isRead = false;
    if (unread === "false") filter.isRead = true;

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      contacts,
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

// API to mark contact as read
const markContactRead = async (req, res) => {
  try {
    const { contactId } = req.body;
    if (!contactId) {
      return res.status(400).json({ success: false, message: "Contact ID is required" });
    }
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { isRead: true },
      { new: true },
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    return res.status(200).json({ success: true, message: "Marked as read", contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete a contact
const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    if (!contactId) {
      return res.status(400).json({ success: false, message: "Contact ID is required" });
    }
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    return res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all newsletter subscribers
const getNewsletterSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const total = await Newsletter.countDocuments({ subscribed: true });
    const subscribers = await Newsletter.find({ subscribed: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      subscribers,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to unsubscribe a newsletter subscriber
const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const subscriber = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase() },
      { subscribed: false },
      { new: true },
    );
    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }
    return res.status(200).json({ success: true, message: "Unsubscribed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all users (admin)
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-favouriteHotels -recentSearchedCities")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to update a user's role (admin)
const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
      return res.status(400).json({ success: false, message: "User ID and role are required" });
    }
    const validRoles = ["user", "hotelOwner", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Role must be one of: ${validRoles.join(", ")}`,
      });
    }
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "Role updated", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all hotels (admin)
const getAdminHotels = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const total = await Hotel.countDocuments();
    const hotels = await Hotel.find()
      .populate("owner", "username email image")
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
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAdminStats,
  getContacts,
  markContactRead,
  deleteContact,
  getNewsletterSubscribers,
  unsubscribeNewsletter,
  getUsers,
  updateUserRole,
  getAdminHotels,
};
