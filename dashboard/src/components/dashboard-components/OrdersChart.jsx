import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const OrdersChart = () => {
  const { orderStatusCounts } = useSelector((state) => state.admin);

  // আপনার ব্র্যান্ডিং অনুযায়ী কালার প্যালেট আপডেট করা হয়েছে
  const statusColors = {
    Processing: "#14b8a6", // আপনার প্রিয় Teal কালার
    Shipped: "#3b82f6", // Blue
    Delivered: "#22c55e", // Green
    Cancelled: "#ef4444", // Red
  };

  const orderStatusData = Object.keys(orderStatusCounts || {}).map(
    (status) => ({
      status,
      count: parseInt(orderStatusCounts[status]) || 0,
    }),
  );

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Distribution
          </h3>
          <p className="text-xl font-bold text-slate-800">Order Status</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={orderStatusData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={60} // Donut chart লুক দেওয়ার জন্য ইনার রেডিয়াস যোগ করা হয়েছে
            outerRadius={80}
            paddingAngle={5} // স্লাইসগুলোর মধ্যে গ্যাপ তৈরি করার জন্য
            stroke="none"
          >
            {orderStatusData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={statusColors[entry.status] || "#cbd5e1"}
                className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
              />
            ))}
          </Pie>

          {/* আপনার কাস্টম টুলটিপ ডিজাইন */}
          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              padding: "12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />

          {/* লিজেন্ড যোগ করা হয়েছে যাতে স্ট্যাটাসগুলো সহজে বোঝা যায় */}
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs font-bold text-slate-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
