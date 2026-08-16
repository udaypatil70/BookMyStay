import express from "express";
import { searchRooms, getCities, getFeaturedRooms, getRoomById } from "../controllers/search.controllers.js";

const searchRouter = express.Router();

searchRouter.get("/rooms", searchRooms);
searchRouter.get("/cities", getCities);
searchRouter.get("/featured-rooms", getFeaturedRooms);
searchRouter.get("/room/:id", getRoomById);

export default searchRouter;
