import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./src/controllers/clerkWebhooks.controllers.js";
import userRouter from "./src/routes/user.routes.js";
import hotelRouter from "./src/routes/hotel.route.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to Clerk Webhooks
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks,
);
// app.use("/api/clerk" , clerkWebhooks);

// Routes
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
