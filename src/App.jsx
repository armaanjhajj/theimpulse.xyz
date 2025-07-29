import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
// import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
// import BackgroundTransition from './components/BackgroundTransition';
// import ImpulseModule from './components/ImpulseModule';
// import EventTracker from './components/EventTracker'; // Removed
// import RotatingSnippetFeed from './components/RotatingSnippetFeed'; // Temporarily hidden
// import SegmentedSloganDisplay from './components/SegmentedSloganDisplay';

function App() {
  return (
    <div className="bg-white min-h-screen font-sans text-black relative overflow-x-hidden">
      <ScrollProgress />
      <Hero />
      {/* <BackgroundTransition /> */}
      <Features />
      {/* <SegmentedSloganDisplay /> */}
      {/* <EventTracker /> */}
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
