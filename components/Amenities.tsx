'use client';

import { useState } from 'react';

const categories = [
  {
    label: 'Outdoor & Landscape',
    icon: '🌿',
    items: [
      'Entrance Plaza', 'Party Lawn', 'Party Deck', 'Walking Track',
      'Rose Garden', 'Hibiscus Garden', 'Gazebo', 'Pergola with Seating',
      'Seating Cove', 'Feature Wall', 'Flower Bays', 'Landscaped Garden',
    ],
  },
  {
    label: 'Recreation & Sports',
    icon: '🏋️',
    items: [
      'Fitness Center', 'Half Basketball Court', 'Kids Play Area',
      'Outdoor Workout Space', 'Yoga / Meditation Deck',
      'Senior Citizen\'s Area', 'Pet Park', 'O2 Park', 'Acupressure Pathway',
    ],
  },
  {
    label: 'Lifestyle & Wellness',
    icon: '✨',
    items: [
      'Sunset Deck', 'Herbal Gardens', 'Gardening Space',
      'Festival Court', 'Urban Seating', 'Rooftop Lounge',
      'Meditation Zone', 'Stargazing Deck',
    ],
  },
  {
    label: 'Safety & Services',
    icon: '🔒',
    items: [
      '24×7 Security', 'CCTV Surveillance', 'Video Door Phone',
      'Power Backup', 'Rainwater Harvesting', 'EV Charging Points',
      'Intercom Facility', 'Visitor Management System',
    ],
  },
];

export default function Amenities() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-blue-950" id="amenities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">World-Class Facilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Premium Amenities</h2>
          <p className="text-blue-200 max-w-xl mx-auto">
            Every detail designed to elevate your daily life. From rooftop gardens to wellness zones — everything you need is right here.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, i) => (
            <button key={cat.label} onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                active === i
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}>
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Amenity grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories[active].items.map((item) => (
            <div key={item}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors group">
              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-white text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Total count */}
        <div className="mt-10 text-center">
          <p className="text-blue-300 text-sm">
            <span className="text-amber-400 font-bold text-lg">
              {categories.reduce((sum, c) => sum + c.items.length, 0)}+
            </span>{' '}
            world-class amenities across all categories
          </p>
        </div>
      </div>
    </section>
  );
}
