import React from "react";
import {
  Lock,
  ShieldAlert,
  CreditCard,
  Key,
  Server,
  CheckCircle,
} from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      title: "Secure Payments",
      icon: <CreditCard className="text-teal-400" />,
      content:
        "We use Stripe for all financial transactions. Your card details are never stored on our servers; they are encrypted and handled directly by Stripe's PCI-compliant infrastructure.",
    },
    {
      title: "Data Encryption",
      icon: <Key className="text-teal-400" />,
      content:
        "All data transmitted between your browser and ShopMate is protected using industry-standard SSL/TLS encryption.",
    },
    {
      title: "Account Safety",
      icon: <Lock className="text-teal-400" />,
      content:
        "We implement secure authentication protocols to ensure your account information and order history remain private and accessible only by you.",
    },
    {
      title: "System Monitoring",
      icon: <Server className="text-teal-400" />,
      content:
        "Our servers are constantly monitored for suspicious activity and potential vulnerabilities to provide a safe shopping environment.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <ShieldAlert size={64} className="text-teal-400" />
            <CheckCircle
              size={24}
              className="absolute bottom-0 right-0 text-white bg-teal-500 rounded-full border-4 border-[#0f1115]"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-white mt-6 mb-4">
            Security at <span className="text-teal-400">ShopMate</span>
          </h1>
          <p className="text-gray-500 italic">
            Your trust is our highest priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1a1d23] border border-gray-800 p-8 rounded-3xl hover:border-teal-500/50 transition-all group"
            >
              <div className="mb-4 p-3 bg-teal-400/10 w-fit rounded-2xl group-hover:bg-teal-400/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-linear-to-r from-teal-900/20 to-transparent border-l-4 border-teal-500 p-8 rounded-r-3xl">
          <h2 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">
            Bug Bounty
          </h2>
          <p className="text-gray-400">
            Are you a security researcher? If you find a vulnerability on
            ShopMate, please report it to our security team at{" "}
            <span className="text-teal-400 font-medium">
              security@shopmate.com
            </span>
            . We appreciate your help in keeping our community safe.
          </p>
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

export default Security;
