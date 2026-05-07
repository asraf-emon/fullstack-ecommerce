import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Components & Pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Products from "./components/Products";

// Actions
import { getUser } from "./store/slices/authSlice";
import { getDashboardStats } from "./store/slices/adminSlice";
import { fetchAllProducts } from "./store/slices/productsSlice";

// আপনার টিল থিম অনুযায়ী একটি লোডার (Flickering বন্ধ করার জন্য)
const FullPageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
    <div className="w-10 h-10 border-4 border-teal-600/20 border-t-teal-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();

  // authSlice থেকে loading স্টেটটি নিচ্ছি
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const { openedComponent } = useSelector((state) => state.extra);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getDashboardStats());
      dispatch(fetchAllProducts());
    }
  }, [dispatch, isAuthenticated]);

  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Profile":
        return <Profile />;
      case "Products":
        return <Products />;
      default:
        return <Dashboard />;
    }
  };

  // রিফ্রেশ করলে লগইন পেজ আসা বন্ধ করতে এই কন্ডিশনটি জরুরি
  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Admin Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen bg-[#f8fafc]">
                <SideBar />
                <div className="flex-1 overflow-x-hidden">
                  {renderDashboardContent()}
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </Router>
  );
}

export default App;
