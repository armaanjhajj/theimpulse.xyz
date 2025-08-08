import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplinePhone from './SplinePhone';
import RetroChatbot from './RetroChatbot';

export default function RetroPortal({ onBackToModern }) {
  const [openWindows, setOpenWindows] = useState({});
  const [windowPositions, setWindowPositions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBackButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopIcons = [
    { id: 'manifesto', name: 'manifesto.txt', icon: 'DOC' },
    { id: 'spline', name: 'spline_phone.exe', icon: 'EXE' },
    { id: 'chatbot', name: 'impulse.exe', icon: 'EXE' },
  ];

  const windowContents = {
    manifesto: {
      title: 'manifesto.txt',
      content: `
impulse manifesto
================

we believe in the power of spontaneous connection.
in a world of endless scrolling and curated feeds,
we champion the raw, unfiltered moment.

impulse is not just an app—it's a philosophy.
act on impulse. trust your gut. connect instantly.

the future of social is immediate.
the future is impulse.

- the impulse team
      `,
    },

    spline: {
      title: 'spline_phone.exe',
      content: `
Loading Spline Phone Component...
================================

Initializing 3D rendering engine...
Loading phone model...
Applying textures...
Rendering scene...

Status: READY
Click to view the interactive phone demo.

[This would open the SplinePhone component in a window]
      `,
    },

    chatbot: {
      title: 'impulse.exe',
      content: `
Loading Impulse Chatbot...
==========================

Initializing AI conversation engine...
Loading response database...
Connecting to impulse knowledge base...

Status: READY
Click to chat with impulse about the app.

[This would open the RetroChatbot component in a window]
      `,
    },
  };

  const openWindow = (id) => {
    setOpenWindows(prev => ({ ...prev, [id]: true }));
    if (!windowPositions[id]) {
      setWindowPositions(prev => ({
        ...prev,
        [id]: { x: Math.random() * 200, y: Math.random() * 200 }
      }));
    }
    
    // Play retro click sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore errors if audio fails
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  };

  const updateWindowPosition = (id, x, y) => {
    if (!isMobile) {
      setWindowPositions(prev => ({ ...prev, [id]: { x, y } }));
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-200 relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cccccc' fill-opacity='0.3'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      {/* Desktop icons */}
      <div className="relative z-10 p-8 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {desktopIcons.map((icon) => (
            <motion.div
              key={icon.id}
              className="flex flex-col items-center cursor-pointer select-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWindow(icon.id)}
            >
              <div className="w-16 h-16 bg-white border-2 border-gray-400 flex items-center justify-center text-black text-xs font-mono mb-2" style={{
                borderTop: '2px solid #dfdfdf',
                borderLeft: '2px solid #dfdfdf',
                borderRight: '2px solid #808080',
                borderBottom: '2px solid #808080'
              }}>
                {icon.id === 'manifesto' ? (
                  <svg className="w-12 h-10" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Classic yellow folder icon */}
                    <path d="M2 4C2 2.89543 2.89543 2 4 2H9L11 4H20C21.1046 4 22 4.89543 22 6V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V4Z" fill="#FFD700" stroke="#000000" strokeWidth="1"/>
                    <path d="M2 4C2 2.89543 2.89543 2 4 2H9L11 4H20C21.1046 4 22 4.89543 22 6V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V4Z" fill="#FFD700" stroke="#000000" strokeWidth="1" style={{filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))'}}/>
                  </svg>
                ) : icon.id === 'spline' ? (
                  <svg className="w-12 h-10" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Classic yellow folder icon with small exe indicator */}
                    <path d="M2 4C2 2.89543 2.89543 2 4 2H9L11 4H20C21.1046 4 22 4.89543 22 6V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V4Z" fill="#FFD700" stroke="#000000" strokeWidth="1"/>
                    <path d="M2 4C2 2.89543 2.89543 2 4 2H9L11 4H20C21.1046 4 22 4.89543 22 6V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V4Z" fill="#FFD700" stroke="#000000" strokeWidth="1" style={{filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))'}}/>
                    {/* Small exe indicator */}
                    <circle cx="18" cy="6" r="1.5" fill="#000000"/>
                  </svg>
                ) : (
                  icon.icon
                )}
              </div>
              <div className="text-xs text-center font-mono text-black bg-transparent px-2 py-1 max-w-[80px] leading-tight">
                {icon.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Draggable windows */}
      <AnimatePresence>
        {Object.entries(openWindows).map(([id, isOpen]) => {
          if (!isOpen) return null;
          
          const content = windowContents[id];
          const position = windowPositions[id] || { x: 0, y: 0 };

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute z-20 ${isMobile ? 'inset-4' : ''}`}
              style={!isMobile ? {
                left: position.x,
                top: position.y,
              } : {}}
            >
              <div className="bg-gray-200 border-2 border-gray-400 shadow-lg min-w-[350px] max-w-[500px] relative" style={{
                borderTop: '3px solid #dfdfdf',
                borderLeft: '3px solid #dfdfdf',
                borderRight: '3px solid #808080',
                borderBottom: '3px solid #808080'
              }}>
                {/* Window title bar - classic Windows 95 style */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 flex justify-between items-center">
                  <div className="font-mono text-sm font-bold">{content.title}</div>
                  <div className="flex items-center space-x-1">
                    <button className="w-4 h-4 bg-gray-200 border border-gray-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-600"></div>
                    </button>
                    <button className="w-4 h-4 bg-gray-200 border border-gray-400 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-600"></div>
                    </button>
                    <button
                      onClick={() => closeWindow(id)}
                      className="w-4 h-4 bg-red-500 hover:bg-red-600 transition-colors border border-gray-400 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white"></div>
                    </button>
                  </div>
                </div>
                
                {/* Window content */}
                <div className="bg-white border-t border-gray-400">
                  {id === 'spline' ? (
                    <div className="w-full h-96">
                      <SplinePhone />
                    </div>
                  ) : id === 'chatbot' ? (
                    <div className="w-full h-96">
                      <RetroChatbot />
                    </div>
                  ) : (
                    <div className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {content.content}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Menu bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-6 py-3 z-30" style={{
        borderBottom: '2px solid #404040'
      }}>
        <div className="flex items-center justify-between">
          <div className="font-mono text-base font-bold">impulse desktop v1.0</div>
          <div className="flex items-center space-x-6 text-sm">
            <span className="hover:text-gray-300 cursor-pointer">file</span>
            <span className="hover:text-gray-300 cursor-pointer">edit</span>
            <span className="hover:text-gray-300 cursor-pointer">view</span>
            <span className="hover:text-gray-300 cursor-pointer">help</span>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-40" style={{
        borderTop: '2px solid #404040'
      }}>
        <div className="flex items-center justify-between px-4 py-2">
          {/* Start button */}
          <div className="flex items-center space-x-2">
            <button className="bg-green-600 hover:bg-green-700 px-3 py-1 font-mono text-sm font-bold border border-gray-400">
              START
            </button>
            
            {/* App shortcuts */}
            <div className="flex items-center space-x-1 ml-4">
              <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 font-mono text-xs border border-gray-400">
                📁
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 font-mono text-xs border border-gray-400">
                🌐
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 font-mono text-xs border border-gray-400">
                📧
              </button>
            </div>
          </div>
          
          {/* System tray */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-700 px-2 py-1 font-mono text-xs border border-gray-400">
              12:00 PM
            </div>
            <div className="bg-gray-700 px-2 py-1 font-mono text-xs border border-gray-400">
              💾
            </div>
            <div className="bg-gray-700 px-2 py-1 font-mono text-xs border border-gray-400">
              🔊
            </div>
            {showBackButton && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 font-mono text-sm font-bold border border-gray-400"
                onClick={onBackToModern}
              >
                ← BACK
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 