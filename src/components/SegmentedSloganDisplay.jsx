import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLOGANS = [
  ['SEIZE', 'THE', 'MOMENT'],
  ['CALL', 'BEFORE', 'GONE'],
  ['TIME', 'TO', 'CONNECT'],
  ['BOLD', 'MOVES', 'WIN'],
  ['VOICE', 'OVER', 'TEXT'],
  ['NEVER', 'MISS', 'OUT'],
];

// 7x5 dot matrix for each character (A-Z, 0-9, space)
const DOT_FONT = {
  'A': [
    '01110',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001',
  ],
  'B': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10001',
    '10001',
    '11110',
  ],
  'C': [
    '01110',
    '10001',
    '10000',
    '10000',
    '10000',
    '10001',
    '01110',
  ],
  'D': [
    '11110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '11110',
  ],
  'E': [
    '11111',
    '10000',
    '10000',
    '11110',
    '10000',
    '10000',
    '11111',
  ],
  'F': [
    '11111',
    '10000',
    '10000',
    '11110',
    '10000',
    '10000',
    '10000',
  ],
  'G': [
    '01110',
    '10001',
    '10000',
    '10111',
    '10001',
    '10001',
    '01110',
  ],
  'H': [
    '10001',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001',
  ],
  'I': [
    '01110',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '01110',
  ],
  'J': [
    '00111',
    '00010',
    '00010',
    '00010',
    '10010',
    '10010',
    '01100',
  ],
  'K': [
    '10001',
    '10010',
    '10100',
    '11000',
    '10100',
    '10010',
    '10001',
  ],
  'L': [
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '11111',
  ],
  'M': [
    '10001',
    '11011',
    '10101',
    '10101',
    '10001',
    '10001',
    '10001',
  ],
  'N': [
    '10001',
    '10001',
    '11001',
    '10101',
    '10011',
    '10001',
    '10001',
  ],
  'O': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110',
  ],
  'P': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10000',
    '10000',
    '10000',
  ],
  'Q': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10101',
    '10010',
    '01101',
  ],
  'R': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10100',
    '10010',
    '10001',
  ],
  'S': [
    '01111',
    '10000',
    '10000',
    '01110',
    '00001',
    '00001',
    '11110',
  ],
  'T': [
    '11111',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
  ],
  'U': [
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110',
  ],
  'V': [
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01010',
    '00100',
  ],
  'W': [
    '10001',
    '10001',
    '10001',
    '10101',
    '10101',
    '11011',
    '10001',
  ],
  'X': [
    '10001',
    '01010',
    '00100',
    '00100',
    '00100',
    '01010',
    '10001',
  ],
  'Y': [
    '10001',
    '01010',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
  ],
  'Z': [
    '11111',
    '00001',
    '00010',
    '00100',
    '01000',
    '10000',
    '11111',
  ],
  ' ': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
  ],
};

const ROWS = 7;
const COLS = 35; // 3 words, up to 10 chars each + spacing

function getGridForSlogan(words) {
  // Place each word on its own line, centered
  const grid = Array.from({ length: ROWS * 3 }, () => Array(COLS).fill(false));
  words.forEach((word, wi) => {
    const chars = word.split('');
    const wordLen = chars.length;
    const startCol = Math.floor((COLS - (wordLen * 6 - 1)) / 2); // 5 cols per char + 1 space
    for (let ci = 0; ci < wordLen; ci++) {
      const char = DOT_FONT[chars[ci]] || DOT_FONT[' '];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < 5; c++) {
          if (char[r][c] === '1') {
            grid[wi * ROWS + r][startCol + ci * 6 + c] = true;
          }
        }
      }
    }
  });
  return grid;
}

export default function SegmentedSloganDisplay() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true);
  const slogan = SLOGANS[index];
  const grid = getGridForSlogan(slogan);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % SLOGANS.length);
        setActive(true);
      }, 600); // Flicker out, then in
    }, 3500);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className="w-full flex items-center justify-center min-h-[32vh] py-10 md:py-16 bg-black">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="inline-block" style={{ background: 'black', borderRadius: 12, padding: '0.5rem 0' }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${COLS * 16} ${ROWS * 3 * 16}`}
            style={{ maxWidth: 900, width: '100%', height: 'auto', display: 'block' }}
          >
            {grid.map((row, ri) =>
              row.map((on, ci) => (
                <motion.circle
                  key={ri + '-' + ci}
                  cx={ci * 16 + 8}
                  cy={ri * 16 + 8}
                  r={6}
                  fill={on && active ? '#fff' : '#222'}
                  style={{
                    filter: on && active ? 'drop-shadow(0 0 8px #fff)' : 'none',
                    opacity: on && active ? 1 : 0.18,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: on && active ? 1 : 0.18 }}
                  transition={{ delay: active ? (on ? (ri * 0.01 + ci * 0.01) : 0) : 0, duration: 0.18, ease: 'easeInOut' }}
                />
              ))
            )}
          </svg>
        </div>
      </div>
    </section>
  );
} 