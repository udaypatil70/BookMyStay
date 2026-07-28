import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { registerHotel } from "../controllers/hotel.controllers.js";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, registerHotel)

export default hotelRouter;