'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'What documents do I need to buy a property in Mumbai?',
    answer: 'For a resale property you will need: Aadhaar Card, PAN Card, 6 months bank statements, income proof (salary slips or ITR), and passport-size photographs. For a new project, the developer will also require your Form 16 or IT returns for the last 2 years for home loan processing. Our agents guide you through the complete documentation checklist at no extra charge.',
  },
  {
    question: 'How does the buying process work at Realatte?',
    answer: 'The process has four steps: (1) Shortlisting — we understand your requirements and share matched listings. (2) Site visits — our agent accompanies you to all shortlisted properties. (3) Offer & negotiation — we negotiate on your behalf to secure the best price. (4) Documentation & registration — our legal team handles the agreement, stamp duty, and registration at the Sub-Registrar office. The entire process typically takes 30–60 days.',
  },
  {
    question: 'Are your properties RERA registered?',
    answer: 'Yes. Every new project listed on Realatte is verified for RERA registration under MahaRERA (Maharashtra Real Estate Regulatory Authority). You can cross-check any project using its RERA number on the MahaRERA website at maharera.mahaonline.gov.in. Realatte itself is also registered as a real estate agent under MahaRERA.',
  },
  {
    question: 'What are your brokerage or service charges?',
    answer: 'For buyers, our service is completely free — no brokerage is charged to the buyer. For sellers, a standard brokerage of 1% of the transaction value applies. For rentals, a one-time fee equivalent to one month\'s rent is charged, split equally between landlord and tenant. All charges are disclosed upfront with no hidden fees.',
  },
  {
    question: 'Do you assist with home loans?',
    answer: 'Yes. We have tie-ups with leading banks and NBFCs including HDFC Bank, SBI, ICICI Bank, Axis Bank, and LIC Housing Finance. Our in-house loan advisory team helps you compare interest rates, check eligibility, and get pre-approval — often securing preferential rates for Realatte clients. Home loan assistance is provided at zero additional cost.',
  },
  {
    question: 'Can NRIs buy property in Mumbai through Realatte?',
    answer: 'Absolutely. NRIs (Non-Resident Indians) and PIOs (Persons of Indian Origin) are legally permitted to buy residential and commercial properties in India under FEMA regulations. Our dedicated NRI advisor Neha Kulkarni specialises in assisting overseas clients with Power of Attorney arrangements, NRE/NRO account documentation, and remote transaction support so you can complete the purchase without being physically present.',
  },
  {
    question: 'How long does the entire buying process take?',
    answer: 'For a new under-construction project, from booking to possession can range from 1 to 3 years depending on the project stage. For a ready-possession property or resale, the process from shortlisting to registration typically takes 30–45 days. If a home loan is involved, add 2–3 weeks for bank processing. Our team actively follows up with all parties to keep the timeline as short as possible.',
  },
  {
    question: 'How can I become a Channel Partner with Realatte?',
    answer: 'Click the "Become a Partner" button on our website and fill in the 4-step Channel Partner registration form. You will need your PAN, RERA registration number (if applicable), GST details, bank account information, and a valid ID proof. Once submitted, our partnership team reviews your application within 48 hours and gets in touch to discuss your preferred project portfolio and commission structure.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500">
            Everything you need to know about buying, renting, selling, and partnering with Realatte in Mumbai.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                openIndex === i ? 'border-blue-200 shadow-md' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className={`font-semibold text-sm sm:text-base leading-snug ${openIndex === i ? 'text-blue-900' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === i ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Still have questions?{' '}
          <a href="mailto:hello@realatte.co.in" className="text-blue-900 font-semibold hover:text-amber-500 transition-colors">
            Email us at hello@realatte.co.in
          </a>
        </p>
      </div>
    </section>
  );
}
