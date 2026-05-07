import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdateProductModal } from "../store/slices/extraSlice";
import { updateProduct } from "../store/slices/productsSlice";
import {
  LoaderCircle,
  X,
  Edit3,
  Type,
  Layers,
  DollarSign,
  Box,
  Info,
  Save,
} from "lucide-react";

const UpdateProductModal = ({ selectedProduct }) => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const categoryOptions = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Automotive",
    "Kids & Baby",
  ];

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        category: selectedProduct.category || "",
        stock: selectedProduct.stock || "",
      });
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      stock: formData.stock,
    };
    dispatch(updateProduct(data, selectedProduct.id));
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop with Blur Effect */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => dispatch(toggleUpdateProductModal())}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header Section */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Edit3 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                Edit Registry
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Update Asset Information
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleUpdateProductModal())}
            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name/Title Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Asset Name
              </label>
              <div className="relative">
                <Type
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  required
                  placeholder="Product Title"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Classification
              </label>
              <div className="relative">
                <Layers
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <select
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-600 appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  {categoryOptions.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Updated Price ($)
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Stock Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Current Stock
              </label>
              <div className="relative">
                <Box
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  required
                  placeholder="Quantity"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Specifications
              </label>
              <div className="relative">
                <Info
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <textarea
                  required
                  placeholder="Update product details..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-medium min-h-30 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Syncing Changes...
              </>
            ) : (
              <>
                <Save size={18} />
                Commit Updates
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
