import { getAuth } from "@clerk/express";
import User from "../models/user.models.js";

const AuthError = (status, message) => {
  const err = new Error(message);
  err.statusCode = status;
  return err;
};

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw AuthError(401, "Not authenticated");

    const user = await User.findById(userId).lean();
    if (!user) throw AuthError(404, "User not found");

    req.user = user;
    next();
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const ownerGuard = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw AuthError(401, "Not authenticated");

    const user = await User.findById(userId).lean();
    if (!user) throw AuthError(404, "User not found");

    if (user.role !== "hotelOwner" && user.role !== "admin") {
      throw AuthError(403, "Access denied. Hotel owner role required.");
    }

    req.user = user;
    next();
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminGuard = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw AuthError(401, "Not authenticated");

    const user = await User.findById(userId).lean();
    if (!user) throw AuthError(404, "User not found");

    if (user.role !== "admin") {
      throw AuthError(403, "Access denied. Admin role required.");
    }

    req.user = user;
    next();
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};
