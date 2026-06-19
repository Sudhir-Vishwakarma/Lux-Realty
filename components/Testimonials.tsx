const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Home Buyer',
    initials: 'SM',
    color: 'bg-blue-500',
    rating: 5,
    text: "LuxeRealty made buying our first home an absolute breeze. Our agent was incredibly knowledgeable and patient throughout the entire process. We found our dream home in just 3 weeks!",
  },
  {
    name: 'James Rodriguez',
    role: 'Property Investor',
    initials: 'JR',
    color: 'bg-amber-500',
    rating: 5,
    text: "I've worked with many real estate agencies over the years, but LuxeRealty stands out. Their market insights helped me make smart investment decisions. Excellent ROI on all three properties.",
  },
  {
    name: 'Emily Chen',
    role: 'Renter',
    initials: 'EC',
    color: 'bg-purple-500',
    rating: 5,
    text: "Found an amazing apartment in the heart of the city through LuxeRealty. The process was transparent, fast, and stress-free. I highly recommend them to anyone looking for a rental.",
  },
  {
    name: 'David Park',
    role: 'Home Seller',
    initials: 'DP',
    color: 'bg-green-500',
    rating: 5,
    text: "Sold my property above asking price thanks to the expert guidance from LuxeRealty. Their marketing strategy was brilliant and the team handled everything professionally.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Client Stories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">What Our Clients Say</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don&apos;t just take our word for it — hear from the thousands of happy clients who found their perfect property with us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 text-blue-100 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <StarRating count={t.rating} />

              <p className="text-gray-600 mt-4 mb-6 leading-relaxed text-sm">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
