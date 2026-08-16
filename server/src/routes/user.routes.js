import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  getUserData,
  getProfile,
  updateProfile,
  storeRecentSearchedCities,
  toggleFavourite,
  getFavourites,
} from "../controllers/user.controllers.js";
import {
  storeRecentSearchSchema,
  toggleFavouriteSchema,
  updateProfileSchema,
} from "../validations/schemas.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.get("/profile", protect, getProfile);
userRouter.put(
  "/profile",
  protect,
  upload.single("image"),
  validate(updateProfileSchema),
  updateProfile,
);
userRouter.post(
  "/store-recent-search",
  protect,
  validate(storeRecentSearchSchema),
  storeRecentSearchedCities,
);
userRouter.post(
  "/toggle-favourite",
  protect,
  validate(toggleFavouriteSchema),
  toggleFavourite,
);
userRouter.get("/favourites", protect, getFavourites);

export default userRouter;
