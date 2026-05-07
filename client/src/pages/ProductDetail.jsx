import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
  Loader,
  AlertTriangle,
  CircleDollarSign,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReviewsContainer from "../components/Products/ReviewsContainer";
import { addToCart } from "../store/slices/cartSlice";
import { fetchProductDetails } from "../store/slices/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product?.productDetails);
  const { loading, productReviews } = useSelector((state) => state.product);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const finalQuantity =
    product?.stock > 0 ? Math.min(quantity, product.stock) : 0;

  const isInWishlist = wishlistItems?.some((item) => item._id === product?._id);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) {
      toast.error("Sorry, this product is out of stock!");
      return;
    }

    dispatch(addToCart({ product, quantity: finalQuantity }));
    toast.success("Added to cart successfully!");
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product?.name,
      text: `Check out this ${product?.name} on ShopMate!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const navigateTo = useNavigate();

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }));
    navigateTo("/payment");
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f1115]">
        <Loader className="size-10 animate-spin text-teal-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0f1115]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-rose-500">
            Product Not Found
          </h1>
          <p className="text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="bg-[#1a1d23] border border-gray-800 rounded-2xl p-4 overflow-hidden">
              <img
                src={product.images?.[selectedImage]?.url}
                alt={product.name}
                className="w-full h-100 object-contain rounded-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-teal-500 scale-95"
                      : "border-transparent opacity-60"
                  }`}
                >
                  <img
                    src={image?.url}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <div className="flex gap-2 mb-4">
              {new Date() - new Date(product.created_at) <
                30 * 24 * 60 * 60 * 1000 && (
                <span className="px-3 py-1 bg-teal-500 text-black text-[10px] font-bold rounded-full uppercase">
                  NEW
                </span>
              )}
              {product.ratings >= 4.5 && (
                <span className="px-3 py-1 bg-linear-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-bold rounded-full uppercase">
                  TOP RATED
                </span>
              )}
            </div>

            <h1 className="text-4xl font-extrabold text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.floor(product.ratings) ? "currentColor" : "none"
                    }
                    className={
                      i < Math.floor(product.ratings) ? "" : "text-gray-600"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-400">
                ({productReviews?.length || 0} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-teal-400 mb-6">
              ${product.price}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-400">
                Category: <span className="text-white">{product.category}</span>
              </span>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  product.stock > 10
                    ? "bg-teal-500/10 text-teal-400"
                    : product.stock > 0
                      ? "bg-orange-500/10 text-orange-400 animate-pulse"
                      : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {product.stock <= 10 && product.stock > 0 && (
                  <AlertTriangle size={12} />
                )}
                {product.stock > 10
                  ? `In Stock`
                  : product.stock > 0
                    ? `Only ${product.stock} left!`
                    : "Out of Stock"}
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-[#1a1d23] border border-gray-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-medium text-gray-300 block">
                    Quantity
                  </span>
                  {product.stock > 0 && (
                    <span className="text-[10px] text-gray-500">
                      {product.stock} items available
                    </span>
                  )}
                </div>

                <div className="flex items-center bg-[#0f1115] rounded-xl border border-gray-700 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="p-2 hover:bg-gray-800 rounded-lg text-teal-400 disabled:opacity-20"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">
                    {product.stock === 0 ? 0 : finalQuantity}
                  </span>
                  <button
                    onClick={() => {
                      if (quantity < product.stock) {
                        setQuantity((prev) => prev + 1);
                      } else {
                        toast.warning(`Maximum stock reached!`);
                      }
                    }}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="p-2 hover:bg-gray-800 rounded-lg text-teal-400 disabled:opacity-20"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 py-4 bg-teal-500 hover:bg-teal-400 text-black rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 py-4 bg-teal-500 hover:bg-teal-400 text-black rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBuyNow}
                >
                  <CircleDollarSign size={20} /> Buy Now
                </button>
              </div>

              <div className="flex items-center justify-around pt-4 border-t border-gray-800">
                <button
                  onClick={handleAddToWishlist}
                  className={`flex items-center gap-2 transition-colors ${isInWishlist ? "text-rose-500" : "text-gray-400 hover:text-rose-500"}`}
                >
                  <Heart
                    size={20}
                    fill={isInWishlist ? "currentColor" : "none"}
                  />
                  <span className="text-sm font-medium">
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <Share2 size={20} />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-[#1a1d23] border border-gray-800 rounded-3xl overflow-hidden">
          <div className="flex border-b border-gray-800">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-5 font-bold uppercase tracking-wider text-xs transition-all ${
                  activeTab === tab
                    ? "text-teal-400 border-b-2 border-teal-400 bg-teal-400/5"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8">
            {activeTab === "description" ? (
              <div className="max-w-3xl animate-fadeIn">
                <h3 className="text-xl font-bold text-white mb-4">
                  About this product
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            ) : (
              <ReviewsContainer
                product={product}
                productReviews={productReviews}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
