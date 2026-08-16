import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./src/config/db.config.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./src/controllers/clerkWebhooks.controllers.js";
import userRouter from "./src/routes/user.routes.js";
import hotelRouter from "./src/routes/hotel.route.js";
import connectCloudinary from "./src/config/cloudinary.config.js";
import roomRouter from "./src/routes/room.routes.js";
import bookingRouter from "./src/routes/booking.routes.js";
import reviewRouter from "./src/routes/review.routes.js";
import publicRouter from "./src/routes/public.routes.js";
import searchRouter from "./src/routes/search.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import { stripeWebhook } from "./src/controllers/booking.controllers.js";

const app = express();

// Connect Database
connectDB();
connectCloudinary();

// Security Middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Stripe Webhook (must be before express.json)
app.post(
  "/api/bookings/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

// API to listen to Clerk Webhooks
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks,
);

app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/user", authLimiter, userRouter);
app.use("/api/hotels", authLimiter, hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/search", searchRouter);
app.use("/api/admin", adminRouter);
app.use("/api", publicRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
