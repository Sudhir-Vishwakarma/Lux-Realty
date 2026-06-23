const highlights = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Licensed & RERA Registered',
    description: 'All our projects and agents are fully RERA-registered under Maharashtra Real Estate Regulatory Authority. We maintain complete compliance and transparency.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Trusted Since 2009',
    description: 'Over 15 years of experience in the Mumbai real estate market. From humble beginnings with 5 agents to a team of 50+ certified professionals today.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '3,200+ Successful Transactions',
    description: 'From first-time home buyers to seasoned investors, we have helped over 3,200 families and businesses find their perfect property across Mumbai.',
    color: 'bg-green-50 text-green-700',
  },
];

export default function AboutUs() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
              Mumbai&apos;s Most Trusted<br />Real Estate Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2009, LuxeRealty was built on a single belief — buying or selling a home should be a joyful experience, not a stressful one. We started with a small office in Bandra and a team of five passionate agents. Today, we operate across 25+ Mumbai localities with a team of 50+ certified real estate professionals.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We specialise in premium residential apartments, luxury villas, commercial spaces, and plotted developments across Worli, Bandra, Juhu, Powai, BKC, Prabhadevi, Andheri, and Navi Mumbai. Every property we list is personally verified, RERA-compliant, and backed by our transparent documentation process.
            </p>

            {/* Key facts */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              {[
                { value: '2009', label: 'Founded' },
                { value: '50+', label: 'Certified Agents' },
                { value: '25+', label: 'Localities' },
              ].map((fact) => (
                <div key={fact.label}>
                  <p className="text-2xl font-bold text-blue-900">{fact.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — highlight cards */}
          <div className="flex flex-col gap-5">
            {highlights.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
