import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
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

// Request ID — attach unique ID to every request for tracing
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

// CORS — support multiple origins (comma-separated in env)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // In development, allow localhost on any port
      if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Body size limits — prevent memory abuse
const JSON_LIMIT = "1mb";
const RAW_LIMIT = "5mb";

// Stripe Webhook (must be before express.json — needs raw body)
app.post(
  "/api/bookings/stripe-webhook",
  express.raw({ type: "application/json", limit: RAW_LIMIT }),
  stripeWebhook,
);

// Clerk Webhook (needs raw body)
app.post(
  "/api/clerk",
  express.raw({ type: "application/json", limit: RAW_LIMIT }),
  clerkWebhooks,
);

app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: JSON_LIMIT }));
app.use(clerkMiddleware());

// Request logging (dev-friendly, non-production-safe)
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      const color = status >= 400 ? "\x1b[31m" : status >= 300 ? "\x1b[33m" : "\x1b[32m";
      console.log(
        `${color}${req.method}\x1b[0m ${req.originalUrl} ${color}${status}\x1b[0m ${duration}ms [${req.id}]`,
      );
    });
    next();
  });
}

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BookMyStay API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Health check — no auth, no rate limit
app.get("/health", async (req, res) => {
  const mongoose = (await import("mongoose")).default;
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB",
      heap: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
    },
  });
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
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[${req.id || "no-id"}] Unhandled Error:`, err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log("HTTP server closed.");
    const mongoose = (await import("mongoose")).default;
    await mongoose.connection.close(false);
    console.log("Database connection closed.");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
