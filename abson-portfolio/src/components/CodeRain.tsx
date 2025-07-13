'use client';

import { useEffect, useState } from 'react';

const CodeRain = () => {
  const [symbols, setSymbols] = useState<Array<{
    id: number;
    symbol: string;
    x: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const codeSymbols = [
      '{', '}', '[', ']', '(', ')', '<', '>',
      '=', '+', '-', '*', '/', '%', '&', '|',
      '?', ':', ';', '.', ',', '!', '@', '#',
      '$', '^', '~', '`', '\\', '_', 'f()', 'var',
      'if', '&&', '||', '=>', '!==', '===',
      '0x', '1', '0', 'null', 'true', 'false'
    ];

    const newSymbols = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      x: Math.random() * 100,
      delay: Math.random() * 10
    }));

    setSymbols(newSymbols);
  }, []);

  // Reduce symbols on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const displaySymbols = isMobile ? symbols.slice(0, 8) : symbols;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -2 }}>
      {displaySymbols.map((item) => (
        <div
          key={item.id}
          className="code-symbol absolute"
          style={{
            left: `${item.x}%`,
            animationDelay: `${item.delay}s`,
            fontSize: isMobile ? '10px' : '12px'
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default CodeRain;