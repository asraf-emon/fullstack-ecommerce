import { Search, Sparkles, Star, Filter, ChevronDown } from "lucide-react";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/Products/Pagination";
import AISearchModal from "../components/Products/AISearchModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../store/slices/productSlice";
import { toggleAIModal } from "../store/slices/popupSlice";

const Products = () => {
  const { products, totalProducts } = useSelector((state) => state.product);

  const uniqueCategories = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchTerm = query.get("search");
  const searchedCategory = query.get("category");

  const [searchQuery, setSearchQuery] = useState(searchTerm || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchedCategory || "",
  );
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        category: selectedCategory,
        price: `${priceRange[0]} - ${priceRange[1]}`,
        search: searchQuery,
        ratings: selectedRating,
        availability: availability,
        page: currentPage,
      }),
    );
  }, [
    dispatch,
    selectedCategory,
    priceRange,
    searchQuery,
    selectedRating,
    availability,
    currentPage,
  ]);

  const totalPages = Math.ceil(totalProducts / 10);

  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden mb-4 p-3 glass-card hover:glow-on-hover flex items-center space-x-2 w-full justify-center"
            >
              <Filter className="w-5 h-5 text-teal-accent" />
              <span>Filters</span>
            </button>

            {/* Sidebar Filters */}
            <div
              className={`lg:block ${isMobileFilterOpen ? "block" : "hidden"} w-full lg:w-80 space-y-6`}
            >
              <div className="glass-card bg-transparent border border-white/5 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-teal-accent" /> Filters
                </h2>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-teal-accent cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-teal-accent text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Category Accordion/Dropdown */}
                <div className="mb-8">
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 group"
                  >
                    <span className="group-hover:text-foreground transition-colors">
                      Category
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`space-y-2 overflow-hidden transition-all duration-300 ${isCategoryOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`w-full p-2.5 text-left text-sm rounded-lg border transition-all ${
                        !selectedCategory
                          ? "bg-primary/20 border-primary/40 text-teal-accent"
                          : "bg-transparent border-white/5 hover:bg-white/5"
                      }`}
                    >
                      All Categories
                    </button>

                    {uniqueCategories.map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full p-2.5 text-left text-sm rounded-lg border transition-all ${
                          selectedCategory === cat
                            ? "bg-primary/20 border-primary/40 text-teal-accent font-medium"
                            : "bg-transparent border-white/5 hover:bg-white/5 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Rating
                  </h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setSelectedRating(
                            selectedRating === rating ? 0 : rating,
                          )
                        }
                        className={`flex items-center space-x-2 w-full p-2.5 rounded-lg border transition-all ${
                          selectedRating === rating
                            ? "bg-primary/20 border-primary/40"
                            : "bg-transparent border-transparent hover:bg-white/5"
                        }`}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-600"}`}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Availability
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {["in-stock", "limited", "out-of-stock"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          setAvailability(availability === status ? "" : status)
                        }
                        className={`w-full p-2.5 text-left text-xs rounded-lg border transition-all ${
                          availability === status
                            ? "bg-primary/20 border-primary/40 text-teal-accent"
                            : "bg-transparent border-white/5 hover:bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {status
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-onyx/50 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:border-teal-accent/50 text-foreground"
                  />
                </div>

                <button
                  className="group relative p-px rounded-xl overflow-hidden transition-all hover:scale-[1.02] w-full sm:w-auto"
                  onClick={() => dispatch(toggleAIModal())}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-teal-accent"></div>
                  <div className="relative px-6 py-3 bg-onyx rounded-[11px] flex items-center justify-center gap-2 group-hover:bg-transparent transition-all">
                    <Sparkles className="w-5 h-5 text-teal-accent group-hover:text-white" />
                    <span className="font-medium text-sm">AI Smart Search</span>
                  </div>
                </button>
              </div>

              {/* Products Grid */}
              {products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="glass-card text-center py-20 bg-transparent">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-medium mb-1">
                    No products found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <AISearchModal />
      </div>
    </>
  );
};

export default Products;
