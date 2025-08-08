import { motion } from 'framer-motion';

export default function RetroChatbot() {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-black border-2 border-gray-400 dark:border-gray-600 rounded-lg shadow-lg transition-colors duration-500">
      {/* Retro Window Title Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm font-mono">impulse.exe</div>
        <div className="w-8"></div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="mb-4 flex justify-start">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg">
            <div className="text-sm font-mono">hey! i'm impulse. ask me anything about how we're changing the way people connect.</div>
            <div className="text-xs opacity-60 mt-1">12:00 AM</div>
          </div>
        </div>
        
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <div className="text-sm font-mono">what is impulse?</div>
            <div className="text-xs opacity-60 mt-1">12:01 AM</div>
          </div>
        </div>
        
        <div className="mb-4 flex justify-start">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg">
            <div className="text-sm font-mono">impulse is a real-world social networking app that connects you with people nearby who share your interests and energy. we use compatibility scoring to match you in real time, encouraging face-to-face interactions.</div>
            <div className="text-xs opacity-60 mt-1">12:01 AM</div>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">try asking:</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-mono">
            what is impulse?
          </div>
          <div className="text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-mono">
            how does it work?
          </div>
          <div className="text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-mono">
            when does it launch?
          </div>
          <div className="text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-mono">
            what makes it different?
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-600">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="ask me anything about impulse..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 font-mono text-sm"
          >
            send
          </motion.button>
        </div>
      </div>
    </div>
  );
}
