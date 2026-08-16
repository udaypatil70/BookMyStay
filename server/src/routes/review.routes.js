import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { addReviewSchema } from "../validations/schemas.js";
import { addReview, getRoomReviews, getHotelReviews } from "../controllers/review.controllers.js";

const reviewRouter = express.Router();

reviewRouter.post("/", protect, validate(addReviewSchema), addReview);
reviewRouter.get("/room/:roomId", getRoomReviews);
reviewRouter.get("/hotel/:hotelId", getHotelReviews);

export default reviewRouter;
