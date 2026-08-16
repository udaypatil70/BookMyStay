import express from "express";
import { protect, adminGuard } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  getAdminStats,
  getContacts,
  markContactRead,
  deleteContact,
  getNewsletterSubscribers,
  unsubscribeNewsletter,
  getUsers,
  updateUserRole,
  getAdminHotels,
  getPendingHotels,
  getHotelDetails,
  approveHotel,
  rejectHotel,
} from "../controllers/admin.controllers.js";
import { approveHotelSchema, rejectHotelSchema } from "../validations/schemas.js";

const adminRouter = express.Router();

// All admin routes require authentication + admin role
adminRouter.use(protect, adminGuard);

adminRouter.get("/stats", getAdminStats);

// Contact management
adminRouter.get("/contacts", getContacts);
adminRouter.post("/contacts/read", markContactRead);
adminRouter.delete("/contacts", deleteContact);

// Newsletter management
adminRouter.get("/newsletter", getNewsletterSubscribers);
adminRouter.post("/newsletter/unsubscribe", unsubscribeNewsletter);

// User management
adminRouter.get("/users", getUsers);
adminRouter.post("/users/role", updateUserRole);

// Hotel management
adminRouter.get("/hotels/pending", getPendingHotels);
adminRouter.get("/hotels", getAdminHotels);
adminRouter.get("/hotels/:id", getHotelDetails);
adminRouter.post("/hotels/approve", validate(approveHotelSchema), approveHotel);
adminRouter.post("/hotels/reject", validate(rejectHotelSchema), rejectHotel);

export default adminRouter;
