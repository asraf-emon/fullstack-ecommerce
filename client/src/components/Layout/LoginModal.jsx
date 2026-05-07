import { useState, useEffect } from "react";
import { X, Mail, Lock, User, KeyRound, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleAuthPopup } from "../../store/slices/popupSlice";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../../store/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } =
    useSelector((state) => state.auth);

  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  // Default state settings
  const [mode, setMode] = useState("signin"); // Sign In part stays first
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Modal close function with state reset
  const handleClose = () => {
    dispatch(toggleAuthPopup());
    setTimeout(() => {
      setMode("signin"); // Resets to signin so next time it starts fresh
      setShowPassword(false);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }, 300);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/password/reset/")) {
      setMode("reset");
      if (!isAuthPopupOpen) dispatch(toggleAuthPopup());
    }
  }, [location.pathname, dispatch, isAuthPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (mode === "signup") data.append("name", formData.name);

    if (mode === "forgot") {
      dispatch(forgotPassword({ email: formData.email })).then(() =>
        setMode("signin"),
      );
      return;
    }

    if (mode === "reset") {
      const token = location.pathname.split("/").pop();
      dispatch(resetPassword({ token, ...formData }));
      return;
    }

    mode === "signup" ? dispatch(register(data)) : dispatch(login(data));
  };

  if (!isAuthPopupOpen || authUser) return null;

  let isLoading = isSigningUp || isLoggingIn || isRequestingForToken;

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/70 transition-all cursor-pointer"
        onClick={handleClose}
      />

      {/* Main Modal - High-end Dark Glass Theme */}
      <div className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl animate-fade-in-up overflow-hidden border border-white/10 bg-[#121212]/95 backdrop-blur-xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {mode === "signin"
                  ? "Sign In"
                  : mode === "signup"
                    ? "Get Started"
                    : mode === "forgot"
                      ? "Recovery"
                      : "New Password"}
              </h2>
              <p className="text-white/50 text-sm mt-1 font-medium">
                {mode === "signin"
                  ? "Welcome back! Enter your details."
                  : mode === "forgot"
                    ? "Enter your email to reset password."
                    : "Join us to explore more."}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-teal-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-teal-accent/50 focus:bg-white/10 outline-none transition-all"
                  required
                />
              </div>
            )}

            {mode !== "reset" && (
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-teal-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-teal-accent/50 focus:bg-white/10 outline-none transition-all"
                  required
                />
              </div>
            )}

            {mode !== "forgot" && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-teal-accent transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-teal-accent/50 focus:bg-white/10 outline-none transition-all"
                  required
                />
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-teal-accent transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}

            {mode === "reset" && (
              <div className="relative group">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-teal-accent transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-teal-accent/50 focus:bg-white/10 outline-none transition-all"
                  required
                />
              </div>
            )}

            {mode === "signin" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs font-semibold text-white/40 hover:text-teal-accent transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-teal-accent text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_20px_rgba(0,128,128,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>
                  {mode === "signin"
                    ? "Login"
                    : mode === "signup"
                      ? "Create Account"
                      : "Submit"}
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Section */}
        {["signin", "signup"].includes(mode) && (
          <div className="p-6 bg-white/2 border-t border-white/5 text-center">
            <p className="text-white/40 text-sm font-medium">
              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="ml-2 text-teal-accent font-bold hover:underline underline-offset-4"
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
