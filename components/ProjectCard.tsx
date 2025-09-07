'use client';

import { Music, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Project } from '@/lib/types';
import { formatDuration } from '@/lib/utils';
import { ActionButton } from './ActionButton';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const getStatusIcon = () => {
    switch (project.status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'processing':
        return <AlertTriangle className="w-4 h-4 text-blue-400" />;
      case 'cleared':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = () => {
    switch (project.status) {
      case 'pending':
        return 'text-yellow-400';
      case 'processing':
        return 'text-blue-400';
      case 'cleared':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
    }
  };

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Music className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{project.projectName}</h3>
            <p className="text-sm text-text-secondary">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {getStatusIcon()}
          <span className={`text-sm font-medium capitalize ${getStatusColor()}`}>
            {project.status}
          </span>
        </div>
      </div>

      {project.clearedSampleInfo && (
        <div className="space-y-2">
          <div className="text-sm text-text-secondary">Sample Info</div>
          <div className="bg-surface/50 p-3 rounded-lg space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Artist:</span>
              <span className="text-sm">{project.clearedSampleInfo.originalArtist}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Song:</span>
              <span className="text-sm">{project.clearedSampleInfo.songTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Duration:</span>
              <span className="text-sm">{formatDuration(project.clearedSampleInfo.duration)}</span>
            </div>
          </div>
        </div>
      )}

      <ActionButton
        variant="secondary"
        onClick={() => onViewDetails(project.projectId)}
        className="w-full"
      >
        View Details
      </ActionButton>
    </div>
  );
}
