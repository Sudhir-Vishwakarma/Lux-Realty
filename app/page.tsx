import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import AboutUs from '@/components/AboutUs';
import FeaturedProperties from '@/components/FeaturedProperties';
import Gallery from '@/components/Gallery';
import FloorPlans from '@/components/FloorPlans';
import Connectivity from '@/components/Connectivity';
import Amenities from '@/components/Amenities';
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
        <div id="hero"><Hero /></div>
        <Stats />
        <AboutUs />
        <div id="properties"><FeaturedProperties /></div>
        <Gallery />
        <FloorPlans />
        <Connectivity />
        <Amenities />
        <div id="services"><Services /></div>
        <div id="team"><TeamAgents /></div>
        <HowItWorks />
        <div id="faq"><FAQ /></div>
        <Testimonials />
        <div id="contact"><CTABanner /></div>
      </main>
      <Footer />
    </>
  );
}
