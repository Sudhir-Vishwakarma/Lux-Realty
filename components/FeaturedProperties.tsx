const properties = [
  {
    id: 1,
    title: 'Sea View 3BHK Apartment',
    location: 'Worli, Mumbai',
    price: '₹4.50 Cr',
    type: 'For Sale',
    beds: 3,
    baths: 2,
    area: '1,650',
    img: '/images/prop-worli-night.jpg',
    badge: 'Featured',
  },
  {
    id: 2,
    title: 'Luxury Studio Apartment',
    location: 'Bandra West, Mumbai',
    price: '₹1.20 Cr',
    type: 'For Sale',
    beds: 1,
    baths: 1,
    area: '650',
    img: '/images/prop-bandra-rendezvous.jpg',
    badge: 'New',
  },
  {
    id: 3,
    title: 'Spacious Villa with Pool',
    location: 'Juhu, Mumbai',
    price: '₹12.75 Cr',
    type: 'For Sale',
    beds: 5,
    baths: 5,
    area: '5,200',
    img: '/images/prop-imperial.jpg',
    badge: 'Hot Deal',
  },
  {
    id: 4,
    title: 'Modern 2BHK Flat',
    location: 'Powai, Mumbai',
    price: '₹1.85 Cr',
    type: 'For Sale',
    beds: 2,
    baths: 2,
    area: '980',
    img: '/images/prop-powai.jpg',
    badge: null,
  },
  {
    id: 5,
    title: 'Premium Office Space',
    location: 'BKC, Mumbai',
    price: '₹3,20,000/mo',
    type: 'For Sale',
    beds: 0,
    baths: 2,
    area: '2,400',
    img: '/images/prop-bkc.jpg',
    badge: null,
  },
  {
    id: 6,
    title: 'Sky Penthouse',
    location: 'Prabhadevi, Mumbai',
    price: '₹8.20 Cr',
    type: 'For Sale',
    beds: 4,
    baths: 4,
    area: '3,100',
    img: '/images/prop-worli-luxury.jpg',
    badge: 'New',
  },
];

function PropertyCard({ property }: { property: (typeof properties)[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Property image */}
      <div className="relative h-52 overflow-hidden bg-gray-200">
        <img
          src={property.img}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Type badge */}
        <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
          'bg-blue-900 text-white'
        }`}>
          {property.type}
        </span>

        {/* Featured badge */}
        {property.badge && (
          <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-white text-blue-900 shadow">
            {property.badge}
          </span>
        )}

        {/* Heart icon */}
        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow">
          <svg className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-900 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {property.location}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.beds} Beds
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.area} ft²
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-900">{property.price}</span>
          <button className="text-sm font-semibold text-blue-900 hover:text-amber-500 transition-colors flex items-center gap-1">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
  return (
    <section className="py-20 bg-gray-50" id="properties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Listings</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Featured Properties</h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Hand-picked premium properties from our verified listings across top locations.
            </p>
          </div>
          <button className="self-start sm:self-auto flex items-center gap-2 text-blue-900 font-semibold hover:text-amber-500 transition-colors whitespace-nowrap">
            View All Properties
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
