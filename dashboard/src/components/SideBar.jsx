import { useState } from "react";
import {
  LayoutDashboard,
  ListOrdered,
  Package,
  Users,
  User,
  LogOut,
  MoveLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { toggleComponent, toggleNavbar } from "../store/slices/extraSlice";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(0);

  // প্রতিটি লিঙ্কের জন্য একটি ইউনিক id যোগ করা হয়েছে
  const links = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
    },
    {
      id: "orders",
      icon: <ListOrdered size={20} />,
      title: "Orders",
    },
    {
      id: "products",
      icon: <Package size={20} />,
      title: "Products",
    },
    {
      id: "users",
      icon: <Users size={20} />,
      title: "Users",
    },
    {
      id: "profile",
      icon: <User size={20} />,
      title: "Profile",
    },
  ];

  const { isNavbarOpened } = useSelector((state) => state.extra);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <aside
        className={`${
          isNavbarOpened ? "left-2.5" : "-left-full"
        } fixed w-64 h-[97.5%] rounded-xl bg-white z-20 mt-2.5 transition-all duration-300 shadow-xl p-4 space-y-4 flex flex-col justify-between md:left-2.5`}
      >
        <nav className="space-y-2">
          <div className="flex flex-col gap-2 py-2">
            <h2 className="flex items-center justify-between text-xl font-bold text-slate-800">
              <span>Admin Panel</span>
              <MoveLeft
                className="block md:hidden cursor-pointer text-teal-600 hover:scale-110 transition-transform"
                onClick={() => dispatch(toggleNavbar())}
              />
            </h2>
            <hr className="border-gray-100" />
          </div>

          {links.map((item, index) => (
            <button
              // এখানে key হিসেবে item.id ব্যবহার করা হয়েছে
              key={item.id}
              onClick={() => {
                setActiveLink(index);
                dispatch(toggleComponent(item.title));
                // মোবাইল ভিউতে মেনু ক্লিক করলে নেভবার বন্ধ হবে
                if (window.innerWidth < 768) dispatch(toggleNavbar());
              }}
              className={`${
                activeLink === index
                  ? "bg-teal-600 text-white shadow-md shadow-teal-100"
                  : "text-slate-600 hover:bg-teal-50 hover:text-teal-600"
              } w-full transition-all duration-200 rounded-lg cursor-pointer px-3 py-2.5 flex items-center gap-3 font-medium border-none outline-none`}
            >
              {/* আইকনের কালার কন্ডিশনাল রাখা হয়েছে */}
              <span
                className={
                  activeLink === index ? "text-white" : "text-teal-600"
                }
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.title}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="text-white rounded-lg cursor-pointer flex items-center justify-center px-3 py-3 gap-2 bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-100 font-semibold text-sm active:scale-95"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* মোবাইল ভিউতে নেভবার খোলা থাকলে বাইরের অংশে ক্লিক করলে বন্ধ হবে */}
      {isNavbarOpened && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden transition-opacity"
          onClick={() => dispatch(toggleNavbar())}
        />
      )}
    </>
  );
};

export default SideBar;
