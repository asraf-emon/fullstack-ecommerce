import { useEffect, useState } from "react";
import { formatNumber } from "../../lib/helper";
import { useSelector } from "react-redux";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";

const Stats = () => {
  const [revenueChange, setRevenueChange] = useState({ value: 0, text: "" });

  const {
    totalUsersCount,
    todayRevenue,
    yesterdayRevenue,
    totalRevenueAllTime,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    let change =
      yesterdayRevenue === 0
        ? 100
        : ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;

    setRevenueChange({
      value: change,
      text: `${Math.abs(change).toFixed(1)}% from yesterday`,
    });
  }, [todayRevenue, yesterdayRevenue]);

  const stats = [
    {
      title: "Today's Revenue",
      value: formatNumber(todayRevenue),
      change: revenueChange,
      icon: <DollarSign className="text-teal-600" size={20} />,
      type: "currency",
    },
    {
      title: "Total Users",
      value: totalUsersCount || 0,
      change: null,
      icon: <Users className="text-blue-600" size={20} />,
      type: "count",
    },
    {
      title: "All Time Revenue",
      value: formatNumber(totalRevenueAllTime),
      change: null,
      icon: <Activity className="text-purple-600" size={20} />,
      type: "currency",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            {stat.change && (
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  stat.change.value >= 0
                    ? "bg-teal-50 text-teal-600 border border-teal-100"
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}
              >
                {stat.change.value >= 0 ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {stat.change.text.split(" ")[0]}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
              {stat.title}
            </p>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {stat.value}
            </h2>

            {stat.change && (
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                Compared to{" "}
                <span className="text-slate-500 font-bold">
                  ${formatNumber(yesterdayRevenue)}
                </span>{" "}
                yesterday
              </p>
            )}
            {!stat.change && (
              <p className="text-[11px] text-slate-400 mt-2 font-medium italic">
                Lifetime analytical data
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
