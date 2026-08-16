import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  getUserData,
  storeRecentSearchedCities,
  toggleFavourite,
  getFavourites,
} from "../controllers/user.controllers.js";
import {
  storeRecentSearchSchema,
  toggleFavouriteSchema,
} from "../validations/schemas.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
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
