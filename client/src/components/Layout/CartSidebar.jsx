import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.popup);
  const { cart } = useSelector((state) => state.cart);

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.product.id));
      return;
    }

    if (newQuantity > item.product.stock) {
      toast.error(`Only ${item.product.stock} items available in stock!`);
      return;
    }

    dispatch(
      updateCartQuantity({ id: item.product.id, quantity: newQuantity }),
    );
  };

  const total = cart
    ? cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    : 0;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 transition-opacity duration-300"
        onClick={() => dispatch(toggleCart())}
      />

      {/* Main Sidebar Container */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-105 z-110 bg-[#121212] border-l border-white/10 flex flex-col shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-onyx">
          <h2 className="text-xl font-bold text-primary tracking-tight">
            Shopping Cart
          </h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="p-2 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          {!cart || cart.length === 0 ? (
            <div className="flex flex-col items-center h-full text-center pt-20 sm:pt-28">
              <h3 className="text-xl font-semibold text-white/80">
                Your cart is empty
              </h3>
              <p className="text-white/40 mt-2 max-w-62.5">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/products"
                onClick={() => dispatch(toggleCart())}
                className="mt-8 px-10 py-3.5 bg-teal-accent text-white rounded-2xl font-bold glow-on-hover hover:shadow-[0_0_20px_rgba(0,128,128,0.4)] transition-all active:scale-95"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="group bg-onyx border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:border-teal-accent/30 shadow-md"
                >
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/5 bg-black/20">
                      <img
                        src={item.product.images[0]?.url || "/placeholder.png"}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white text-sm sm:text-base truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-teal-accent font-black text-lg mt-1">
                          ${item.product.price}
                        </p>
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-black/40 rounded-xl border border-white/10 p-1">
                          <button
                            className="p-1 text-teal-accent hover:bg-white/5 rounded-lg transition-colors"
                            onClick={() =>
                              updateQuantity(item, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="px-4 text-sm font-bold text-white">
                            {item.quantity}
                          </span>

                          <button
                            className="p-1 text-teal-accent hover:bg-white/5 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                            onClick={() =>
                              updateQuantity(item, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      {item.product.stock <= 5 && item.product.stock > 0 && (
                        <p className="text-[10px] text-orange-400 mt-1 italic">
                          Low stock: {item.product.stock} left
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary Section */}
        {cart && cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-onyx space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-end">
              <span className="text-white/50 font-medium mb-1">
                Total Amount
              </span>
              <span className="text-3xl font-black text-teal-accent tracking-tight">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/cart"
                onClick={() => dispatch(toggleCart())}
                className="w-full py-4 bg-teal-accent text-white text-center rounded-2xl font-extrabold text-lg shadow-lg hover:shadow-[0_0_25px_rgba(0,128,128,0.4)] transition-all active:scale-[0.98]"
              >
                View Cart & Checkout
              </Link>
              <button
                onClick={() => dispatch(toggleCart())}
                className="w-full py-2 text-sm font-medium text-white/40 hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
