const agents = [
  {
    name: 'Rahul Sharma',
    title: 'Senior Property Consultant',
    specialization: 'Luxury Residential',
    experience: '12 Years',
    localities: 'Worli, Prabhadevi, Lower Parel',
    initials: 'RS',
    color: 'from-blue-500 to-blue-700',
    deals: '420+',
  },
  {
    name: 'Priya Patel',
    title: 'Commercial Real Estate Expert',
    specialization: 'Commercial & Office Spaces',
    experience: '9 Years',
    localities: 'BKC, Andheri, Lower Parel',
    initials: 'PP',
    color: 'from-amber-500 to-orange-600',
    deals: '310+',
  },
  {
    name: 'Amit Desai',
    title: 'Villa & Land Specialist',
    specialization: 'Villas & Plotted Development',
    experience: '11 Years',
    localities: 'Juhu, Versova, Madh Island',
    initials: 'AD',
    color: 'from-emerald-500 to-teal-600',
    deals: '380+',
  },
  {
    name: 'Neha Kulkarni',
    title: 'Sales & NRI Advisor',
    specialization: 'Sales & NRI Investments',
    experience: '7 Years',
    localities: 'Bandra, Powai, Thane',
    initials: 'NK',
    color: 'from-purple-500 to-violet-600',
    deals: '290+',
  },
];

export default function TeamAgents() {
  return (
    <section className="py-20 bg-gray-50" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Meet the Team</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">Our Expert Agents</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our certified agents bring deep local knowledge, years of experience, and an unwavering commitment to getting you the best deal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Avatar header */}
              <div className={`bg-gradient-to-br ${agent.color} h-32 flex items-center justify-center`}>
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                  <span className="text-white font-bold text-2xl">{agent.initials}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
                <p className="text-sm text-blue-700 font-medium mb-1">{agent.title}</p>

                <div className="mt-3 space-y-2 text-sm text-gray-500">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{agent.specialization}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{agent.localities}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{agent.experience} · {agent.deals} deals closed</span>
                  </div>
                </div>

                <button className="mt-5 w-full bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
