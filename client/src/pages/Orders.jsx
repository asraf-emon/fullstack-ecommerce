import { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const { myOrders = [] } = useSelector((state) => state.order);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/products");
    } else {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, authUser, navigate]);

  const filterOrders = myOrders.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter,
  );

  const getStatusIcon = (status) => {
    const icons = {
      Processing: <Package className="w-5 h-5 text-amber-500" />,
      Shipped: <Truck className="w-5 h-5 text-blue-500" />,
      Delivered: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      Cancelled: <XCircle className="w-5 h-5 text-rose-500" />,
    };
    return icons[status] || <Package className="w-5 h-5 text-gray-500" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      Processing: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      Shipped: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      Delivered: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      Cancelled: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    };
    return colors[status] || "bg-slate-500/15 text-slate-400";
  };

  const statusArray = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!authUser) return null;

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Track and manage your order history.
          </p>
        </div>

        {/* Status Filter */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-4 mb-8 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-4 flex-wrap gap-y-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-teal-500" />
              <span className="font-semibold text-slate-700 dark:text-zinc-300">
                Filter:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusArray.map((status) => (
                <button
                  key={`filter-${status}`}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-2 rounded-xl font-medium transition-all text-sm ${
                    statusFilter === status
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filterOrders.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 max-w-md mx-auto">
              <Package className="w-16 h-16 text-slate-300 dark:text-zinc-700 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                No Orders Found
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 px-6">
                {statusFilter === "All"
                  ? "You haven't placed any orders yet."
                  : `No orders with status "${statusFilter}" found.`}
              </p>
            </div>
          ) : (
            filterOrders.map((order, index) => (
              <div
                key={order.id || `order-${index}`}
                className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-slate-100 dark:border-white/5">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      Order #{order.id || "N/A"}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                      Placed on{" "}
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString("en-GB")
                        : "Unknown Date"}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(order.order_status)}`}
                    >
                      {getStatusIcon(order.order_status)}
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {order.order_status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                        Total
                      </p>
                      <p className="text-xl font-black text-teal-600 dark:text-teal-400">
                        ${order.total_price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.order_items?.map((item, itemIndex) => (
                    <div
                      key={item.id || `item-${itemIndex}`}
                      className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-lg bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate text-sm">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 dark:text-zinc-400 tracking-tight text-sm">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions Section */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/orders/track/${order.id}`)}
                    className="px-5 py-2 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  >
                    Track Order
                  </button>

                  {order.order_status === "Delivered" && (
                    <>
                      <button className="px-5 py-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl text-sm font-bold hover:bg-teal-500 hover:text-white transition-all">
                        Write Review
                      </button>

                      <button className="px-5 py-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl text-sm font-bold hover:bg-teal-500 hover:text-white transition-all">
                        Reorder
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
