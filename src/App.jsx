import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
// import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import BackgroundTransition from './components/BackgroundTransition';
import ImpulseModule from './components/ImpulseModule';

function App() {
  return (
    <div className="bg-black min-h-screen font-sans text-white relative overflow-x-hidden">
      <ScrollProgress />
      <Hero />
      <BackgroundTransition />
      <Features />
      <ImpulseModule />
      <Gallery />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
