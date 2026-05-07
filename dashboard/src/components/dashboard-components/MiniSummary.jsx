import {
  Wallet,
  PackageCheck,
  TrendingUp,
  AlertTriangle,
  BarChart4,
  UserPlus,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useSelector } from "react-redux";

const MiniSummary = () => {
  const {
    topSellingProducts,
    lowStockProducts,
    revenueGrowth,
    newUsersThisMonth,
    currentMonthSales,
    orderStatusCounts,
  } = useSelector((state) => state.admin);

  // মোট অর্ডারের সংখ্যা ক্যালকুলেট করা
  const totalOrders = Object.values(orderStatusCounts || {}).reduce(
    (acc, count) => acc + count,
    0,
  );

  const summary = [
    {
      text: "Monthly Revenue",
      value: `৳ ${(currentMonthSales * 122).toLocaleString()}`,
      subText: "Total sales this month",
      icon: <Wallet size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      text: "Total Orders",
      value: totalOrders,
      subText: "Orders placed this month",
      icon: <PackageCheck size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      text: "Top Product",
      value: topSellingProducts[0]?.total_sold || 0,
      subText: topSellingProducts[0]?.name || "No data",
      icon: <TrendingUp size={20} />,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      text: "Stock Alerts",
      value: lowStockProducts?.length || 0,
      subText: "Items running low",
      icon: <AlertTriangle size={20} />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      text: "Growth Rate",
      value: revenueGrowth,
      subText: revenueGrowth.includes("+")
        ? "Better than last month"
        : "Lower than last month",
      icon: <BarChart4 size={20} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      isGrowth: true,
    },
    {
      text: "New Customers",
      value: newUsersThisMonth,
      subText: "Joined in current month",
      icon: <UserPlus size={20} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Quick Insights
        </h3>
        <p className="text-xl font-bold text-slate-800">Monthly Summary</p>
      </div>

      {/* List Items */}
      <div className="grid grid-cols-1 gap-5">
        {summary.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between group cursor-default"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div
                className={`w-11 h-11 ${item.bg} ${item.color} flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110 duration-300`}
              >
                {item.icon}
              </div>

              {/* Text Data */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  {item.text}
                </p>
                <p className="text-[13px] text-slate-500 font-medium">
                  {item.subText}
                </p>
              </div>
            </div>

            {/* Value Display */}
            <div className="text-right">
              <p className="text-base font-black text-slate-800">
                {item.value}
              </p>
              {item.isGrowth && (
                <div
                  className={`flex items-center justify-end text-[10px] font-bold ${revenueGrowth.includes("+") ? "text-teal-500" : "text-red-500"}`}
                >
                  {revenueGrowth.includes("+") ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownLeft size={12} />
                  )}
                  Trend
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniSummary;
