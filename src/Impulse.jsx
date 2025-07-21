import './App.css';
import { useEffect, useRef } from 'react';

export default function Impulse() {
  const scrollBarRef = useRef(null);
  const glitchRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.hero-text, .feature, .logo-container').forEach(el => {
      observer.observe(el);
    });

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollBarRef.current) {
        scrollBarRef.current.style.width = scrollPercent + '%';
      }
      document.querySelectorAll('.neon-line').forEach((line, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = -(scrollTop * speed);
        line.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (glitchRef.current) {
        glitchRef.current.style.animation = 'none';
        setTimeout(() => glitchRef.current.style.animation = '', 100);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" ref={scrollBarRef}></div>
      </div>

      <section className="section hero">
        {[...Array(4)].map((_, i) => <div key={i} className="neon-line"></div>)}
        <h1 ref={glitchRef} className="hero-text glitch" data-text="SEIZE THE MOMENT">SEIZE THE MOMENT</h1>
      </section>

      <section className="section transition-section">
        <div className="phrase-container">
          {["Don't wait.", "Don't swipe.", "Say something."].map((phrase, i) => (
            <div key={i} className={`phrase ${i === 0 ? 'visible' : ''}`} data-phrase={phrase}>{phrase}</div>
          ))}
        </div>
      </section>

      <section className="section app-section">
        <div className="phone-mockup">
          <div className="screen">
            <div className="call-status">Connected • 00:32</div>
            <div className="waveform">
              {[...Array(9)].map((_, i) => <div key={i} className="wave-bar"></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="features-grid">
          <Feature icon="🎯" title="Vibe-Based Matching" desc="Connect through energy, not just appearance. Our AI matches you based on your authentic voice and personality." />
          <Feature icon="⏰" title="Seize the Moment" desc="Limited time windows create urgency and authenticity. No endless texting - just real conversations that matter." />
          <Feature icon="🎙️" title="Voice-First" desc="One-time voice calls eliminate the pressure of permanence. Say what you mean, mean what you say." />
        </div>
      </section>

      <section className="section final-section">
        <div className="logo-container">
          <div className="logo">IMPULSE</div>
          <div className="tagline">Where moments become connections</div>
          <button className="cta">Coming soon. Stay ready.</button>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
