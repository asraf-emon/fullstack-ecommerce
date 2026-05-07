import {
  Menu,
  User,
  ShoppingCart,
  Sun,
  Moon,
  Search,
  Heart,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleAuthPopup,
  toggleCart,
  toggleSearchBar,
  toggleSidebar,
} from "../../store/slices/popupSlice";
import logoImage from "../../assets/logo.png";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  // Cart Data
  const { cart } = useSelector((state) => state.cart);
  let cartItemsCount = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  // Wishlist Data
  const { wishlistItems } = useSelector((state) => state.wishlist); // Wishlist selector
  const wishlistCount = wishlistItems?.length || 0;

  return (
    <>
      <nav className="fixed left-0 w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Hamburger Menu */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>

            {/* Center Logo */}
            <div className="flex-1 flex justify-center">
              <Link to="/">
                <img
                  src={logoImage}
                  alt="ShopMate Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>

              {/* Search Icon */}
              <button
                onClick={() => dispatch(toggleSearchBar())}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>

              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Heart className="w-5 h-5 text-foreground hover:text-rose-500 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Profile */}
              <button
                onClick={() => dispatch(toggleAuthPopup())}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <User className="w-5 h-5 text-foreground" />
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
