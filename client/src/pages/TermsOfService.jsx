import React from "react";
import {
  Scale,
  FileText,
  ShoppingBag,
  Truck,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "April 27, 2026";

  const sections = [
    {
      title: "Agreement to Terms",
      icon: <Scale size={24} className="text-teal-400" />,
      content:
        "By accessing or using ShopMate, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.",
    },
    {
      title: "Accounts & Membership",
      icon: <FileText size={24} className="text-teal-400" />,
      content:
        "When you create an account, you must provide accurate and complete information. You are responsible for maintaining the security of your account and any activities that occur under your credentials.",
    },
    {
      title: "Purchases & Payments",
      icon: <ShoppingBag size={24} className="text-teal-400" />,
      content:
        "All payments are processed securely through Stripe. We reserve the right to refuse or cancel any order for reasons including product availability, errors in description/price, or suspected fraud.",
    },
    {
      title: "Shipping & Delivery",
      icon: <Truck size={24} className="text-teal-400" />,
      content:
        "Delivery times are estimates and not guaranteed. ShopMate is not responsible for delays caused by logistics partners or customs in case of international shipping.",
    },
    {
      title: "Returns & Refunds",
      icon: <RefreshCcw size={24} className="text-teal-400" />,
      content:
        "We offer a 7-day return policy for eligible products. Items must be in original packaging and unused. Digital products or sale items may be non-refundable.",
    },
    {
      title: "Limitation of Liability",
      icon: <AlertCircle size={24} className="text-teal-400" />,
      content:
        "ShopMate shall not be liable for any indirect, incidental, or consequential damages resulting from your use of our website or the purchase of any products.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Terms of <span className="text-teal-400">Service</span>
          </h1>
          <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          <div className="mt-6 h-1 w-24 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-[#1a1d23] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-lg leading-relaxed">
              Welcome to <span className="text-white font-bold">ShopMate</span>.
              These Terms of Service govern your use of our website located at
              yourdomain.com and our services.
            </p>
          </div>

          <div className="grid gap-10">
            {sections.map((section, index) => (
              <div key={index} className="flex gap-6">
                <div className="shrink-0">
                  <div className="p-3 bg-teal-400/10 rounded-2xl border border-teal-400/20">
                    {section.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#0f1115] rounded-2xl border border-dashed border-gray-700">
            <h3 className="text-white font-bold mb-2">Governing Law</h3>
            <p className="text-sm text-gray-500">
              These terms shall be governed by and defined following the laws of
              Bangladesh. ShopMate and yourself irrevocably consent that the
              courts of Bangladesh shall have exclusive jurisdiction to resolve
              any dispute.
            </p>
          </div>
        </div>

        {/* Dynamic Footer Copyright */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
