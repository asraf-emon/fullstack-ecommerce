import { useDispatch } from "react-redux";
import { toggleViewProductModal } from "../store/slices/extraSlice";
import {
  X,
  Tag,
  Star,
  Box,
  Calendar,
  DollarSign,
  Fingerprint,
  Info,
  Package,
  Layers,
} from "lucide-react";

const ViewProductModal = ({ selectedProduct }) => {
  const dispatch = useDispatch();

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={() => dispatch(toggleViewProductModal())}
      ></div>

      {/* Modal Box */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => dispatch(toggleViewProductModal())}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col gap-4 overflow-y-auto border-r border-slate-100">
          <div className="aspect-square rounded-4xl overflow-hidden border border-slate-200 bg-white shadow-inner">
            <img
              src={selectedProduct.images[0]?.url}
              alt="Main Product"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {selectedProduct.images.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  src={img?.url}
                  alt={`View ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Content Area */}
        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-600 rounded-lg border border-teal-100">
                <Tag size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-black text-slate-700">
                  {selectedProduct.ratings}
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
              {selectedProduct.name || selectedProduct.title}
            </h2>
          </div>

          <div className="space-y-6">
            {/* Price & Stock Section with Box Icon */}
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Price
                  </p>
                  <p className="text-xl font-black text-slate-800 leading-none">
                    ${selectedProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Inventory
                  </p>
                  <p
                    className={`text-sm font-black ${selectedProduct.stock > 0 ? "text-teal-500" : "text-red-500"}`}
                  >
                    {selectedProduct.stock > 0
                      ? `${selectedProduct.stock} Units`
                      : "Empty"}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-white ${selectedProduct.stock > 0 ? "text-teal-500" : "text-red-500"}`}
                >
                  <Box size={20} />
                </div>
              </div>
            </div>

            {/* Technical Information Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Product UID */}
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Registry UID
                  </p>
                  <p className="text-sm font-mono text-slate-600 font-bold">
                    {selectedProduct.id}
                  </p>
                </div>
              </div>

              {/* Classification with Layers Icon */}
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Category Type
                  </p>
                  <p className="text-sm text-slate-600 font-bold">
                    {selectedProduct.category}
                  </p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Record Date
                  </p>
                  <p className="text-sm text-slate-600 font-bold">
                    {new Date(selectedProduct.created_at).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-teal-50/30 border border-teal-50">
                <div className="w-10 h-10 rounded-xl bg-white text-teal-600 flex items-center justify-center shrink-0 shadow-sm">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                    Overview
                  </p>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mt-1">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-300">
              <Package size={14} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                Inventory Asset
              </span>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Verified Record
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
