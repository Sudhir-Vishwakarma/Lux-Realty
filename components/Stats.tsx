const stats = [
  { value: '5K+', label: 'Properties Listed', icon: '🏘️' },
  { value: '3.2K+', label: 'Happy Clients', icon: '😊' },
  { value: '15+', label: 'Years Experience', icon: '🏆' },
  { value: '25+', label: 'Mumbai Localities', icon: '🌆' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
