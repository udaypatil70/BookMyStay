import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "../src/models/Hotel.models.js";
import User from "../src/models/user.models.js";

dotenv.config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const hotelResult = await Hotel.updateMany(
      { status: { $exists: false } },
      { $set: { status: "active" } }
    );
    console.log(`Hotels migrated to active: ${hotelResult.modifiedCount}`);

    const hotelActiveResult = await Hotel.updateMany(
      { status: "pending" },
      { $set: { status: "active" } }
    );
    console.log(`Hotels changed from pending to active: ${hotelActiveResult.modifiedCount}`);

    const ownerIds = await Hotel.distinct("owner", { status: "active" });
    if (ownerIds.length > 0) {
      const userResult = await User.updateMany(
        { _id: { $in: ownerIds } },
        { $set: { isVerified: true, role: "hotelOwner" } }
      );
      console.log(`Users updated to verified hotel owners: ${userResult.modifiedCount}`);
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
