'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import LeadForm from '@/components/forms/LeadForm';
import ChannelPartnerForm from '@/components/forms/ChannelPartnerForm';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [cpOpen, setCpOpen] = useState(false);

  useEffect(() => {
    const handler = () => setCpOpen(true);
    window.addEventListener('open-cp-modal', handler);
    return () => window.removeEventListener('open-cp-modal', handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-900">Luxe<span className="text-amber-500">Realty</span></span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {['Buy', 'Rent', 'Sell', 'Agents', 'Blog'].map((item) => (
                <Link key={item} href="#"
                  className="text-gray-600 hover:text-blue-900 font-medium transition-colors text-sm">
                  {item}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
                Sign In
              </Link>
              <button onClick={() => setCpOpen(true)}
                className="text-sm font-semibold text-blue-900 border border-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Become a Partner
              </button>
              <button onClick={() => setLeadOpen(true)}
                className="bg-blue-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                List Property
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-4">
              {['Buy', 'Rent', 'Sell', 'Agents', 'Blog'].map((item) => (
                <Link key={item} href="#" className="text-gray-600 hover:text-blue-900 font-medium text-sm">{item}</Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link href="#" className="text-sm font-medium text-gray-600">Sign In</Link>
                <button onClick={() => { setCpOpen(true); setMenuOpen(false); }}
                  className="text-sm font-semibold text-blue-900 border border-blue-900 px-4 py-2 rounded-lg text-left">
                  Become a Partner
                </button>
                <button onClick={() => { setLeadOpen(true); setMenuOpen(false); }}
                  className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-lg text-left">
                  List Property
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <Modal isOpen={leadOpen} onClose={() => setLeadOpen(false)} title="Lead Generation">
        <LeadForm />
      </Modal>

      <Modal isOpen={cpOpen} onClose={() => setCpOpen(false)} title="Channel Partner Registration">
        <ChannelPartnerForm />
      </Modal>
    </>
  );
}
