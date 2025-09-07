'use client';

import { Clock, CheckCircle, XCircle, DollarSign, User, Calendar } from 'lucide-react';
import { License, RightsHolder } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { ActionButton } from './ActionButton';

interface LicenseCardProps {
  license: License;
  variant: 'pending' | 'cleared' | 'rejected';
  rightsHolder?: RightsHolder;
  onAction?: (action: string) => void;
}

export function LicenseCard({ license, variant, rightsHolder, onAction }: LicenseCardProps) {
  const getStatusIcon = () => {
    switch (variant) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'cleared':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (variant) {
      case 'pending':
        return 'Pending Approval';
      case 'cleared':
        return 'License Cleared';
      case 'rejected':
        return 'License Rejected';
    }
  };

  const getStatusColor = () => {
    switch (variant) {
      case 'pending':
        return 'text-yellow-400';
      case 'cleared':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm text-text-secondary">License Type</div>
          <div className="font-medium capitalize">{license.licenseType}</div>
        </div>
      </div>

      {/* Rights Holder Info */}
      {rightsHolder && (
        <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
          <div className="p-2 bg-primary/20 rounded-full">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{rightsHolder.name}</div>
            <div className="text-sm text-text-secondary">{rightsHolder.contactInfo}</div>
          </div>
        </div>
      )}

      {/* License Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Price</span>
          </div>
          <div className="font-medium">{formatPrice(license.price)}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Created</span>
          </div>
          <div className="font-medium">
            {new Date(license.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="space-y-2">
        <div className="text-sm text-text-secondary">License Terms</div>
        <div className="text-sm bg-surface/50 p-3 rounded-lg">
          {license.terms}
        </div>
      </div>

      {/* Transaction Hash */}
      {license.onchainTxHash && (
        <div className="space-y-1">
          <div className="text-sm text-text-secondary">Transaction Hash</div>
          <div className="text-xs font-mono bg-surface/50 p-2 rounded break-all">
            {license.onchainTxHash}
          </div>
        </div>
      )}

      {/* Actions */}
      {variant === 'pending' && onAction && (
        <div className="flex space-x-2 pt-2">
          <ActionButton
            variant="primary"
            onClick={() => onAction('approve')}
            className="flex-1"
          >
            Approve & Pay
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={() => onAction('reject')}
            className="flex-1"
          >
            Reject
          </ActionButton>
        </div>
      )}

      {variant === 'cleared' && onAction && (
        <ActionButton
          variant="secondary"
          onClick={() => onAction('download')}
          className="w-full"
        >
          Download License
        </ActionButton>
      )}
    </div>
  );
}
