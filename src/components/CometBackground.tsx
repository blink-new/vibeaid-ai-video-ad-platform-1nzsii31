import { useEffect, useState } from 'react';

interface Comet {
  id: number;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
}

export function CometBackground() {
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    // Generate initial comets
    const initialComets: Comet[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      startX: Math.random() * window.innerWidth,
      startY: Math.random() * window.innerHeight,
    }));

    setComets(initialComets);

    // Add new comets periodically
    const interval = setInterval(() => {
      setComets(prev => {
        const newComet: Comet = {
          id: Date.now(),
          delay: 0,
          duration: 15 + Math.random() * 10,
          startX: -100,
          startY: Math.random() * window.innerHeight,
        };
        
        // Keep only recent comets to prevent memory leaks
        const filtered = prev.filter(comet => Date.now() - comet.id < 30000);
        return [...filtered, newComet];
      });
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {comets.map((comet) => (
        <div
          key={comet.id}
          className="comet"
          style={{
            left: comet.startX,
            top: comet.startY,
            animationDelay: `${comet.delay}s`,
            animationDuration: `${comet.duration}s`,
          }}
        />
      ))}
      
      {/* Additional ambient particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}