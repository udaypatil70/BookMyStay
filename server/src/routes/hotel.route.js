import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { registerHotel } from "../controllers/hotel.controllers.js";
import { registerHotelSchema } from "../validations/schemas.js";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, validate(registerHotelSchema), registerHotel);

export default hotelRouter;
