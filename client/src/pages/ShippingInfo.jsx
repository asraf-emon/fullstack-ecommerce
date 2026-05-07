import React from "react";
import {
  Truck,
  Info,
  MapPin,
  Clock,
  Globe,
  Mail,
  Box,
  ShieldCheck,
} from "lucide-react";

const ShippingInfo = () => {
  const shippingMethods = [
    {
      title: "Standard Delivery",
      icon: <Clock size={20} className="text-teal-400" />,
      description:
        "Inside Dhaka: 2-3 working days. Outside Dhaka: 3-5 working days. We ensure the fastest possible dispatch.",
    },
    {
      title: "Shipping Charges",
      icon: <Truck size={20} className="text-teal-400" />,
      description:
        "BDT 60 for delivery inside Dhaka and BDT 120 for outside Dhaka. Enjoy Free Shipping on orders over BDT 2000.",
    },
    {
      title: "Order Tracking",
      icon: <MapPin size={20} className="text-teal-400" />,
      description:
        "Get real-time updates! Once your order is shipped, you'll receive a tracking ID via SMS and Email.",
    },
    {
      title: "Secure Packaging",
      icon: <ShieldCheck size={20} className="text-teal-400" />,
      description:
        "All items are double-checked and packed securely in eco-friendly boxes to ensure they reach you in perfect condition.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Truck size={48} className="mx-auto mb-4 text-teal-400" />
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Shipping <span className="text-teal-400">Information</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto font-medium">
            Reliable delivery across Bangladesh. We bring ShopMate right to your
            doorstep.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#1a1d23] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Logistics Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Info size={24} className="text-teal-400" /> Delivery Overview
            </h2>
            <p className="leading-relaxed text-gray-400">
              At <span className="text-white font-semibold">ShopMate</span>, we
              have partnered with the most reliable courier services in the
              country to provide a seamless shopping experience. Whether you're
              in the heart of Dhaka or in a remote area, we've got you covered.
            </p>
          </section>

          {/* Shipping Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {shippingMethods.map((method, index) => (
              <div
                key={index}
                className="bg-[#0f1115] p-6 rounded-2xl border border-gray-800 hover:border-teal-400/30 transition-all duration-300 group flex items-start gap-4 shadow-inner"
              >
                <div className="bg-[#1a1d23] p-3 rounded-xl group-hover:bg-teal-400/10 transition-colors">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Area Section */}
          <div className="mb-12 p-6 bg-teal-400/5 border border-teal-400/20 rounded-2xl flex items-start gap-4">
            <Globe className="text-teal-400 shrink-0 mt-1" size={22} />
            <div>
              <h3 className="text-white font-bold mb-1">Service Area</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We currently deliver only within{" "}
                <span className="text-white font-medium">Bangladesh</span>.
                International shipping is not available at this moment, but stay
                tuned for future updates!
              </p>
            </div>
          </div>

          {/* Tracking / Support Section */}
          <div className="p-6 bg-teal-400/5 border border-teal-400/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold mb-1 flex items-center gap-2 justify-center md:justify-start">
                <Box size={18} className="text-teal-400" /> Track your package?
              </h3>
              <p className="text-sm text-gray-400">
                Check your SMS for the tracking link or reach out to us.
              </p>
            </div>
            <div className="text-teal-400 font-mono font-bold bg-[#0f1115] px-6 py-3 rounded-xl border border-gray-800 text-lg shadow-inner">
              shipping@shopmate.com
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 font-medium">
          <p>
            &copy; {new Date().getFullYear()} ShopMate. Moving with Excellence.
          </p>
          <p className="mt-1 italic">Quality Guaranteed Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
