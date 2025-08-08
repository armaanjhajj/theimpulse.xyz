import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PREDEFINED_QUESTIONS = [
  "what is impulse?",
  "how does it work?",
  "when does it launch?",
  "is it like tinder?",
  "why voice-first?",
  "what makes it different?",
  "tell me about the wearable",
  "what's your manifesto?"
];

const ANSWERS = {
  "what is impulse?": "impulse is a real-world social networking app that connects you with people nearby who share your interests and energy. we use compatibility scoring to match you in real time, encouraging face-to-face interactions.",
  "how does it work?": "impulse uses proximity detection and compatibility algorithms to alert you when you're near someone with similar interests. you get a short window to act on that impulse and connect face-to-face. no endless swiping, just real moments.",
  "when does it launch?": "impulse is launching fall 2025! we're currently in development and taking waitlist signups. join the waitlist to be among the first to experience real-world social networking.",
  "is it like tinder?": "not really! while tinder is about online dating, impulse is about real-world social networking. we focus on face-to-face connections, not endless messaging. it's more like having a social radar for your city.",
  "why voice-first?": "voice-first design encourages more authentic, human interactions. typing can be awkward and time-consuming. voice lets you express yourself naturally and connect more deeply with people around you.",
  "what makes it different?": "impulse is the only app that prioritizes real-world connections over online interactions. we use proximity and compatibility to create meaningful face-to-face moments, not just digital relationships.",
  "tell me about the wearable": "the impulse wearable uses led lights to show your availability status and lets you tap phones or other bracelets to instantly reveal match scores. it's like a social mood ring that connects you to the network.",
  "what's your manifesto?": "we believe real connections happen in real life. impulse exists to make real-life connection easier, faster, and more meaningful. we're building tools that encourage people to act on instinct, engage with those around them, and create meaningful moments in the real world."
};

export default function RetroChatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "hey! i'm impulse. ask me anything about how we're changing the way people connect.", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.toLowerCase(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Find answer
    const answer = ANSWERS[text.toLowerCase()] || "i'm not sure about that! try asking about impulse, how it works, when it launches, or what makes it different.";
    
    // Add bot response
    const botMessage = {
      id: Date.now() + 1,
      text: answer,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

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
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                <div className="text-sm font-mono">{message.text}</div>
                <div className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4"
          >
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">try asking:</div>
        <div className="grid grid-cols-2 gap-2">
          {PREDEFINED_QUESTIONS.map((question, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuestionClick(question)}
              className="text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-mono"
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-600">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="ask me anything about impulse..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-mono text-sm"
          >
            send
          </motion.button>
        </div>
      </div>
    </div>
  );
}
