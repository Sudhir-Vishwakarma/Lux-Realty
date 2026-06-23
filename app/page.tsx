import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import AboutUs from '@/components/AboutUs';
import FeaturedProperties from '@/components/FeaturedProperties';
import Services from '@/components/Services';
import TeamAgents from '@/components/TeamAgents';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AboutUs />
        <FeaturedProperties />
        <Services />
        <TeamAgents />
        <HowItWorks />
        <FAQ />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
