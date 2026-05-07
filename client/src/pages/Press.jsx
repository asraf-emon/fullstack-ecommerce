import React from "react";
import {
  Newspaper,
  Download,
  ExternalLink,
  Award,
  Users,
  MapPin,
} from "lucide-react";

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      date: "April 27, 2026",
      source: "Tech News Bangladesh",
      title: "ShopMate Unveils Revolutionary AI-Powered 'Smart Search' Feature",
      description:
        "ShopMate announced the official launch of its highly anticipated AI-Powered Smart Search feature, powered by Google Gemini LLM.",
      link: "https://telegra.ph/ShopMate-Unveils-Revolutionary-AI-Powered-Smart-Search-Feature-to-Transform-the-E-commerce-Experience-in-Bangladesh-04-27", // Telegraph Link
      category: "Innovation",
    },
  ];

  const stats = [
    {
      label: "Founded",
      value: "2025",
      icon: <Award className="text-teal-400" />,
    },
    {
      label: "Community",
      value: "10k+",
      icon: <Users className="text-teal-400" />,
    },
    {
      label: "Headquarters",
      value: "Dhaka, BD",
      icon: <MapPin className="text-teal-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Press <span className="text-teal-400">Room</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and media assets
            from ShopMate.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1a1d23] border border-gray-800 p-6 rounded-2xl flex items-center space-x-4"
            >
              <div className="p-3 bg-teal-400/10 rounded-lg">{stat.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Press Releases */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Newspaper className="text-teal-400" /> Recent News
            </h2>
          </div>

          <div className="grid gap-8">
            {pressReleases.map((news) => (
              <div
                key={news.id}
                className="group bg-[#1a1d23] border border-gray-800 hover:border-teal-500/50 transition-all duration-300 rounded-2xl overflow-hidden p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-teal-400/10 text-teal-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {news.category}
                      </span>
                      <span className="text-gray-500 text-sm">{news.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-3xl">
                      {news.description}
                    </p>
                  </div>
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl font-medium transition-all transform active:scale-95 whitespace-nowrap"
                  >
                    Read More <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Media Contact */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>
            For media inquiries, please reach out to{" "}
            <span className="text-teal-400 font-medium">
              press@shopmate.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Press;
