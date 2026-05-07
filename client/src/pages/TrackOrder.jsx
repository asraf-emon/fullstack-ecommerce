import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../store/slices/orderSlice";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  Home,
  Package,
} from "lucide-react";

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myOrders, fetchingOrders } = useSelector((state) => state.order);
  const order = myOrders?.find((o) => String(o.id) === String(id));

  useEffect(() => {
    if (myOrders.length === 0) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, myOrders.length]);

  const steps = [
    { title: "Order Placed", status: "completed", icon: Package },
    {
      title: "Processing",
      status: ["Processing", "Shipped", "Delivered"].includes(
        order?.order_status,
      )
        ? "completed"
        : "pending",
      icon: Clock,
    },
    {
      title: "Shipped",
      status: ["Shipped", "Delivered"].includes(order?.order_status)
        ? "completed"
        : "pending",
      icon: Truck,
    },
    {
      title: "Delivered",
      status: order?.order_status === "Delivered" ? "completed" : "pending",
      icon: Home,
    },
  ];

  if (fetchingOrders)
    return (
      <div className="pt-32 text-center text-white bg-black h-screen">
        Tracking status loading...
      </div>
    );

  if (!order) {
    return (
      <div className="pt-32 text-center h-screen bg-black text-white px-4">
        <h2 className="text-xl font-bold text-rose-500">
          Tracking Info Not Found
        </h2>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 px-6 py-2 bg-zinc-800 rounded-xl"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-12 container mx-auto px-4 max-w-xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
        <h1 className="text-2xl font-black text-white text-center mb-2">
          Track Order
        </h1>
        <p className="text-center text-zinc-600 text-[10px] mb-12 font-mono tracking-widest uppercase">
          #{order.id}
        </p>

        <div className="space-y-12 relative">
          <div className="absolute left-[19.5px] top-2 bottom-2 w-px bg-zinc-800"></div>

          {steps.map((step, index) => {
            const isDone = step.status === "completed";
            return (
              <div key={index} className="flex gap-6 items-start relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-700 ${
                    isDone
                      ? "bg-teal-500 border-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                      : "bg-zinc-900 border-zinc-800 text-zinc-600"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <step.icon size={18} />
                  )}
                </div>
                <div>
                  <h3
                    className={`font-black text-sm uppercase tracking-wider ${isDone ? "text-white" : "text-zinc-700"}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {isDone ? "Updated on May 02, 2026" : "Expected shortly"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
