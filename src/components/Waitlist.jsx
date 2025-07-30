import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Waitlist() {
  const [appEmail, setAppEmail] = useState('');
  const [wearableEmail, setWearableEmail] = useState('');
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [wearableSubmitted, setWearableSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (!appEmail || !appEmail.includes('@')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/waitlist/app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: appEmail }),
      });
      
      if (response.ok) {
        setAppSubmitted(true);
        setAppEmail('');
      } else {
        // Fallback: store in localStorage if API is not available
        const existingEmails = JSON.parse(localStorage.getItem('appWaitlist') || '[]');
        if (!existingEmails.includes(appEmail)) {
          existingEmails.push(appEmail);
          localStorage.setItem('appWaitlist', JSON.stringify(existingEmails));
        }
        setAppSubmitted(true);
        setAppEmail('');
      }
    } catch (error) {
      console.error('Error submitting app waitlist:', error);
      // Fallback: store in localStorage if API is not available
      const existingEmails = JSON.parse(localStorage.getItem('appWaitlist') || '[]');
      if (!existingEmails.includes(appEmail)) {
        existingEmails.push(appEmail);
        localStorage.setItem('appWaitlist', JSON.stringify(existingEmails));
      }
      setAppSubmitted(true);
      setAppEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWearableSubmit = async (e) => {
    e.preventDefault();
    if (!wearableEmail || !wearableEmail.includes('@')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/waitlist/wearable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: wearableEmail }),
      });
      
      if (response.ok) {
        setWearableSubmitted(true);
        setWearableEmail('');
      } else {
        // Fallback: store in localStorage if API is not available
        const existingEmails = JSON.parse(localStorage.getItem('wearableWaitlist') || '[]');
        if (!existingEmails.includes(wearableEmail)) {
          existingEmails.push(wearableEmail);
          localStorage.setItem('wearableWaitlist', JSON.stringify(existingEmails));
        }
        setWearableSubmitted(true);
        setWearableEmail('');
      }
    } catch (error) {
      console.error('Error submitting wearable waitlist:', error);
      // Fallback: store in localStorage if API is not available
      const existingEmails = JSON.parse(localStorage.getItem('wearableWaitlist') || '[]');
      if (!existingEmails.includes(wearableEmail)) {
        existingEmails.push(wearableEmail);
        localStorage.setItem('wearableWaitlist', JSON.stringify(existingEmails));
      }
      setWearableSubmitted(true);
      setWearableEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 py-24 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12">
      <motion.h2 
        className="text-3xl md:text-4xl font-heading font-extrabold text-center mb-12 text-black lowercase"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        join the waitlist
      </motion.h2>
      
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-12">
        {/* App Waitlist */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl md:text-2xl font-heading font-bold text-center mb-6 text-black lowercase">
            impulse app
          </h3>
          
          {!appSubmitted ? (
            <form onSubmit={handleAppSubmit} className="w-full max-w-sm">
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  value={appEmail}
                  onChange={(e) => setAppEmail(e.target.value)}
                  placeholder="your email"
                  className="w-full px-6 py-4 text-lg font-sans border-2 border-black bg-white text-black placeholder-black/60 lowercase focus:outline-none focus:border-black"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-black text-white font-heading font-bold text-lg flex items-center justify-center gap-3 lowercase hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'joining...' : 'join app waitlist'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-sans text-black/80 lowercase">
                you're on the list
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Wearable Waitlist */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl md:text-2xl font-heading font-bold text-center mb-6 text-black lowercase">
            impulse wearable
          </h3>
          
          {!wearableSubmitted ? (
            <form onSubmit={handleWearableSubmit} className="w-full max-w-sm">
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  value={wearableEmail}
                  onChange={(e) => setWearableEmail(e.target.value)}
                  placeholder="your email"
                  className="w-full px-6 py-4 text-lg font-sans border-2 border-black bg-white text-black placeholder-black/60 lowercase focus:outline-none focus:border-black"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-black text-white font-heading font-bold text-lg flex items-center justify-center gap-3 lowercase hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'joining...' : 'join wearable waitlist'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-sans text-black/80 lowercase">
                you're on the list
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 