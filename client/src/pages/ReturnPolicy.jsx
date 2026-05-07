import React from "react";
import {
  RefreshCcw,
  ShieldCheck,
  Clock,
  Truck,
  Mail,
  AlertTriangle,
  Info,
} from "lucide-react";

const ReturnPolicy = () => {
  const policies = [
    {
      icon: <Clock size={20} className="text-teal-400" />,
      title: "Return Period",
      desc: "7 days from the delivery date to initiate a return request.",
    },
    {
      icon: <ShieldCheck size={20} className="text-teal-400" />,
      title: "Item Condition",
      desc: "Must be unused, unwashed, with all original tags and packaging.",
    },
    {
      icon: <RefreshCcw size={20} className="text-teal-400" />,
      title: "Refund Process",
      desc: "Processed within 5-7 working days after approval.",
    },
    {
      icon: <Truck size={20} className="text-teal-400" />,
      title: "Shipping Cost",
      desc: "Free returns for defective items; fee applies for size/mind change.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <RefreshCcw size={48} className="mx-auto mb-4 text-teal-400" />
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Return & <span className="text-teal-400">Refund Policy</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto font-medium">
            At ShopMate, we want to ensure your shopping experience is
            transparent and hassle-free.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#1a1d23] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Policy Overview Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Info size={24} className="text-teal-400" /> General Terms
            </h2>
            <p className="leading-relaxed text-gray-400">
              We understand that sometimes an item may not be quite right. To
              maintain fairness for everyone, we've outlined our return
              criteria. Our policy lasts
              <span className="text-white font-semibold"> 7 days</span>. If 7
              days have gone by since your delivery, we unfortunately can't
              offer you a refund or exchange.
            </p>
          </section>

          {/* Quick Info Grid - Four Essential Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {policies.map((item, index) => (
              <div
                key={index}
                className="bg-[#0f1115] p-6 rounded-2xl border border-gray-800 hover:border-teal-400/30 transition-all duration-300 group flex items-start gap-4 shadow-inner"
              >
                <div className="bg-[#1a1d23] p-3 rounded-xl group-hover:bg-teal-400/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 text-base group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Warning Section - Non-Returnable Items */}
          <div className="mb-12 p-6 bg-red-400/5 border border-red-400/20 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="text-red-400 shrink-0 mt-1" size={22} />
            <div>
              <h3 className="text-white font-bold mb-1">
                Items Excluded from Returns
              </h3>
              <p className="text-sm text-gray-400">
                For hygiene and safety, innerwear, lingerie, and items marked as
                <span className="text-red-300 font-medium">
                  {" "}
                  "Final Sale"{" "}
                </span>{" "}
                or "Clearance" cannot be returned. We recommend reviewing size
                charts before purchase.
              </p>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="p-6 bg-teal-400/5 border border-teal-400/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold mb-1 flex items-center gap-2 justify-center md:justify-start leading-tight">
                <Mail size={18} className="text-teal-400" /> Start a Return
                Request
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Provide your Order ID and product images. Our team replies
                within 24 hours.
              </p>
            </div>
            <div className="text-teal-400 font-mono font-bold bg-[#0f1115] px-6 py-3 rounded-xl border border-gray-800 text-lg shadow-inner">
              support@shopmate.com
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 font-medium tracking-tight">
          <p>
            &copy; {new Date().getFullYear()} ShopMate. Moving with Excellence.
          </p>
          <p className="mt-1">Last Updated: May 2026</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
