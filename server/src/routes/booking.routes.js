import express from "express";
import { protect, ownerGuard } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings,
  cancelBooking,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getOwnerStats,
  updateBookingStatus,
} from "../controllers/booking.controllers.js";
import {
  checkAvailabilitySchema,
  createBookingSchema,
  cancelBookingSchema,
  razorpayOrderSchema,
  razorpayVerifySchema,
  updateBookingStatusSchema,
} from "../validations/schemas.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/check-availability",
  validate(checkAvailabilitySchema),
  checkAvailabilityAPI,
);
bookingRouter.post(
  "/book",
  protect,
  validate(createBookingSchema),
  createBooking,
);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);
bookingRouter.post(
  "/cancel",
  protect,
  validate(cancelBookingSchema),
  cancelBooking,
);
bookingRouter.post(
  "/create-razorpay-order",
  protect,
  validate(razorpayOrderSchema),
  createRazorpayOrder,
);
bookingRouter.post(
  "/verify-payment",
  protect,
  validate(razorpayVerifySchema),
  verifyRazorpayPayment,
);

// Owner routes
bookingRouter.get("/owner/stats", ownerGuard, getOwnerStats);
bookingRouter.put(
  "/status",
  ownerGuard,
  validate(updateBookingStatusSchema),
  updateBookingStatus,
);

export default bookingRouter;
