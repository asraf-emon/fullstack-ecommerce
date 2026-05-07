import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const TopProductsChart = () => {
  const { topSellingProducts } = useSelector((state) => state.admin);

  // প্রিমিয়াম ইমেজের জন্য বর্ডার ও শ্যাডো লেয়ারিং
  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <foreignObject x={x - 50} y={y - 20} width={40} height={40}>
        <div className="p-0.5 rounded-full bg-linear-to-tr from-teal-500 to-emerald-300 shadow-sm">
          <img
            src={payload.value}
            alt="product"
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
      </foreignObject>
    );
  };

  // Glassmorphism ইফেক্ট সহ কাস্টম টুলটিপ
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const product = payload[0].payload;
      return (
        <div className="backdrop-blur-md bg-white/90 p-4 rounded-2xl shadow-2xl border border-white/20 min-w-48">
          <p className="text-[10px] font-black text-teal-600 uppercase tracking-tighter mb-1">
            Top Performer
          </p>
          <p className="font-bold text-slate-900 text-sm leading-tight mb-3">
            {product.name}
          </p>
          <div className="flex items-end justify-between border-t border-slate-100 pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Units Sold
            </span>
            <span className="text-lg font-black text-slate-800 leading-none">
              {product.total_sold}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 w-full h-full relative overflow-hidden group">
      {/* ব্যাকগ্রাউন্ডে একটি সূক্ষ্ম গ্রেডিয়েন্ট ব্লোব যা প্রফেশনাল টাচ দেয় */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-50/50 rounded-full blur-3xl group-hover:bg-teal-100/50 transition-colors duration-700" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Market Intelligence
              </h3>
            </div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">
              Best Sellers
            </p>
          </div>
          <button className="text-[10px] font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider">
            View Report
          </button>
        </div>

        <div className="flex-1 min-h-70">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={topSellingProducts?.slice(0, 3)}
              margin={{ top: 0, right: 40, bottom: 0, left: 45 }}
              barSize={38}
            >
              <CartesianGrid
                strokeDasharray="8 8"
                horizontal={false}
                stroke="#f8fafc"
              />

              <XAxis type="number" hide />

              <YAxis
                dataKey="image"
                type="category"
                tick={<CustomYAxisTick />}
                width={60}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(20, 184, 166, 0.03)", radius: 16 }}
                wrapperStyle={{ outline: "none" }}
              />

              <Bar
                dataKey="total_sold"
                radius={[0, 20, 20, 0]}
                animationDuration={1800}
                animationEasing="ease-in-out"
              >
                {topSellingProducts?.slice(0, 3).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#barGradient-${index})`}
                    className="hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </Bar>

              {/* কালার গ্রেডিয়েন্ট যা বারগুলোকে থ্রি-ডি লুক দিবে */}
              <defs>
                <linearGradient id="barGradient-0" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
                <linearGradient id="barGradient-1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#115e59" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
                <linearGradient id="barGradient-2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#99f6e4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TopProductsChart;
