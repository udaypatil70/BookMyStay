import Booking from "../models/bookings.models.js";
import Room from "../models/Room.models.js";
import Hotel from "../models/Hotel.models.js";
import transporter from "../config/nodemailer.config.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
// POST /api/bookings/check-availability
const checkAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;

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
// POST /api/bookings/book
const createBooking = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room, guests, paymentMethod } = req.body;
    const user = req.user._id;

    // Check room availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available for the selected dates",
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

    // Determine initial status based on payment method
    const isPaidByCard = paymentMethod === "Card" || paymentMethod === "UPI";

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      guests: +guests,
      totalPrice,
      paymentMethod: paymentMethod || "Pay At Hotel",
      status: isPaidByCard ? "confirmed" : "pending",
      isPaid: false,
    });

    // Send booking confirmation email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Confirmation",
      html: `
    <h2>Your Booking Details</h2>
    <p>Dear ${req.user.username},</p>
    <p>Thank you for your booking! Here are your details:</p>
    <ul>
      <li><strong>Booking ID:</strong> ${booking._id}</li>
      <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
      <li><strong>Location:</strong> ${roomData.hotel.address}</li>
      <li><strong>Check-In:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
      <li><strong>Check-Out:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
      <li><strong>Room Type:</strong> ${roomData.roomType}</li>
      <li><strong>Guests:</strong> ${booking.guests}</li>
      <li><strong>Total Amount:</strong> ${process.env.CURRENCY || "$"}${booking.totalPrice}</li>
      <li><strong>Payment Method:</strong> ${booking.paymentMethod}</li>
      <li><strong>Status:</strong> ${booking.status}</li>
    </ul>
    <p>We look forward to welcoming you!</p>
    <p>If you need to make any changes, feel free to contact us.</p>
  `,
    };

    await transporter.sendMail(mailOptions);

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
// GET /api/bookings/user
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
      message: "Failed to fetch bookings",
    });
  }
};

// API to get all bookings for a hotel
// GET /api/bookings/hotel
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

    // Total bookings (exclude cancelled)
    const totalBookings = bookings.filter(
      (b) => b.status !== "cancelled",
    ).length;

    // Total revenue (only from paid bookings)
    const totalRevenue = bookings
      .filter((b) => b.isPaid && b.status !== "cancelled")
      .reduce((acc, booking) => acc + booking.totalPrice, 0);

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

// API to cancel a booking
// POST /api/bookings/cancel
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId).populate("room hotel");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only the booking user or hotel owner can cancel
    const hotel = await Hotel.findById(booking.hotel._id);
    const isBookingUser = booking.user.toString() === userId;
    const isHotelOwner = hotel && hotel.owner.toString() === userId;

    if (!isBookingUser && !isHotelOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // If already paid, mark as refund pending (don't auto-refund for safety)
    booking.status = "cancelled";
    await booking.save();

    // Send cancellation email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Booking Cancelled",
      html: `
        <h2>Booking Cancellation</h2>
        <p>Dear ${req.user.username},</p>
        <p>Your booking has been cancelled successfully.</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel:</strong> ${booking.hotel.name}</li>
          <li><strong>Check-In:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
          <li><strong>Check-Out:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
          <li><strong>Amount:</strong> ${process.env.CURRENCY || "$"}${booking.totalPrice}</li>
        </ul>
        ${booking.isPaid ? "<p>Since you have already paid, a refund will be processed within 5-7 business days.</p>" : ""}
        <p>If you have any questions, feel free to contact us.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to create Stripe payment intent
// POST /api/bookings/create-payment-intent
const stripePaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId).populate("room hotel");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to pay for this booking",
      });
    }

    if (booking.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Booking is already paid",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cannot pay for a cancelled booking",
      });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100), // Stripe expects amount in cents
      currency: "usd",
      metadata: {
        bookingId: booking._id.toString(),
        userId: userId.toString(),
        hotelName: booking.hotel.name,
      },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: booking.totalPrice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Stripe Webhook to handle payment success
// POST /api/bookings/stripe-webhook (registered with raw body in server.js)
const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({
      success: false,
      message: `Webhook Error: ${err.message}`,
    });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata.bookingId;

    try {
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          status: "confirmed",
          paymentMethod: "Card",
        },
        { new: true },
      );

      if (booking) {
        // Send payment confirmation email
        const User = (await import("../models/user.models.js")).default;
        const userData = await User.findById(booking.user);

        if (userData) {
          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "Payment Confirmed - Booking Updated",
            html: `
              <h2>Payment Confirmed</h2>
              <p>Dear ${userData.username},</p>
              <p>Your payment has been processed successfully.</p>
              <ul>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
                <li><strong>Amount Paid:</strong> ${process.env.CURRENCY || "$"}${booking.totalPrice}</li>
                <li><strong>Status:</strong> Confirmed</li>
              </ul>
              <p>We look forward to welcoming you!</p>
            `,
          };
          await transporter.sendMail(mailOptions);
        }
      }
    } catch (error) {
      console.error("Error updating booking after payment:", error.message);
    }
  }

  res.status(200).json({ received: true });
};

export {
  checkAvailabilityAPI,
  createBooking,
  getUserBookings,
  getHotelBookings,
  cancelBooking,
  stripePaymentIntent,
  stripeWebhook,
};
