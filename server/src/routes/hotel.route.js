import express from "express";
import { protect, ownerGuard } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  registerHotel,
  getHotelById,
  updateHotel,
  getAllHotels,
  getOwnerHotel,
} from "../controllers/hotel.controllers.js";
import { registerHotelSchema, updateHotelSchema } from "../validations/schemas.js";

const hotelRouter = express.Router();

// Public routes
hotelRouter.get("/", getAllHotels);

// Protected routes (must be before /:id)
hotelRouter.get("/owner/details", ownerGuard, getOwnerHotel);
hotelRouter.post("/", protect, upload.array("documents", 5), validate(registerHotelSchema), registerHotel);
hotelRouter.put("/", ownerGuard, validate(updateHotelSchema), updateHotel);

// Public route with param (must be last)
hotelRouter.get("/:id", getHotelById);

export default hotelRouter;
