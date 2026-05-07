import { useState, useEffect } from "react";
import defaultAvatar from "../assets/avatar.jpg"; // ডিফল্ট ইমেজের নাম পরিবর্তন করা হয়েছে কনফ্লিক্ট এড়াতে
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminPassword,
  updateAdminProfile,
} from "../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // স্টেট ম্যানেজমেন্ট
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  const [selectedFile, setSelectedFile] = useState(null); // আপলোডের জন্য ফাইল স্টেট
  const [avatarPreview, setAvatarPreview] = useState(""); // স্ক্রিনে দেখানোর জন্য প্রিভিউ
  const [updatingSection, setUpdatingSection] = useState(""); // কোন সেকশন লোড হচ্ছে তা ট্র্যাকিং

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // মাউন্ট হওয়ার সময় বা ইউজার ডেটা আপডেট হলে ইনপুট ফিল্ড পপুলেট করা
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        email: user.email || "",
      });
      setAvatarPreview(user?.avatar?.url || defaultAvatar);
    }
  }, [user]);

  // ইমেজ চেঞ্জ হ্যান্ডলার (প্রিভিউ সহ)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // প্রোফাইল আপডেট ফাংশন
  const updateProfile = () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    setUpdatingSection("Profile");
    dispatch(updateAdminProfile(formData));
  };

  // পাসওয়ার্ড আপডেট ফাংশন
  const updatePassword = () => {
    const formData = new FormData();
    formData.append("currentPassword", passwordData.currentPassword);
    formData.append("newPassword", passwordData.newPassword);
    formData.append("confirmNewPassword", passwordData.confirmNewPassword);
    setUpdatingSection("Password");
    dispatch(updateAdminPassword(formData));
  };

  return (
    <>
      <main className="p-2.5 pl-2.5 md:pl-68 w-full min-h-screen bg-white">
        {/* Header Section */}
        <div className="flex-1 md:p-6 pb-0">
          <Header />
          <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
          <p className="text-sm text-gray-500 mb-6">
            Manage your account settings and profile information.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl md:px-6 py-4">
          {/* Profile Overview Card */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="relative">
              <img
                src={avatarPreview || defaultAvatar}
                alt="Admin Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-teal-50"
                loading="lazy"
              />
              <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl font-bold text-slate-800">
                {user?.name || "Admin Name"}
              </p>
              <p className="text-md text-gray-600">
                {user?.email || "admin@example.com"}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold uppercase rounded-full">
                {user?.role || "Admin"}
              </span>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {/* Update Profile Form */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-slate-700">
                Update Personal Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleProfileChange}
                    className="p-2.5 border border-gray-300 rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleProfileChange}
                    className="p-2.5 border border-gray-300 rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                  <label className="text-xs font-medium text-gray-500 ml-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg bg-white
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-l-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-teal-600 file:text-white
                      hover:file:bg-teal-700 cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={updateProfile}
                disabled={loading}
                className="w-full md:w-auto flex justify-center items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 mt-6 transition-all shadow-md shadow-teal-100 disabled:bg-gray-400"
              >
                {loading && updatingSection === "Profile" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  "Save Profile Changes"
                )}
              </button>
            </div>

            {/* Update Password Form */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-slate-700">
                Security & Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="p-2.5 border border-gray-300 rounded-lg outline-none focus:border-teal-500 bg-white"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="p-2.5 border border-gray-300 rounded-lg outline-none focus:border-teal-500 bg-white"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="p-2.5 border border-gray-300 rounded-lg outline-none focus:border-teal-500 bg-white"
                  placeholder="Confirm New Password"
                />
              </div>

              <button
                onClick={updatePassword}
                disabled={loading}
                className="w-full md:w-auto flex justify-center items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-8 mt-6 transition-all shadow-md disabled:bg-gray-400"
              >
                {loading && updatingSection === "Password" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
