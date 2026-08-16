import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings,
  cancelBooking,
  stripePaymentIntent,
  stripeWebhook,
} from "../controllers/booking.controllers.js";
import {
  checkAvailabilitySchema,
  createBookingSchema,
  cancelBookingSchema,
  stripePaymentSchema,
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
  "/create-payment-intent",
  protect,
  validate(stripePaymentSchema),
  stripePaymentIntent,
);

export default bookingRouter;
