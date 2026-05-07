import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../store/slices/orderSlice";
import { ArrowLeft, CreditCard, MapPin, Package, Calendar } from "lucide-react";

const OrderDetails = () => {
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

  if (fetchingOrders) {
    return (
      <div className="pt-32 text-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-500 mx-auto mb-4"></div>
        <p className="text-zinc-500">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-32 text-center h-screen bg-black text-white">
        <h2 className="text-xl font-bold mb-4 text-rose-500">
          Order Not Found
        </h2>
        <button
          onClick={() => navigate("/orders")}
          className="px-6 py-2 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-all"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-12 container mx-auto px-4 max-w-4xl">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Orders
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-white">Order Details</h1>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase font-mono tracking-tighter">
                  ID: {order.id}
                </p>
              </div>
              <span className="px-4 py-1 bg-teal-500/10 text-teal-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {order.order_status}
              </span>
            </div>

            <div className="space-y-4">
              {order.order_items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-white">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="text-zinc-400 font-medium">Total Paid</span>
              <span className="text-2xl font-black text-teal-500">
                ${order.total_amount || order.total_price}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xs font-black text-zinc-500 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
              <MapPin size={14} className="text-teal-500" /> Shipping Info
            </h3>
            <div className="text-sm text-zinc-400 space-y-1">
              <p className="text-white font-bold mb-2">
                {order.shipping_info?.full_name || "Name Not Found"}
              </p>
              <p>
                {order.shipping_info?.address}, {order.shipping_info?.city}
              </p>
              <p>
                {/* state, pincode, country */}
                {order.shipping_info?.state}, {order.shipping_info?.pincode}
              </p>
              <p className="text-zinc-300 font-medium uppercase tracking-wide">
                {order.shipping_info?.country}
              </p>
              <p className="mt-2 text-zinc-500">{order.shipping_info?.phone}</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xs font-black text-zinc-500 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
              <CreditCard size={14} className="text-teal-500" /> Payment
            </h3>
            <p className="text-sm text-zinc-400">Method: Stripe Card</p>
            <p className="text-sm text-emerald-500 font-bold mt-1">
              Status: Success
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
