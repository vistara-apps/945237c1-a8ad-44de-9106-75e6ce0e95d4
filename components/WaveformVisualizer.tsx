'use client';

import { useEffect, useState } from 'react';

interface WaveformVisualizerProps {
  isActive: boolean;
  className?: string;
}

export function WaveformVisualizer({ isActive, className = '' }: WaveformVisualizerProps) {
  const [bars] = useState(() => 
    Array.from({ length: 20 }, () => Math.random() * 100)
  );

  return (
    <div className={`flex items-end justify-center space-x-1 h-16 ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className={`
            w-1 bg-gradient-to-t from-primary to-accent rounded-sm transition-all duration-200
            ${isActive ? 'animate-pulse' : ''}
          `}
          style={{
            height: isActive ? `${height}%` : '20%',
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
