import Header from "./Header";
import MiniSummary from "./dashboard-components/MiniSummary";
import TopSellingProducts from "./dashboard-components/TopSellingProducts";
import Stats from "./dashboard-components/Stats";
import MonthlySalesChart from "./dashboard-components/MonthlySalesChart";
import OrdersChart from "./dashboard-components/OrdersChart";
import TopProductsChart from "./dashboard-components/TopProductsChart";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      {/* মেইন কন্টেইনারে হালকা ব্যাকগ্রাউন্ড দেওয়া হয়েছে যাতে কার্ডগুলো ফুটে ওঠে */}
      <main className="p-4 md:p-6 pl-2.5 md:pl-72 w-full min-h-screen bg-[#f8fafc]">
        <div className="flex-1 max-w-400 mx-auto">
          <Header />

          {/* Page Title Section */}
          <div className="mb-8 mt-4">
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="text-teal-600" size={24} />
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm text-slate-500 font-medium tracking-wide">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats Cards Section */}
          <section className="mb-8">
            <Stats />
          </section>

          {/* Charts Grid - ৩ কলাম লেআউট */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-5 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <MonthlySalesChart />
            </div>

            <div className="bg-white p-5 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <OrdersChart />
            </div>

            <div className="bg-white p-5 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <TopProductsChart />
            </div>
          </div>

          {/* Bottom Section - Tables & Summaries */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 py-8">
            {/* Top Selling Products (Takes 2 columns on large screens) */}
            <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-2">
              <TopSellingProducts />
            </div>

            {/* Mini Summary & Activity */}
            <div className="space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">
                  Quick Summary
                </h3>
                <MiniSummary />
              </div>

              {/* "Recent Activity" can be add*/}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
