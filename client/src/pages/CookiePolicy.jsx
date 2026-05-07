import React from "react";
import { Cookie, Info, Settings, ShieldCheck, Zap } from "lucide-react";

const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: <ShieldCheck size={20} className="text-teal-400" />,
      description:
        "These are necessary for the website to function properly, such as keeping you logged in and remembering your shopping cart items.",
    },
    {
      title: "Performance & Analytics",
      icon: <Zap size={20} className="text-teal-400" />,
      description:
        "We use these to understand how visitors interact with ShopMate, helping us improve speed and user experience.",
    },
    {
      title: "Preferences",
      icon: <Settings size={20} className="text-teal-400" />,
      description:
        "These allow our site to remember choices you make (like your preferred theme or currency) to provide a personalized experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Cookie size={48} className="mx-auto mb-4 text-teal-400" />
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Cookie <span className="text-teal-400">Policy</span>
          </h1>
          <p className="text-gray-500">
            How we use cookies to improve your ShopMate experience.
          </p>
        </div>

        <div className="bg-[#1a1d23] border border-gray-800 rounded-3xl p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Info size={24} className="text-teal-400" /> What are Cookies?
            </h2>
            <p className="leading-relaxed">
              Cookies are small text files or data stored in your browser
              (including local storage) that help us recognize you when you
              return to ShopMate. They make your shopping experience smoother by
              remembering your preferences.
            </p>
          </section>

          <div className="grid gap-6 mb-12">
            {cookieTypes.map((type, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 bg-[#0f1115] border border-gray-800 rounded-2xl"
              >
                <div className="mt-1">{type.icon}</div>
                <div>
                  <h3 className="font-bold text-white">{type.title}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-teal-400/5 border border-teal-400/20 rounded-2xl">
            <h3 className="text-white font-bold mb-2">
              How to Manage Cookies?
            </h3>
            <p className="text-sm">
              You can choose to disable cookies through your individual browser
              options. However, please note that some features of ShopMate (like
              the persistent shopping cart) may not function properly without
              them.
            </p>
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

export default CookiePolicy;
