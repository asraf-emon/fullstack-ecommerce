import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoaderCircle,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Package,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
  X,
} from "lucide-react";

import Header from "./Header";
import CreateProductModal from "../modals/CreateProductModal";
import UpdateProductModal from "../modals/UpdateProductModal";
import ViewProductModal from "../modals/ViewProductModal";
import {
  toggleCreateProductModal,
  toggleUpdateProductModal,
  toggleViewProductModal,
} from "../store/slices/extraSlice";
import { deleteProduct, fetchAllProducts } from "../store/slices/productsSlice";

const Products = () => {
  const dispatch = useDispatch();

  // Redux States
  const {
    isViewProductModalOpened,
    isCreateProductModalOpened,
    isUpdateProductModalOpened,
  } = useSelector((state) => state.extra);
  const { loading, products, totalProducts, fetchingProducts } = useSelector(
    (state) => state.product,
  );

  // Local States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetching Data
  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  // Pagination Logic
  useEffect(() => {
    if (totalProducts !== undefined) {
      const newMax = Math.ceil(totalProducts / 10);
      setMaxPage(newMax || 1);
    }
  }, [totalProducts]);

  // Unique Categories list from products
  const categories = ["All", ...new Set(products?.map((p) => p.category))];

  // Filtering Logic
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <main className="p-4 md:p-6 pl-2.5 md:pl-72 w-full min-h-screen bg-[#f8fafc]">
        <Header />

        {/* Dashboard Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-8 gap-6">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              System Inventory
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Audit and manage the global product registry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Quick Stats Card */}
            <div className="hidden sm:flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Active Stock
                </p>
                <p className="text-lg font-black text-slate-800 leading-none">
                  {totalProducts || 0}
                </p>
              </div>
            </div>

            {/* Dynamic Search */}
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl shadow-sm focus-within:border-teal-500 transition-all min-w-60">
              <Search size={18} className="absolute left-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full pl-11 pr-10 py-2.5 text-sm outline-none text-slate-600 font-medium bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 p-1 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 shadow-sm hover:border-teal-500 transition-all">
              <Filter size={18} className="text-slate-400 mr-2" />
              <select
                className="py-2.5 bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => dispatch(toggleCreateProductModal())}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-100 active:scale-95"
            >
              <Plus size={20} />
              <span className="hidden sm:inline font-black text-xs uppercase tracking-widest">
                Register Item
              </span>
            </button>
          </div>
        </div>

        {/* Data Grid Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {fetchingProducts ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="w-12 h-12 border-4 border-teal-50 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-teal-600 font-black text-xs uppercase tracking-widest animate-pulse">
                Syncing Database...
              </p>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Registry Item
                    </th>
                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Class
                    </th>
                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Valuation
                    </th>
                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Inventory Status
                    </th>
                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Rating
                    </th>
                    <th className="py-5 px-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="group hover:bg-teal-50/20 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        dispatch(toggleViewProductModal());
                      }}
                    >
                      <td className="py-4 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 bg-white p-1 shadow-sm shrink-0">
                            <img
                              src={product.images[0]?.url}
                              alt=""
                              className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">
                              {product.id?.slice(-12)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-black text-teal-600 text-sm">
                          ${product.price}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${product.stock < 10 ? "bg-orange-500" : "bg-teal-500"}`}
                          />
                          <span
                            className={`text-xs font-bold ${product.stock < 10 ? "text-orange-500" : "text-slate-700"}`}
                          >
                            {product.stock} Units
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={14} fill="currentColor" />
                          <span className="font-black text-xs text-slate-800">
                            {product.ratings}
                          </span>
                        </div>
                      </td>
                      <td
                        className="py-4 px-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              dispatch(toggleViewProductModal());
                            }}
                            className="p-2 text-slate-300 hover:text-teal-600 transition-all"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              dispatch(toggleUpdateProductModal());
                            }}
                            className="p-2 text-slate-300 hover:text-blue-600 transition-all"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              dispatch(deleteProduct(product.id, page));
                            }}
                            className="p-2 text-slate-300 hover:text-red-500 transition-all"
                          >
                            {loading && selectedProduct?.id === product.id ? (
                              <LoaderCircle
                                size={18}
                                className="animate-spin text-red-500"
                              />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[2.5rem]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Package size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 italic">
                No Matching Records
              </h3>
              <p className="text-slate-400 text-sm font-medium">
                Verify your search query or filter parameters.
              </p>
            </div>
          )}

          {/* Pagination Footer with Chevron Icons */}
          {!fetchingProducts && products?.length > 0 && (
            <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Page {page} of {maxPage}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 pl-3 pr-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={maxPage === page}
                  className="flex items-center gap-1 pl-5 pr-3 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 disabled:opacity-30 transition-all shadow-lg shadow-teal-100"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {isCreateProductModalOpened && <CreateProductModal />}
      {isUpdateProductModalOpened && (
        <UpdateProductModal selectedProduct={selectedProduct} />
      )}
      {isViewProductModalOpened && (
        <ViewProductModal selectedProduct={selectedProduct} />
      )}
    </>
  );
};

export default Products;
