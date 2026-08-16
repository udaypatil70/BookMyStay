import Newsletter from "../models/Newsletter.models.js";
import transporter from "../config/nodemailer.config.js";

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (existing.subscribed) {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed!",
        });
      }
      existing.subscribed = true;
      await existing.save();
      return res.status(200).json({
        success: true,
        message: "Welcome back! You have been re-subscribed.",
      });
    }

    await Newsletter.create({ email });

    try {
      await transporter.sendMail({
        from: `"BookMyStay" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Welcome to the BookMyStay Newsletter!",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:16px;">
            <h2 style="color:#0f172a;">You're in!</h2>
            <p style="color:#475569;line-height:1.7;">Thanks for subscribing to the BookMyStay newsletter. You'll be the first to know about exclusive deals, new destinations, and travel inspiration.</p>
            <p style="color:#94a3b8;font-size:12px;margin-top:24px;">— The BookMyStay Team</p>
          </div>
        `,
      });
    } catch {
      // email failure is non-critical
    }

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { subscribeNewsletter };
