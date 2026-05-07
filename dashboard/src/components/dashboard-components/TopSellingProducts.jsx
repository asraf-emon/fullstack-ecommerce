import { useSelector } from "react-redux";
import { Star } from "lucide-react"; // আইকন ব্যবহারের জন্য লুব্রেরিটি ইনস্টল করা থাকতে হবে

const TopSellingProducts = () => {
  const { topSellingProducts } = useSelector((state) => state.admin);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden xl:col-span-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Performance
          </h3>
          <p className="text-xl font-bold text-slate-800">
            Top Selling Products
          </p>
        </div>
        <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          Last 30 Days
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="px-4 py-3 font-black">Product</th>
              <th className="px-4 py-3 font-black">Category</th>
              <th className="px-4 py-3 font-black text-center">Total Sold</th>
              <th className="px-4 py-3 font-black text-right">Rating</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts && topSellingProducts.length > 0 ? (
              topSellingProducts.map((product, index) => (
                <tr
                  key={index}
                  className="group hover:bg-slate-50/80 transition-all duration-300"
                >
                  {/* Product & Image */}
                  <td className="px-4 py-3 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-transparent group-hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                          {index + 1}
                        </div>
                      </div>
                      <span className="font-bold text-slate-700 text-sm truncate max-w-37.5">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* Category Badge */}
                  <td className="px-4 py-3 border-y border-transparent group-hover:border-slate-100">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold rounded-lg uppercase tracking-tight">
                      {product.category}
                    </span>
                  </td>

                  {/* Total Sold */}
                  <td className="px-4 py-3 text-center border-y border-transparent group-hover:border-slate-100">
                    <span className="text-sm font-black text-slate-800 bg-teal-50 px-3 py-1 rounded-full">
                      {product.total_sold}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="px-4 py-3 text-right first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-transparent group-hover:border-slate-100">
                    <div className="flex items-center justify-end gap-1 text-yellow-500 font-black text-sm">
                      <Star size={14} fill="currentColor" />
                      {product.ratings}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center text-slate-400 font-medium italic"
                >
                  No data available found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
