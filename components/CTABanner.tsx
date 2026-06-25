export default function CTABanner() {
  return (
    <section className="py-20 bg-blue-900 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 50%, #f59e0b 0%, transparent 50%),
                            radial-gradient(circle at 90% 50%, #3b82f6 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Get Started Today
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Find Your
          <span className="text-amber-400"> Perfect Home?</span>
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
          Join over 3,200+ happy families who found their dream property in Mumbai with Realatte. Our experts are ready to help you every step of the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg">
            Browse Properties
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg border border-white/20 backdrop-blur-sm">
            Talk to an Agent
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-blue-200 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No hidden fees
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified listings
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Expert guidance
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            24/7 support
          </span>
        </div>
      </div>
    </section>
  );
}
