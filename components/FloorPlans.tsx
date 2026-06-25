'use client';

import { useState } from 'react';

const configs = [
  {
    type: '1 BHK',
    carpetArea: '450 – 550 sq ft',
    priceRange: '₹85L – ₹1.10 Cr',
    beds: 1,
    baths: 1,
    balconies: 1,
    description: 'Compact and efficiently designed for working professionals and young couples. Features a well-lit living area, modular kitchen, and a private balcony with city views.',
    highlights: ['Open plan living + dining', 'Modular kitchen with loft', 'Private east-facing balcony', 'Vitrified tile flooring', 'Premium bathroom fittings'],
    rooms: [
      { label: 'Living / Dining', w: 3, h: 2, col: 1, row: 1 },
      { label: 'Bedroom', w: 2, h: 2, col: 4, row: 1 },
      { label: 'Kitchen', w: 2, h: 1, col: 1, row: 3 },
      { label: 'Bath', w: 1, h: 1, col: 3, row: 3 },
      { label: 'Balcony', w: 2, h: 1, col: 4, row: 3 },
    ],
  },
  {
    type: '2 BHK',
    carpetArea: '750 – 900 sq ft',
    priceRange: '₹1.50 Cr – ₹2.20 Cr',
    beds: 2,
    baths: 2,
    balconies: 2,
    description: 'Spacious family apartment with a separate dining area, two well-proportioned bedrooms, and dual balconies. Ideal for families seeking comfort and style in the heart of Mumbai.',
    highlights: ['Separate living & dining rooms', 'Master bedroom with attached bath', 'Dual balconies (east + west)', 'Modular kitchen with utility area', 'Premium wooden finish flooring in bedrooms'],
    rooms: [
      { label: 'Living', w: 2, h: 2, col: 1, row: 1 },
      { label: 'Dining', w: 2, h: 1, col: 3, row: 1 },
      { label: 'Master BR', w: 2, h: 2, col: 5, row: 1 },
      { label: 'BR 2', w: 2, h: 2, col: 1, row: 3 },
      { label: 'Kitchen', w: 2, h: 1, col: 3, row: 2 },
      { label: 'Bath 1', w: 1, h: 1, col: 3, row: 3 },
      { label: 'Bath 2', w: 1, h: 1, col: 4, row: 3 },
      { label: 'Balcony 1', w: 1, h: 2, col: 5, row: 3 },
      { label: 'Balcony 2', w: 1, h: 1, col: 6, row: 1 },
    ],
  },
  {
    type: '3 BHK',
    carpetArea: '1,100 – 1,400 sq ft',
    priceRange: '₹3.20 Cr – ₹4.50 Cr',
    beds: 3,
    baths: 3,
    balconies: 2,
    description: 'Premium spacious apartment with a grand living area, master suite with walk-in wardrobe, and panoramic city views. The pinnacle of luxury living with top-of-the-line finishes throughout.',
    highlights: ['Grand living room (18×14 ft)', 'Master suite with walk-in wardrobe', 'Panoramic city + sea views', 'Italian marble flooring in common areas', 'Smart home automation ready'],
    rooms: [
      { label: 'Living', w: 3, h: 2, col: 1, row: 1 },
      { label: 'Dining', w: 2, h: 2, col: 4, row: 1 },
      { label: 'Master BR', w: 2, h: 2, col: 6, row: 1 },
      { label: 'BR 2', w: 2, h: 2, col: 1, row: 3 },
      { label: 'BR 3', w: 2, h: 2, col: 3, row: 3 },
      { label: 'Kitchen', w: 2, h: 1, col: 6, row: 3 },
      { label: 'Bath 1', w: 1, h: 1, col: 5, row: 3 },
      { label: 'Bath 2', w: 1, h: 1, col: 5, row: 4 },
      { label: 'Bath 3', w: 1, h: 1, col: 6, row: 4 },
      { label: 'Balcony 1', w: 2, h: 1, col: 1, row: 5 },
      { label: 'Balcony 2', w: 2, h: 1, col: 6, row: 5 },
    ],
  },
];

const iconBed = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const iconBath = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const iconBalcony = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

export default function FloorPlans() {
  const [active, setActive] = useState(0);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const config = configs[active];

  return (
    <>
      <section className="py-20 bg-white" id="floorplans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Configurations</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">Property Floor Plans</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Thoughtfully designed homes for every lifestyle. Each configuration maximises natural light, ventilation, and space efficiency.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {configs.map((c, i) => (
              <button key={c.type} onClick={() => setActive(i)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  active === i
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {c.type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Floor plan diagram */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Floor Plan — {config.type}</p>
                <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">Indicative Layout</span>
              </div>
              {/* CSS grid floor plan */}
              <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(5, 52px)' }}>
                {config.rooms.map((room) => (
                  <div
                    key={room.label}
                    className="bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center text-center"
                    style={{
                      gridColumn: `${room.col} / span ${room.w}`,
                      gridRow: `${room.row} / span ${room.h}`,
                    }}
                  >
                    <span className="text-blue-800 font-semibold text-xs leading-tight px-1">{room.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">* Not to scale. Actual layout may vary.</p>
            </div>

            {/* Config details */}
            <div className="flex flex-col gap-6">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: iconBed, value: config.beds, label: 'Bedrooms' },
                  { icon: iconBath, value: config.baths, label: 'Bathrooms' },
                  { icon: iconBalcony, value: config.balconies, label: 'Balconies' },
                  { icon: null, value: config.carpetArea, label: 'Carpet Area' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    {stat.icon && <div className="flex justify-center text-blue-900 mb-1">{stat.icon}</div>}
                    <p className="font-bold text-gray-900 text-sm">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="bg-blue-900 rounded-2xl p-5 text-white">
                <p className="text-blue-200 text-sm mb-1">Starting Price</p>
                <p className="text-2xl font-bold">{config.priceRange}</p>
                <p className="text-blue-300 text-xs mt-1">* Price inclusive of all charges. GST extra.</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">{config.description}</p>

              {/* Highlights */}
              <div>
                <p className="font-semibold text-gray-800 mb-3">Key Highlights</p>
                <ul className="space-y-2">
                  {config.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setEnquireOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Request Price & Details
                </button>
                <button className="border-2 border-blue-900 text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry modal */}
      {enquireOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEnquireOpen(false)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Request Price Details</h3>
              <button onClick={() => setEnquireOpen(false)} className="text-gray-400 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-5">Interested in the <strong>{config.type}</strong> configuration ({config.carpetArea})? Fill in your details and our team will get back to you within 24 hours.</p>
            <EnquiryForm onClose={() => setEnquireOpen(false)} configType={config.type} />
          </div>
        </div>
      )}
    </>
  );
}

function EnquiryForm({ onClose, configType }: { onClose: () => void; configType: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
    setTimeout(onClose, 2000);
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-gray-800">Thank you! We&apos;ll call you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)} required
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="text" value={`Interested in ${configType}`} readOnly
        className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-500" />
      <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors mt-1">
        Send Enquiry
      </button>
    </form>
  );
}
