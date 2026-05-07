import { useSelector } from "react-redux";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { getLastNMonths } from "../../lib/helper";

const MonthlySalesChart = () => {
  const { monthlySales } = useSelector((state) => state.admin);

  const months = getLastNMonths(4).map((m) => m.month);

  const chartData = months.map((m) => {
    const found = monthlySales?.find(
      (item) => String(item.month || "").trim() === String(m || "").trim(),
    );

    return {
      month: m,

      totalSales: Number(
        found?.totalSales || found?.total_sales || found?.total || 0,
      ),
    };
  });

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Revenue Flow
          </h3>
          <p className="text-xl font-bold text-slate-800">
            Monthly Sales Analytics
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black rounded-full uppercase border border-teal-100">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
          Live Stats
        </div>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            domain={[0, "auto"]}
            tickFormatter={(value) =>
              value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
            }
          />

          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              padding: "12px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            cursor={{
              stroke: "#14b8a6",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />

          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#14b8a6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
            dot={{ r: 4, fill: "#14b8a6", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#14b8a6" }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
