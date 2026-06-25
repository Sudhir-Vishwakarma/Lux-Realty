'use client';

import Link from 'next/link';

const links = {
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  Properties: ['Buy', 'For Sale', 'Sell', 'Commercial', 'New Developments'],
  Resources: ['Market Reports', 'Mortgage Calculator', 'Buyer Guide', 'Seller Guide', 'FAQ'],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <img src="/logo.webp" alt="LuxeRealty" className="h-9 w-auto" />
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Mumbai&apos;s trusted real estate partner since 2009. Specialising in premium residential, commercial, and luxury properties across 25+ Mumbai localities.
              </p>

              {/* Contact info */}
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98200 12345
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@luxerealty.com
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  12th Floor, Platina, BKC, Mumbai — 400 051
                </p>
              </div>

              {/* Become a Partner CTA */}
              <button
                onClick={() => window.dispatchEvent(new Event('open-cp-modal'))}
                className="mt-6 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Become a Channel Partner
              </button>
            </div>

            {/* Links */}
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm hover:text-amber-400 transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2025 LuxeRealty. All rights reserved. RERA Reg. No. P51800012345</p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <Link key={social} href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  aria-label={social}>
                  <span className="text-xs">{social[0].toUpperCase()}</span>
                </Link>
              ))}
            </div>
            <div className="flex gap-4 text-xs">
              <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
    </footer>
  );
}
