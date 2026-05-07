import { useState } from "react";
import { X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar } from "../../store/slices/popupSlice";

const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearchBarOpen } = useSelector((state) => state.popup);

  if (!isSearchBarOpen) return null;

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim() !== "") {
      dispatch(toggleSearchBar());
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col">
      {/* Overlay Background */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/60 transition-opacity cursor-pointer"
        onClick={() => dispatch(toggleSearchBar())}
      />

      {/* Search Container */}
      <div className="relative z-10 animate-slide-in-top p-4 sm:p-10">
        <div className="glass-panel max-w-3xl mx-auto p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">Search Products</h2>
            <button
              onClick={() => dispatch(toggleSearchBar())}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Search Input Box */}
          <form onSubmit={handleSearch} className="relative group">
            <input
              autoFocus
              type="text"
              placeholder="Search for items, brands or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              className="w-full bg-secondary/30 border border-border/50 py-4 pl-14 pr-6 
                         rounded-2xl text-lg text-foreground focus:outline-none 
                         focus:ring-2 focus:ring-primary/50 transition-all
                         placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="absolute left-5 top-1/2 -translate-y-1/2 p-1"
            >
              <Search className="w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </button>
          </form>

          {/* Quick Links */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2 mt-1">
              Popular:
            </span>
            {["Laptop", "Shoes", "Headphones"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                }}
                className="text-xs py-1.5 px-3 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
