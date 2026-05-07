import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {
  deleteOrder,
  fetchAllOrders,
  updateOrderStatus,
} from "../store/slices/orderSlice";
import {
  Trash2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  User,
  ExternalLink,
} from "lucide-react";

const Orders = () => {
  const statusArray = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [selectedStatus, setSelectedStatus] = useState({});
  const [filterByStatus, setFilterByStatus] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const filteredOrders =
    filterByStatus === "All"
      ? orders
      : orders?.filter((order) => order.order_status === filterByStatus);

  const confirmDelete = () => {
    dispatch(deleteOrder(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "Processing":
        return {
          color: "bg-blue-50 text-blue-600 border-blue-100",
          icon: <Clock size={14} className="animate-pulse" />,
        };
      case "Shipped":
        return {
          color: "bg-purple-50 text-purple-600 border-purple-100",
          icon: <Truck size={14} />,
        };
      case "Delivered":
        return {
          color: "bg-teal-50 text-teal-600 border-teal-100",
          icon: <CheckCircle size={14} />,
        };
      case "Cancelled":
        return {
          color: "bg-red-50 text-red-600 border-red-100",
          icon: <XCircle size={14} />,
        };
      default:
        return {
          color: "bg-gray-50 text-gray-600 border-gray-100",
          icon: <Package size={14} />,
        };
    }
  };

  return (
    <>
      <main className="p-2.5 pl-2.5 md:pl-68 w-full min-h-screen bg-slate-50/50">
        {/* Header Section */}
        <div className="flex-1 md:p-6 pb-2">
          <Header />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Order Management
              </h1>
              <p className="text-sm text-gray-500">
                Track and manage all customer transactions efficiently.
              </p>
            </div>

            {/* Filter Section */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Filter
              </span>
              <select
                className="bg-transparent text-sm font-bold text-teal-600 outline-none cursor-pointer"
                onChange={(e) => setFilterByStatus(e.target.value)}
              >
                {statusArray.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List Container */}
        <div className="md:px-6 pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-teal-600 font-medium animate-pulse">
                Loading orders...
              </p>
            </div>
          ) : filteredOrders?.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
              <Package className="mx-auto text-slate-200 mb-4" size={80} />
              <h3 className="text-xl font-bold text-slate-700">
                No orders found.
              </h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusDetails(order.order_status);
                return (
                  <div
                    key={order.id}
                    className="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    {/* Top Info Bar */}
                    <div className="bg-slate-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-tighter font-black text-slate-400 mb-0.5">
                            Order ID
                          </p>
                          <div className="flex items-center gap-2 group cursor-pointer">
                            <p className="text-sm font-mono font-bold text-slate-700">
                              #{order.id.slice(-8).toUpperCase()}
                            </p>
                            <ExternalLink
                              size={12}
                              className="text-slate-400 group-hover:text-teal-600 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
                        <div>
                          <p className="text-[10px] uppercase tracking-tighter font-black text-slate-400 mb-0.5">
                            Order Date
                          </p>
                          <p className="text-sm text-slate-600 font-medium">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-wide ${statusInfo.color}`}
                        >
                          {statusInfo.icon}
                          {order.order_status}
                        </div>
                        <button
                          onClick={() =>
                            setDeleteConfirm({ open: true, id: order.id })
                          }
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Shipping Info */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-2 text-teal-600">
                          <MapPin size={16} />
                          <h4 className="text-xs font-black uppercase tracking-widest">
                            Shipping Detail
                          </h4>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm">
                              <User size={14} />
                            </div>
                            <p className="text-sm font-bold text-slate-800">
                              {order.shipping_info?.full_name}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm">
                              <Phone size={14} />
                            </div>
                            <p className="text-sm text-slate-600">
                              {order.shipping_info?.phone}
                            </p>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-500 pl-11">
                            {order.shipping_info?.address},{" "}
                            {order.shipping_info?.city},{" "}
                            {order.shipping_info?.state} -{" "}
                            {order.shipping_info?.pincode},{" "}
                            {order.shipping_info?.country}
                          </p>
                        </div>

                        <div className="pt-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                            Change Status
                          </label>
                          <select
                            value={
                              selectedStatus[order.id] || order.order_status
                            }
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="w-full mt-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-teal-500 transition-colors shadow-sm"
                          >
                            {statusArray
                              .filter((s) => s !== "All")
                              .map((status) => (
                                <option value={status} key={status}>
                                  {status}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* Right: Items Info */}
                      <div className="lg:col-span-8">
                        <div className="flex items-center gap-2 text-teal-600 mb-4">
                          <Package size={16} />
                          <h4 className="text-xs font-black uppercase tracking-widest">
                            Order Summary
                          </h4>
                        </div>
                        <div className="space-y-3 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                          {order.order_items?.map((item) => (
                            <div
                              key={item.id}
                              className="group flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-teal-100 hover:bg-teal-50/30 transition-all"
                            >
                              <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-white">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-14 h-14 object-cover cursor-zoom-in group-hover:scale-110 transition-transform duration-500"
                                  onClick={() => setPreviewImage(item.image)}
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800 line-clamp-1">
                                  {item.title}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  Qty:{" "}
                                  <span className="font-bold text-slate-700">
                                    {item.quantity}
                                  </span>
                                  <span className="mx-2 text-slate-300">|</span>
                                  Price:{" "}
                                  <span className="font-bold text-teal-600">
                                    ${item.price}
                                  </span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-black text-slate-800">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Grand Total */}
                        <div className="mt-6 flex items-center justify-between bg-teal-600 p-4 rounded-2xl text-white shadow-lg shadow-teal-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                              <CheckCircle size={20} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider opacity-90">
                              Grand Total
                            </span>
                          </div>
                          <span className="text-2xl font-black">
                            ${order.total_price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal: Full Image Preview */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-100 p-6"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl w-full animate-in zoom-in-95 duration-300">
              <img
                src={previewImage}
                alt="Product preview"
                className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/10"
              />
              <button className="absolute -top-12 right-0 text-white font-bold flex items-center gap-2 hover:text-teal-400">
                <XCircle size={24} /> Close Preview
              </button>
            </div>
          </div>
        )}

        {/* Modal: Delete Order Confirmation */}
        {deleteConfirm.open && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex justify-center items-center z-100 p-4">
            <div className="bg-white rounded-4xl p-8 max-w-sm w-full shadow-2xl text-center border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Are you sure?
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                This action will permanently delete order #
                {deleteConfirm.id?.slice(-6).toUpperCase()}.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteConfirm({ open: false, id: null })}
                  className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3.5 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-xl shadow-red-200 transition-all active:scale-95"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Orders;
