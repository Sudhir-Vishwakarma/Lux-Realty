'use client';

import { useState } from 'react';

const tabs = ['Buy', 'For Sale', 'Sell'];

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Buy');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #f59e0b 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)`
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Floating cards decoration */}
      <div className="absolute top-28 right-8 lg:right-24 hidden lg:block">
        <div className="bg-white rounded-2xl p-4 shadow-2xl w-48 rotate-3 opacity-90">
          <div className="w-full h-24 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 mb-3 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <p className="text-xs font-bold text-gray-800">Sea View 3BHK</p>
          <p className="text-xs text-gray-500">Worli, Mumbai</p>
          <p className="text-sm font-bold text-blue-900 mt-1">₹4.50 Cr</p>
        </div>
      </div>

      <div className="absolute top-52 left-8 lg:left-24 hidden lg:block">
        <div className="bg-white rounded-2xl p-4 shadow-2xl w-44 -rotate-2 opacity-90">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-700">Deal Closed!</span>
          </div>
          <p className="text-xs text-gray-500">Premium Villa, Juhu</p>
          <p className="text-sm font-bold text-blue-900">₹2.80 Cr</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20">
        <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          #1 Real Estate Platform
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect
          <span className="block text-amber-400 mt-1">Dream Home</span>
        </h1>
        <p className="text-blue-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Explore thousands of properties for sale and rent. Expert agents, seamless process, and your dream home waiting for you.
        </p>

        {/* Search box */}
        <div className="bg-white rounded-2xl shadow-2xl p-3 max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-1 mb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-900 text-white shadow'
                    : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Locality, project, or area in Mumbai..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>

            <select className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none border-none sm:w-40">
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
            </select>

            <select className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none border-none sm:w-36">
              <option value="">Price Range</option>
              <option value="0-50l">Under ₹50L</option>
              <option value="50l-1cr">₹50L – ₹1 Cr</option>
              <option value="1cr-3cr">₹1 Cr – ₹3 Cr</option>
              <option value="3cr+">Above ₹3 Cr</option>
            </select>

            <button className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors flex items-center gap-2 justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/80 text-sm">
          <span>🏠 <strong className="text-white">5,000+</strong> Properties</span>
          <span>✅ <strong className="text-white">3,200+</strong> Happy Clients</span>
          <span>🌆 <strong className="text-white">25+</strong> Mumbai Localities</span>
        </div>
      </div>
    </section>
  );
}
