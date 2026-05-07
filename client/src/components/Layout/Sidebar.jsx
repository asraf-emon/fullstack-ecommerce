import {
  X,
  Home,
  Package,
  Info,
  HelpCircle,
  ShoppingCart,
  Newspaper,
  Briefcase,
  List,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/popupSlice";

const Sidebar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "About", icon: Info, path: "/about" },
    { name: "FAQ", icon: HelpCircle, path: "/faq" },
    { name: "Blog", icon: Newspaper, path: "/blog" },
    { name: "Careers", icon: Briefcase, path: "/careers" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "Cart", icon: ShoppingCart, path: "/cart" },

    ...(authUser ? [{ name: "My Orders", icon: List, path: "/orders" }] : []),
  ];

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 sm:w-80 z-50 glass-panel animate-slide-in-left shadow-2xl overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between p-6 border-b border-border/50 sticky top-0 glass-panel z-10">
          <h2 className="text-xl font-bold text-primary tracking-tight">
            Menu
          </h2>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-secondary text-foreground transition-colors"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center space-x-4 p-3.5 rounded-xl transition-all duration-300
                             bg-secondary/10 border border-white/5 dark:border-white/10 
                             hover:bg-primary/20 hover:border-primary/30 
                             text-foreground hover:text-primary group shadow-sm"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium tracking-wide">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
