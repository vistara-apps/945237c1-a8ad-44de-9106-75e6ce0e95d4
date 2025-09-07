'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { ActionButton } from '@/components/ActionButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">
            Something went wrong!
          </h2>
          <p className="text-text-secondary">
            We encountered an error while loading SampleFlow. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <ActionButton
            variant="primary"
            onClick={reset}
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </ActionButton>
          
          <ActionButton
            variant="secondary"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go Home
          </ActionButton>
        </div>

        {error.digest && (
          <div className="text-xs text-text-secondary font-mono">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
