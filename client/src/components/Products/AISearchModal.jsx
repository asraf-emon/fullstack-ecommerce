import React, { useState } from "react";
import { X, Search, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductWithAI } from "./../../store/slices/productSlice";
import { toggleAIModal } from "../../store/slices/popupSlice";

const AISearchModal = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const dispatch = useDispatch();

  const { aiSearching } = useSelector((state) => state.product);
  const { isAIPopupOpen } = useSelector((state) => state.popup);

  const exampleText = [
    "Best suitable electronic products",
    "Leather jackets for men",
    "Toys for baby",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    dispatch(fetchProductWithAI(userPrompt));
  };

  if (!isAIPopupOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-150 flex items-center justify-center p-4 transition-all duration-300"
      onClick={() => dispatch(toggleAIModal())}
    >
      <div
        className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-2xl shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                AI Product Search
              </h2>
              <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                Beta v1.0
              </span>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleAIModal())}
            className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <p className="text-white/60 mb-8 text-lg">
          Describe what you're looking for and our AI will find the perfect
          products for you.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="e.g., 'A wireless headphone for gaming with good bass'"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full pl-14 pr-5 py-5 bg-white/3 border border-white/10 rounded-2xl focus:outline-none 
              focus:ring-2 focus:ring-purple-500/50 text-white placeholder-white/20 text-lg transition-all"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={aiSearching || !userPrompt.trim()}
            className={`w-full py-5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-2xl 
              font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all active:scale-[0.98]
              disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-3`}
          >
            {aiSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="animate-pulse">AI doing magic...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Search with AI</span>
              </>
            )}
          </button>
        </form>

        {/* Example Queries */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-sm text-white/30 mb-4 font-medium italic">
            Try these examples:
          </p>
          <div className="flex flex-wrap gap-3">
            {exampleText.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setUserPrompt(example)}
                className="px-4 py-2 bg-white/5 text-white/60 rounded-xl text-sm border border-white/5 
                hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;
