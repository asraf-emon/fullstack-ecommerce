import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { removeFromCart, updateCartQuantity } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart = [] } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);

  const { subtotal, cartItemsCount, shipping, tax, total } = useMemo(() => {
    const sub = cart.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0,
    );
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const ship = sub >= 100 || sub === 0 ? 0 : 2;
    const tx = sub * 0.18;
    const netTotal = sub + tx + ship;

    return {
      subtotal: sub,
      cartItemsCount: count,
      shipping: ship,
      tax: tx,
      total: netTotal,
    };
  }, [cart]);

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.product.id));
      return;
    }
    if (newQuantity > item.product.stock) {
      toast.error(`Limit reached! Only ${item.product.stock} items available.`);
      return;
    }
    dispatch(
      updateCartQuantity({ id: item.product.id, quantity: newQuantity }),
    );
  };

  // --- EMPTY CART VIEW ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-start bg-slate-50 dark:bg-zinc-950 transition-colors">
        <div className="text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 shadow-2xl max-w-md p-10 mt-32 rounded-3xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Your cart is empty.
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to={"/products"}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl text-white gradient-primary hover:brightness-110 transition-all active:scale-95 font-semibold"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product?.id}
                className="bg-white dark:bg-zinc-900 p-6 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-teal-500/30 transition-all shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Image with Optional Chaining */}
                  <Link
                    to={`/product/${item.product?.id}`}
                    className="shrink-0"
                  >
                    <img
                      src={item.product?.images?.[0]?.url || "/placeholder.png"}
                      alt={item.product?.name}
                      className="w-24 h-24 object-cover rounded-xl border border-slate-100 dark:border-white/10"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product?.id}`}
                      className="block hover:text-teal-500 transition-colors"
                    >
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate">
                        {item.product?.name}
                      </h3>
                    </Link>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm mb-2">
                      Category: {item.product?.category}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                        ${item.product?.price}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-slate-100 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/10 p-1">
                      <button
                        type="button"
                        disabled={item.quantity === 1}
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-lg text-teal-600 dark:text-teal-400 disabled:opacity-30"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={item.quantity >= item.product?.stock}
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-lg text-teal-600 dark:text-teal-400 disabled:opacity-30"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="p-2 text-rose-500/50 hover:text-rose-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-right min-w-25">
                    <p className="text-xl font-black text-slate-900 dark:text-white">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 sticky top-24 border border-slate-200 dark:border-white/5 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span
                    className={`font-semibold ${shipping === 0 ? "text-teal-600 dark:text-teal-400" : "text-slate-900 dark:text-white"}`}
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Tax (18%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-slate-100 dark:border-white/10 pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {authUser ? (
                  <Link
                    to={"/payment"}
                    className="w-full block text-center py-4 gradient-primary text-white rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="w-full block text-center py-4 bg-amber-500 text-black rounded-2xl font-bold text-lg transition-all hover:bg-amber-400"
                  >
                    Login to Checkout
                  </Link>
                )}
                <Link
                  to={"/products"}
                  className="w-full block text-center py-3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl font-semibold transition-all hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
