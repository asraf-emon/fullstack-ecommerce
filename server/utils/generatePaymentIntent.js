import database from "../database/db.js";
import Stripe from "stripe";

export async function generatePaymentIntent(orderId, totalPrice) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "Stripe Secret Key is missing from environment variables.",
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "usd",
    });

    await database.query(
      `INSERT INTO payments (order_id, payment_type, payment_status, payment_intent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [orderId, "Online", "Pending", paymentIntent.client_secret],
    );

    return { success: true, clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Payment Error:", error.message || error);
    return { success: false, message: error.message || "Payment Failed." };
  }
}
