import { useEffect, useState } from "react";

import { X, LogOut, Upload, Eye, EyeOff } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  logout,
  updatePassword,
  updateProfile,
} from "../../store/slices/authSlice";

import { toggleAuthPopup } from "../../store/slices/popupSlice";

const ProfilePanel = () => {
  const dispatch = useDispatch();

  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const { authUser, isUpdatingProfile, isUpdatingPassword } = useSelector(
    (state) => state.auth,
  );

  const [name, setName] = useState(authUser?.name || "");

  const [email, setEmail] = useState(authUser?.email || "");

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");

      setEmail(authUser.email || "");
    }
  }, [authUser]);

  // Password States

  const [showPassword, setShowPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const handleUpdatePassword = () => {
    const formData = new FormData();

    formData.append("currentPassword", currentPassword);

    formData.append("newPassword", newPassword);

    formData.append("confirmNewPassword", confirmNewPassword);

    dispatch(updatePassword(formData));
  };

  if (!isAuthPopupOpen || !authUser) return null;

  return (
    <>
      {/* Background Overlay */}

      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 transition-opacity duration-300"
        onClick={() => dispatch(toggleAuthPopup())}
      />

      {/* Profile Panel Container */}

      <div className="fixed right-0 top-0 h-full w-full sm:w-105 z-110 bg-[#121212] border-l border-white/10 flex flex-col shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Header Section */}

        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-onyx">
          <h2 className="text-xl font-bold text-primary tracking-tight">
            Profile Settings
          </h2>

          <button
            onClick={() => dispatch(toggleAuthPopup())}
            className="p-2 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8">
          {/* Profile Header / Info */}

          <div className="text-center">
            <div className="relative inline-block group">
              <img
                src={authUser?.avatar?.url || "/avatar-holder.avif"}
                alt={authUser?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary object-cover shadow-lg transition-transform group-hover:scale-105 duration-300"
              />

              <label className="absolute bottom-4 right-0 bg-primary p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-all">
                <Upload className="w-4 h-4 text-white" />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <h3 className="text-xl font-bold text-white mt-2">
              {authUser?.name}
            </h3>

            <p className="text-white/40 text-sm">{authUser?.email}</p>
          </div>

          {/* Update Profile Form */}

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest">
              Update Information
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/5 bg-white/5 text-white focus:border-primary outline-none transition-all"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/5 bg-white/5 text-white focus:border-primary outline-none transition-all"
              />

              <button
                onClick={handleUpdateProfile}
                disabled={isUpdatingProfile}
                className="w-full py-3.5 bg-primary text-white rounded-xl font-bold glow-on-hover transition-all active:scale-95 disabled:opacity-50"
              >
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Update Password Form */}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">
                Security
              </h3>

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-white/40 flex items-center gap-1 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}

                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="space-y-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/5 bg-white/5 text-white focus:border-primary outline-none transition-all"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/5 bg-white/5 text-white focus:border-primary outline-none transition-all"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmNewPassword} // Fixed variable
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/5 bg-white/5 text-white focus:border-primary outline-none transition-all"
              />

              <button
                onClick={handleUpdatePassword}
                disabled={isUpdatingPassword}
                className="w-full py-3.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>

          {/* Logout Section */}

          <button
            onClick={handleLogout}
            className="w-full mt-6 flex items-center justify-center space-x-3 p-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold"
          >
            <LogOut className="w-5 h-5" />

            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
