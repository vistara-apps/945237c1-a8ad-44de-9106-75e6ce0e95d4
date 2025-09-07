import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function generateFingerprint(audioData: ArrayBuffer): string {
  // Simplified fingerprint generation - in production, use proper audio fingerprinting
  const hash = Array.from(new Uint8Array(audioData))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
  return hash;
}

export function calculateDMCARisk(sampleInfo: any): { score: number; level: 'low' | 'medium' | 'high'; factors: string[]; recommendations: string[] } {
  let score = 0;
  const factors: string[] = [];
  const recommendations: string[] = [];

  // Sample age factor
  if (sampleInfo.releaseYear && sampleInfo.releaseYear > 2010) {
    score += 20;
    factors.push('Recent release (higher protection)');
    recommendations.push('Consider reaching out to rights holders proactively');
  }

  // Popularity factor (simplified)
  if (sampleInfo.confidence > 0.9) {
    score += 30;
    factors.push('High recognition confidence');
    recommendations.push('Ensure proper clearance before distribution');
  }

  // Duration factor
  if (sampleInfo.duration > 30) {
    score += 25;
    factors.push('Extended sample duration');
    recommendations.push('Consider shortening sample or negotiating extended use rights');
  }

  // Rights holder activity (simplified)
  if (sampleInfo.rightsHolders?.length > 1) {
    score += 15;
    factors.push('Multiple rights holders');
    recommendations.push('Coordinate clearance with all rights holders');
  }

  const level = score < 30 ? 'low' : score < 60 ? 'medium' : 'high';
  
  // Add general recommendations based on risk level
  if (level === 'high') {
    recommendations.push('Consider legal consultation before proceeding');
  } else if (level === 'medium') {
    recommendations.push('Document all clearance attempts thoroughly');
  } else {
    recommendations.push('Standard clearance process should be sufficient');
  }
  
  return { score, level, factors, recommendations };
}

export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a'];
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid audio file (MP3, WAV, M4A)' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 50MB' };
  }

  return { valid: true };
}
