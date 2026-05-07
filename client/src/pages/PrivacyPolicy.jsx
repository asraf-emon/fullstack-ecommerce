import React from "react";
import { ShieldCheck, Lock, Eye, Cookie, Mail, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "April 27, 2026";

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye size={24} className="text-teal-400" />,
      content:
        "We collect personal information that you provide to us such as name, address, contact information, passwords, and security data, and payment information (processed securely via Stripe).",
    },
    {
      title: "How We Use Your Information",
      icon: <ShieldCheck size={24} className="text-teal-400" />,
      content:
        "We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you (shipping your orders), compliance with our legal obligations, and/or your consent.",
    },
    {
      title: "AI & Data Processing",
      icon: <Globe size={24} className="text-teal-400" />,
      content:
        "Our 'Smart Search' feature uses Google Gemini API. While we process search queries to provide better results, we do not share your personal identity or sensitive profile data with third-party AI models.",
    },
    {
      title: "Cookies & Tracking",
      icon: <Cookie size={24} className="text-teal-400" />,
      content:
        "We use cookies and similar tracking technologies (like local storage) to access or store information. This helps us remember your preferences and keep your shopping cart updated.",
    },
    {
      title: "Data Security",
      icon: <Lock size={24} className="text-teal-400" />,
      content:
        "We aim to protect your personal information through a system of organizational and technical security measures. However, please remember that no method of transmission over the internet is 100% secure.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Privacy <span className="text-teal-400">Policy</span>
          </h1>
          <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          <div className="mt-6 h-1 w-24 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-[#1a1d23] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">
          <p className="mb-10 text-lg leading-relaxed italic">
            At <span className="text-white font-bold">ShopMate</span>,
            accessible from our website, one of our main priorities is the
            privacy of our visitors. This Privacy Policy document contains types
            of information that is collected and recorded by ShopMate and how we
            use it.
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-teal-400/10 rounded-xl group-hover:bg-teal-400/20 transition-colors">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-400 leading-relaxed pl-14">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-12 border-gray-800" />

          {/* Contact Section */}
          <div className="text-center bg-[#0f1115] p-8 rounded-2xl border border-gray-800">
            <Mail className="mx-auto mb-4 text-teal-400" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Contact Us</h3>
            <p className="text-gray-400 mb-4">
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us.
            </p>
            <p className="text-teal-400 font-medium">privacy@shopmate.com</p>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
