import { getAuth } from "@clerk/express";
import User from "../models/user.models.js";

const resolveUser = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return user;
};

export const protect = async (req, res, next) => {
  try {
    const user = await resolveUser(req, res);
    if (!user) return;
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ownerGuard = async (req, res, next) => {
  try {
    const user = await resolveUser(req, res);
    if (!user) return;

    if (user.role !== "hotelOwner" && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Hotel owner role required.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminGuard = async (req, res, next) => {
  try {
    const user = await resolveUser(req, res);
    if (!user) return;

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
