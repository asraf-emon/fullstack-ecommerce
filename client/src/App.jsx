import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import SearchOverlay from "./components/Layout/SearchOverlay";
import CartSidebar from "./components/Layout/CartSidebar";
import ProfilePanel from "./components/Layout/ProfilePanel";
import LoginModal from "./components/Layout/LoginModal";
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import ApplyJob from "./pages/ApplyJob";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";
import { Loader } from "lucide-react";
import { fetchAllProducts } from "./store/slices/productSlice";
import Press from "./pages/Press";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Security from "./pages/Security";
import Wishlist from "./pages/Wishlist";
import OrderDetails from "./pages/OrderDetails";
import TrackOrder from "./pages/TrackOrder";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingInfo from "./pages/ShippingInfo";

const App = () => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        category: "",
        price: `0-10000`,
        search: "",
        ratings: "",
        availability: "",
        page: 1,
      }),
    );
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);

  if ((isCheckingAuth && !authUser) || !products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Sidebar />
          <SearchOverlay />
          <CartSidebar />
          <ProfilePanel />
          <LoginModal />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/password/reset/:token" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/apply/:jobId" element={<ApplyJob />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/press" element={<Press />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/security" element={<Security />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/orders/track/:id" element={<TrackOrder />} />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>

        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </ThemeProvider>
    </>
  );
};

export default App;
