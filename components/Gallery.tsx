'use client';

import { useState, useEffect } from 'react';

const tiles = [
  { label: 'Imperial Heights', location: 'Tardeo, Mumbai', category: 'Luxury Residential', img: '/images/prop-imperial.jpg' },
  { label: 'World Tower', location: 'Lower Parel, Mumbai', category: 'Premium High-Rise', img: '/images/prop-lodha.jpg' },
  { label: 'Carmichael Residences', location: 'Altamount Road, Mumbai', category: 'Boutique Luxury', img: '/images/prop-carmichael.webp' },
  { label: 'Bandra West Residences', location: 'Bandra West, Mumbai', category: 'Luxury Residential', img: '/images/prop-bandra-skyline.jpg' },
  { label: 'BKC Commercial Hub', location: 'Bandra-Kurla Complex', category: 'Commercial', img: '/images/prop-bkc.jpg' },
  { label: 'Prabhadevi Prestige', location: 'Prabhadevi, Mumbai', category: 'Classic Luxury', img: '/images/prop-prabhadevi.jpg' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % tiles.length : null);
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? (i - 1 + tiles.length) % tiles.length : null);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section className="py-20 bg-gray-950" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Visual Tour</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Project Gallery</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore our premium developments across Mumbai&apos;s most sought-after locations. Click any image to view full screen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map((tile, i) => (
            <button
              key={tile.label}
              onClick={() => setLightbox(i)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <img
                src={tile.img}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              {/* Category tag */}
              <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {tile.category}
              </span>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold text-sm">{tile.label}</p>
                <p className="text-gray-300 text-xs mt-0.5">{tile.location}</p>
              </div>
              {/* Expand icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + tiles.length) % tiles.length); }}
            className="absolute left-4 sm:left-8 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl mx-16 rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <img
              src={tiles[lightbox].img}
              alt={tiles[lightbox].label}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-bold text-xl">{tiles[lightbox].label}</p>
              <p className="text-gray-300 text-sm mt-1">{tiles[lightbox].location} · {lightbox + 1} / {tiles.length}</p>
            </div>
            <span className="absolute top-4 right-4 bg-amber-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {tiles[lightbox].category}
            </span>
          </div>

          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % tiles.length); }}
            className="absolute right-4 sm:right-8 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button onClick={() => setLightbox(null)}
            className="absolute top-4 right-20 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
