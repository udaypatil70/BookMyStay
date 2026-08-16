import express from "express";
import { protect, adminGuard } from "../middleware/auth.middleware.js";
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
} from "../controllers/admin.controllers.js";

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
adminRouter.get("/hotels", getAdminHotels);

export default adminRouter;
