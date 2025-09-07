'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FrameContainerProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function FrameContainer({ children, title, className }: FrameContainerProps) {
  return (
    <div className={cn('px-4 py-6 max-w-lg mx-auto min-h-screen', className)}>
      {title && (
        <div className="mb-6">
          <h1 className="text-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
      )}
      {children}
    </div>
  );
}
