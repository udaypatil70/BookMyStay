import express from "express";
import upload from "../middleware/upload.middleware.js";
import { ownerGuard } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/room.controllers.js";
import {
  createRoomSchema,
  toggleAvailabilitySchema,
} from "../validations/schemas.js";

const roomRouter = express.Router();

roomRouter.post(
  "/",
  ownerGuard,
  upload.array("images", 4),
  validate(createRoomSchema),
  createRoom,
);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", ownerGuard, getOwnerRooms);
roomRouter.post(
  "/toggle-availability",
  ownerGuard,
  validate(toggleAvailabilitySchema),
  toggleRoomAvailability,
);

export default roomRouter;
