import React from 'react';

const GIF_URL = 'https://i.imgur.com/uR56bPk.gif';
const paragraph = [
  'flipping the script on how students connect.',
  'launching', 'fall', '2025', 'at', 'rutgers.',
  '. born from the in-between moments — made to reclaim spontaneity, presence, and real human energy.',
  'built by students, for students.',
  'powered by voice.',
  'driven by', 'impulse.'
];

const highlightMap = {
  'impulse.': 'text-white',
  'launching': 'text-sky-400',
  'fall': 'text-yellow-300',
  '2025': 'text-red-500',
  'rutgers.': 'blur-sm',
};

export default function ImpulseModule() {
  // Flatten the paragraph into words, keeping punctuation
  const words = paragraph.join(' ').split(' ');
  return (
    <>
      <div className="pt-32 md:pt-40 bg-black" />
      <section className="w-full flex flex-col md:flex-row items-stretch justify-center border-t border-b border-white/10 my-0" style={{ minHeight: '340px' }}>
        {/* Left: GIF */}
        <div className="flex-1 flex items-center justify-center min-h-[220px] bg-black border-r border-white/10">
          <img
            src={GIF_URL}
            alt="impulse gif"
            className="object-cover w-full h-full max-w-[260px] max-h-[260px] rounded-none"
            draggable={false}
          />
        </div>
        {/* Right: Paragraph with highlights */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-0 bg-black">
          <p className="text-base md:text-lg font-sans font-normal lowercase leading-snug max-w-xl w-full text-left flex flex-wrap gap-x-1 gap-y-1">
            {words.map((word, i) => {
              let highlight = highlightMap[word.replace(/[^a-z0-9.]/gi, '')] || '';
              let base = 'text-[#888]';
              if (highlight === 'blur-sm') {
                return <span key={i} className={base + ' blur-sm'}>{word + ' '}</span>;
              }
              return <span key={i} className={base + ' ' + highlight}>{word + ' '}</span>;
            })}
          </p>
        </div>
      </section>
    </>
  );
} 