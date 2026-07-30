import User from "../models/user.models.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : JSON.stringify(req.body);
    const evt = whook.verify(rawBody, headers);
    const { data, type } = evt;

    console.log("Webhook Event:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };

        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          username:
            `${data.first_name || ""} ${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          upsert: true,
        });
        break;
      }

      case "user.deleted": {
        console.log("Deleting User:", data.id);

        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log("Unhandled Event:", type);
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Webhook Received",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {clerkWebhooks};
