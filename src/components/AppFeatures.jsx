import { motion } from 'framer-motion';

export default function AppFeatures() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="m13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      title: "alert",
      description: "get alerted of someone cool near you",
      trademark: null
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "talk",
      description: "be impulsive, go talk to them"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      title: "connect",
      description: "tap your phones and connect",
      trademark: null
    }
  ];

  return (
    <section className="relative w-full bg-white dark:bg-black py-8 md:py-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center text-black dark:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="font-black text-3xl lg:text-4xl lowercase tracking-tight leading-none text-black dark:text-white mb-4 transition-colors duration-500">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className={`font-medium text-lg lg:text-xl lowercase tracking-tight leading-tight text-black/80 dark:text-white/80 max-w-sm mx-auto transition-colors duration-500 ${feature.singleLine ? 'whitespace-nowrap' : ''}`}>
                {feature.description.split(feature.trademark || '').map((part, i) => (
                  <span key={i}>
                    {part}
                    {feature.trademark && i === 0 && (
                      <span className="font-bold">{feature.trademark}</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center text-black dark:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="font-black text-2xl lowercase tracking-tight leading-none text-black dark:text-white mb-3 transition-colors duration-500">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className={`font-medium text-base lowercase tracking-tight leading-tight text-black/80 dark:text-white/80 px-4 transition-colors duration-500 ${feature.singleLine ? 'whitespace-nowrap' : ''}`}>
                {feature.description.split(feature.trademark || '').map((part, i) => (
                  <span key={i}>
                    {part}
                    {feature.trademark && i === 0 && (
                      <span className="font-bold">{feature.trademark}</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
