import { useEffect } from 'react';

export default function Gallery() {
  useEffect(() => {
    // Load Twitter widgets script if not already present
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <section className="relative z-10 py-24 flex justify-center items-center">
      <blockquote className="twitter-tweet" data-theme="dark" style={{ width: 400, height: 400, maxWidth: '100%', aspectRatio: '1/1', margin: '0 auto' }}>
        <a href="https://x.com/theimpulse_xyz/status/1946973700663980250"></a>
      </blockquote>
    </section>
  );
} 