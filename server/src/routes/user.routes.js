import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getUserData , storeRecentSearchedCities} from "../controllers/user.controllers.js";

const userRouter = express.Router();

router.get("/", protect, getUserData);
router.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;