import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  getUserData,
  storeRecentSearchedCities,
} from "../controllers/user.controllers.js";
import { storeRecentSearchSchema } from "../validations/schemas.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post(
  "/store-recent-search",
  protect,
  validate(storeRecentSearchSchema),
  storeRecentSearchedCities,
);

export default userRouter;
