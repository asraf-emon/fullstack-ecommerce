import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../store/slices/productsSlice";
import { toggleCreateProductModal } from "../store/slices/extraSlice";
import {
  LoaderCircle,
  X,
  ImagePlus,
  ShoppingBag,
  Layers,
  DollarSign,
  Box,
  Type,
} from "lucide-react";

const CreateProductModal = () => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    stock: "",
    images: [],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    dispatch(createNewProduct(data));
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => dispatch(toggleCreateProductModal())}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-100">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                New Inventory Item
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Product Registration
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleCreateProductModal())}
            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Product Title
              </label>
              <div className="relative">
                <Type
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Headphones"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Category */}
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-600 appearance-none cursor-pointer"
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

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Unit Price ($)
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Initial Stock
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                Product Details
              </label>
              <textarea
                required
                placeholder="Write a brief description about the product features..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-medium min-h-25 resize-none"
              />
            </div>

            {/* Image Upload Area */}
            <div className="md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1 block mb-1.5">
                Product Visuals
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-4xl hover:bg-teal-50 hover:border-teal-200 transition-all cursor-pointer group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-teal-600">
                  <ImagePlus size={28} className="mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">
                    {formData.images.length > 0
                      ? `${formData.images.length} Files Selected`
                      : "Drop or Click to Upload"}
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: Array.from(e.target.files),
                    })
                  }
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-teal-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              "Deploy to Inventory"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
