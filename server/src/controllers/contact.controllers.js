import Contact from "../models/Contact.models.js";
import transporter from "../config/nodemailer.config.js";

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, checkInDate, checkOutDate, guests, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long",
      });
    }

    await Contact.create({
      name,
      email,
      phone: phone || "",
      checkInDate: checkInDate || "",
      checkOutDate: checkOutDate || "",
      guests: guests || 1,
      message,
    });

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: `"BookMyStay" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We received your enquiry – BookMyStay",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:16px;">
            <h2 style="color:#0f172a;">Thank you, ${name}!</h2>
            <p style="color:#475569;line-height:1.7;">We have received your enquiry and our team will get back to you within 24 hours.</p>
            <div style="background:#f8fafc;padding:16px;border-radius:12px;margin:16px 0;">
              <p style="margin:0;color:#64748b;font-size:13px;">Message: <strong>${message}</strong></p>
              ${checkInDate ? `<p style="margin:4px 0 0;color:#64748b;font-size:13px;">Check-in: <strong>${checkInDate}</strong></p>` : ""}
              ${checkOutDate ? `<p style="margin:4px 0 0;color:#64748b;font-size:13px;">Check-out: <strong>${checkOutDate}</strong></p>` : ""}
              ${guests ? `<p style="margin:4px 0 0;color:#64748b;font-size:13px;">Guests: <strong>${guests}</strong></p>` : ""}
            </div>
            <p style="color:#94a3b8;font-size:12px;margin-top:24px;">— The BookMyStay Team</p>
          </div>
        `,
      });
    } catch {
      // email failure is non-critical
    }

    // Send notification email to business
    try {
      await transporter.sendMail({
        from: `"BookMyStay Enquiry" <${process.env.SMTP_USER}>`,
        to: "bookmystay00@gmail.com",
        subject: `New Enquiry from ${name} – BookMyStay`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:16px;">
            <h2 style="color:#0f172a;">New Contact Enquiry</h2>
            <div style="background:#f8fafc;padding:16px;border-radius:12px;margin:16px 0;">
              <p style="margin:0;color:#334155;font-size:14px;"><strong>Name:</strong> ${name}</p>
              <p style="margin:4px 0 0;color:#334155;font-size:14px;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="margin:4px 0 0;color:#334155;font-size:14px;"><strong>Phone:</strong> ${phone}</p>` : ""}
              ${checkInDate ? `<p style="margin:4px 0 0;color:#334155;font-size:14px;"><strong>Check-in:</strong> ${checkInDate}</p>` : ""}
              ${checkOutDate ? `<p style="margin:4px 0 0;color:#334155;font-size:14px;"><strong>Check-out:</strong> ${checkOutDate}</p>` : ""}
              ${guests ? `<p style="margin:4px 0 0;color:#334155;font-size:14px;"><strong>Guests:</strong> ${guests}</p>` : ""}
              <p style="margin:8px 0 0;color:#334155;font-size:14px;"><strong>Message:</strong></p>
              <p style="margin:4px 0 0;color:#475569;font-size:13px;line-height:1.6;">${message}</p>
            </div>
            <p style="color:#94a3b8;font-size:12px;margin-top:24px;">— BookMyStay Contact Form</p>
          </div>
        `,
      });
    } catch {
      // email failure is non-critical
    }

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { submitContact };
