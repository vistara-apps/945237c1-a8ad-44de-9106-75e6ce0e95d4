'use client';

import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { DMCARisk } from '@/lib/types';

interface DMCARiskIndicatorProps {
  risk: DMCARisk;
}

export function DMCARiskIndicator({ risk }: DMCARiskIndicatorProps) {
  const getRiskIcon = () => {
    switch (risk.level) {
      case 'low':
        return <Shield className="w-5 h-5 text-green-400" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getRiskColor = () => {
    switch (risk.level) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
    }
  };

  const getRiskBgColor = () => {
    switch (risk.level) {
      case 'low':
        return 'bg-green-500/20 border-green-500/50';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/50';
      case 'high':
        return 'bg-red-500/20 border-red-500/50';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getRiskBgColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getRiskIcon()}
          <span className={`font-medium ${getRiskColor()}`}>
            DMCA Risk: {risk.level.toUpperCase()}
          </span>
        </div>
        <div className={`text-2xl font-bold ${getRiskColor()}`}>
          {risk.score}/100
        </div>
      </div>

      {risk.factors.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-text-secondary">Risk Factors:</div>
          <ul className="space-y-1">
            {risk.factors.map((factor, index) => (
              <li key={index} className="text-sm flex items-start space-x-2">
                <span className="text-text-secondary">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {risk.recommendations.length > 0 && (
        <div className="space-y-2 mt-3">
          <div className="text-sm text-text-secondary">Recommendations:</div>
          <ul className="space-y-1">
            {risk.recommendations.map((rec, index) => (
              <li key={index} className="text-sm flex items-start space-x-2">
                <span className="text-primary">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
