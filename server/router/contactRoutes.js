import express from "express";
import nodemailer from "nodemailer";
import database from "../database/db.js";

const contactRouter = express.Router();

contactRouter.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  try {
    const insertQuery = `
      INSERT INTO contacts (name, email, subject, message)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const dbResult = await database.query(insertQuery, [
      name,
      email,
      subject,
      message,
    ]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_MAIL}>`,
      to: process.env.SMTP_MAIL,
      replyTo: email,
      subject: `ShopMate Support: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #121212; color: #e0e0e0; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #008080;">
          <div style="text-align: center; border-bottom: 2px solid #008080; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #008080; margin: 0;">ShopMate Support</h1>
            <p style="color: #888; font-size: 14px;">New message received from your website</p>
          </div>
          
          <div style="background-color: #1e1e1e; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Customer Name:</strong> <span style="color: #008080;">${name}</span></p>
            <p style="margin: 5px 0;"><strong>Customer Email:</strong> <span style="color: #008080;">${email}</span></p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="background-color: #262626; padding: 25px; border-radius: 8px; border-left: 4px solid #008080;">
            <p style="margin-top: 0; font-weight: bold; color: #008080;">Message Body:</p>
            <p style="line-height: 1.6; font-size: 16px;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} ShopMate E-commerce. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    // console.log("✅ Email sent successfully to:", process.env.SMTP_MAIL);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("❌ Error in Contact Route:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

export default contactRouter;
