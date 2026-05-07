import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, HeartOff, ArrowLeft } from "lucide-react";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product._id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
        <div className="bg-secondary/30 p-8 rounded-full mb-6">
          <HeartOff size={80} className="text-muted-foreground opacity-20" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added anything to your wishlist yet. Explore
          our products and find something you love!
        </p>
        <Link
          to="/products"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
        >
          <ArrowLeft size={20} /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight">MY WISHLIST</h1>
            <p className="text-muted-foreground mt-1">
              You have {wishlistItems.length} items in your wishlist
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-teal-500 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="group bg-secondary/20 border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                  className="absolute top-4 right-4 p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all backdrop-blur-md"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <Link to={`/product/${item._id}`}>
                  <h3 className="font-bold text-lg line-clamp-1 hover:text-teal-400 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-teal-400 font-bold text-xl mt-2">
                  ${item.price}
                </p>

                <div className="mt-5 grid grid-cols-5 gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="col-span-4 flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <Link
                    to={`/product/${item._id}`}
                    className="col-span-1 flex items-center justify-center border border-border rounded-xl hover:bg-secondary transition-all"
                  >
                    <ArrowLeft className="rotate-180" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
