const landmarks = [
  { name: 'Underground Metro Station', distance: '1 min', mode: 'Walking', icon: '🚇', highlight: true },
  { name: 'Bandra Kurla Complex (BKC)', distance: '2 min', mode: 'Drive', icon: '🏢', highlight: true },
  { name: 'Lower Parel', distance: '8 min', mode: 'Drive', icon: '🏙️', highlight: false },
  { name: 'Worli', distance: '10 min', mode: 'Drive', icon: '🌆', highlight: false },
  { name: 'Bandra Railway Station', distance: '12 min', mode: 'Drive', icon: '🚉', highlight: false },
  { name: 'Bandra–Worli Sea Link', distance: '12 min', mode: 'Drive', icon: '🌉', highlight: false },
  { name: 'T1 Airport (Santacruz)', distance: '15 min', mode: 'Drive', icon: '✈️', highlight: false },
  { name: 'T2 Airport (Chhatrapati Shivaji)', distance: '15 min', mode: 'Drive', icon: '✈️', highlight: false },
];

export default function Connectivity() {
  return (
    <section className="py-20 bg-gray-50" id="connectivity">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Location Advantage</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">Perfectly Connected</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Strategically located in the heart of Mumbai with direct access to major business hubs, transport links, and lifestyle destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map placeholder */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
            {/* Grid overlay to simulate a map */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Roads */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 -translate-x-1/2" />
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-white/10" />
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-white/10" />
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-white/10" />
              <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-white/10" />
            </div>

            {/* Location pins */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-amber-400 rounded-full border-4 border-white shadow-lg animate-ping absolute inset-0" />
                <div className="w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-lg relative z-10" />
              </div>
              <div className="mt-2 bg-white text-blue-900 text-xs font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap -translate-x-1/4">
                LuxeRealty Properties
              </div>
            </div>

            {/* Secondary pins */}
            {[
              { top: '30%', left: '65%', label: 'BKC' },
              { top: '55%', left: '30%', label: 'Metro' },
              { top: '70%', left: '70%', label: 'Sea Link' },
            ].map((pin) => (
              <div key={pin.label} className="absolute" style={{ top: pin.top, left: pin.left }}>
                <div className="w-3 h-3 bg-blue-300 rounded-full border-2 border-white shadow" />
                <div className="mt-1 bg-white/90 text-blue-900 text-xs font-semibold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  {pin.label}
                </div>
              </div>
            ))}

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white text-sm">
                <p className="font-semibold">📍 Western Express Highway, Bandra East</p>
                <p className="text-blue-200 text-xs mt-0.5">Mumbai, Maharashtra — 400 051</p>
              </div>
            </div>
          </div>

          {/* Landmark cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {landmarks.map((lm) => (
                <div
                  key={lm.name}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    lm.highlight
                      ? 'bg-blue-900 border-blue-800 text-white shadow-lg'
                      : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    lm.highlight ? 'bg-white/10' : 'bg-blue-50'
                  }`}>
                    {lm.icon}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm leading-snug ${lm.highlight ? 'text-white' : 'text-gray-900'}`}>
                      {lm.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-lg font-bold ${lm.highlight ? 'text-amber-400' : 'text-blue-900'}`}>
                        {lm.distance}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        lm.highlight ? 'bg-white/20 text-blue-100' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {lm.mode}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              * Approximate distances. Actual travel time may vary based on traffic conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
