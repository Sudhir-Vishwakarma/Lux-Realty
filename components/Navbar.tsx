'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import LeadForm from '@/components/forms/LeadForm';
import ChannelPartnerForm from '@/components/forms/ChannelPartnerForm';

const navLinks = [
  { label: 'Overview', href: '#hero' },
  { label: 'Properties', href: '#properties' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Floor Plans', href: '#floorplans' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Connectivity', href: '#connectivity' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [cpOpen, setCpOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handler = () => setCpOpen(true);
    window.addEventListener('open-cp-modal', handler);
    return () => window.removeEventListener('open-cp-modal', handler);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  function scrollTo(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img src="/logo.webp" alt="Realatte" className="h-9 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map(({ label, href }) => (
                <button key={href} onClick={() => scrollTo(href)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === href.replace('#', '')
                      ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                      : 'text-white/80 hover:text-white'
                  }`}>
                  {label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button onClick={() => setCpOpen(true)}
                className="text-sm font-semibold text-white border border-white/40 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Become a Partner
              </button>
              <button onClick={() => setLeadOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                Enquire Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
            <div className="lg:hidden border-t border-white/10 py-4 flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <button key={href} onClick={() => scrollTo(href)}
                  className={`text-sm font-medium text-left px-2 py-1.5 rounded transition-colors ${
                    activeSection === href.replace('#', '')
                      ? 'text-amber-400 font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}>
                  {label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <button onClick={() => { setCpOpen(true); setMenuOpen(false); }}
                  className="text-sm font-semibold text-white border border-white/40 px-4 py-2 rounded-lg text-left hover:bg-white/10 transition-colors">
                  Become a Partner
                </button>
                <button onClick={() => { setLeadOpen(true); setMenuOpen(false); }}
                  className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-lg text-left transition-colors">
                  Enquire Now
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
