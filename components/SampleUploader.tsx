'use client';

import { useState, useRef } from 'react';
import { Upload, Music, AlertCircle } from 'lucide-react';
import { validateAudioFile } from '@/lib/utils';
import { ActionButton } from './ActionButton';

interface SampleUploaderProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export function SampleUploader({ onUpload, isUploading }: SampleUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    const validation = validateAudioFile(file);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    onUpload(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        className={`
          glass-card p-8 text-center transition-all duration-200 cursor-pointer
          ${dragActive ? 'border-primary bg-primary/10' : 'border-gray-700/50 hover:border-gray-600'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!isUploading ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="space-y-4">
          {isUploading ? (
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="waveform-bar w-1 h-8"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="p-4 bg-primary/20 rounded-full">
                <Upload className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-heading text-text-primary mb-2">
              {isUploading ? 'Processing Sample...' : 'Upload Your Sample'}
            </h3>
            <p className="text-caption">
              {isUploading 
                ? 'Analyzing audio and identifying rights holders'
                : 'Drag & drop your audio file or click to browse'
              }
            </p>
            <p className="text-caption mt-1">
              Supports MP3, WAV, M4A (max 50MB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}

      {!isUploading && (
        <ActionButton
          variant="primary"
          onClick={openFileDialog}
          className="w-full"
        >
          <Music className="w-4 h-4 mr-2" />
          Choose Audio File
        </ActionButton>
      )}
    </div>
  );
}
