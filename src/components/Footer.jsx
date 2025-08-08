import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-black dark:bg-white text-white dark:text-black py-16 md:py-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section */}
          <div>
            <motion.h3 
              className="text-4xl md:text-5xl font-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              impulse
            </motion.h3>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 dark:text-gray-700 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              making real-life connection easier
            </motion.p>
          </div>

          {/* Right Section */}
          <div className="text-right">
            <motion.p 
              className="text-lg md:text-xl mb-6 text-white dark:text-black transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              lets keep in touch
            </motion.p>
            <motion.div 
              className="flex justify-end space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Twitter */}
              <a href="#" className="w-8 h-8 border border-white dark:border-black rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="#" className="w-8 h-8 border border-white dark:border-black rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
              
              {/* GitHub */}
              <a href="#" className="w-8 h-8 border border-white dark:border-black rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
            <a href="/privacy-policy.html" className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service.html" className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="/terms-of-use.html" className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors">
              Terms of Use
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-gray-300 dark:text-gray-700 transition-colors duration-500">
            <p>© 2025 Impulse. All rights reserved.</p>
            <p className="text-sm mt-1">launching fall 2025</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 