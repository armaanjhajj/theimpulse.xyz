import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Waitlist() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !name || !email) return;
    
    setIsLoading(true);
    
    // Store in localStorage
    const existingEntries = JSON.parse(localStorage.getItem('waitlist') || '[]');
    const newEntry = { 
      name, 
      email, 
      phone, 
      timestamp: Date.now(),
      date: new Date().toLocaleString()
    };
    existingEntries.push(newEntry);
    localStorage.setItem('waitlist', JSON.stringify(existingEntries));
    
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setIsLoading(false);
  };

  return (
    <section className="relative z-10 py-4 md:py-8 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black lowercase mb-2 whitespace-nowrap">
            be first to connect
          </h2>
          <p className="text-4xl md:text-6xl lg:text-7xl font-black text-black/40 lowercase whitespace-nowrap">
            join the limited launch
          </p>
        </motion.div>
        
        {/* Form */}
        {!submitted ? (
          <motion.form 
            onSubmit={handleSubmit} 
            className="w-full space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Name
              </label>
                             <input
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="name"
                 className="w-full px-4 py-3 text-base border border-gray-300 bg-gray-50 text-black placeholder-gray-500 rounded-lg focus:outline-none focus:border-black focus:bg-white transition-colors"
                 required
               />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full px-4 py-3 text-base border border-gray-300 bg-gray-50 text-black placeholder-gray-500 rounded-lg focus:outline-none focus:border-black focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Phone (10 digits)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  // Only allow digits
                  const value = e.target.value.replace(/\D/g, '');
                  // Limit to 10 digits
                  setPhone(value.slice(0, 10));
                }}
                placeholder="1234567890"
                className="w-full px-4 py-3 text-base border border-gray-300 bg-gray-50 text-black placeholder-gray-500 rounded-lg focus:outline-none focus:border-black focus:bg-white transition-colors"
                required
                maxLength="10"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-black text-white font-medium text-base rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'submitting...' : 'submit'}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-black/80">
              you're on the list
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
} 