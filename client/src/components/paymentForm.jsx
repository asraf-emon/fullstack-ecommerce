import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "react-toastify";
import {
  toggleOrderStep,
  updateOrderPayment,
} from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";

const PaymentForm = () => {
  const { paymentIntent: clientSecret, currentOrderId } = useSelector(
    (state) => state.order,
  );
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    if (!clientSecret) {
      setErrorMessage("Payment details not found. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    const theCard = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: theCard,
          },
        },
      );

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log(
          "Stripe payment successful. Updating database for Order ID:",
          currentOrderId,
        );

        if (currentOrderId) {
          try {
            await dispatch(updateOrderPayment(currentOrderId)).unwrap();

            toast.success("Payment Successful & Order Confirmed!");

            dispatch(clearCart());
            dispatch(toggleOrderStep());
            setIsProcessing(false);
            navigateTo("/orders");
          } catch (updateErr) {
            console.error("Database update failed:", updateErr);
            setErrorMessage(
              "Payment was successful, but we couldn't update the order status. Please contact support.",
            );
            setIsProcessing(false);
          }
        } else {
          setErrorMessage(
            "Order ID not found. Payment confirmed but database not updated.",
          );
          setIsProcessing(false);
        }
      }
    } catch (err) {
      console.error("Payment Submission Error:", err);
      setErrorMessage("Something went wrong during payment processing.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-6 rounded-xl border border-white/10 bg-zinc-900 shadow-xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-teal-500/10 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-teal-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">Card Payment</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Card Details *
          </label>
          <div className="px-4 py-3 bg-zinc-800 border border-white/5 rounded-lg focus-within:ring-2 focus-within:ring-teal-500/50 transition-all">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    fontFamily: '"Inter", sans-serif',
                    fontSmoothing: "antialiased",
                    "::placeholder": {
                      color: "#71717a",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                    iconColor: "#ef4444",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6 p-4 bg-teal-500/5 rounded-lg border border-teal-500/10">
          <Lock className="w-5 h-5 text-emerald-500" />
          <span className="text-sm text-zinc-400">
            Your card information is encrypted and secure.
          </span>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex justify-center items-center gap-2 w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 disabled:opacity-50 transition-all font-semibold shadow-lg shadow-teal-500/20 active:scale-[0.98]"
        >
          {isProcessing ? "Processing..." : "Complete Payment"}
        </button>

        {errorMessage && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
            <p className="text-xs text-rose-500 text-center font-medium">
              {errorMessage}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
