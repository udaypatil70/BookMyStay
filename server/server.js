import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./src/controllers/clerkWebhooks.controllers.js";
import userRouter from "./src/routes/user.routes.js"

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(clerkMiddleware());

// API to listen to clerk Webhooks
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks,
);

// Routes
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use(".api/user", userRouter)

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
