// Core data model types
export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress: string;
  createdAt: Date;
}

export interface Project {
  projectId: string;
  userId: string;
  projectName: string;
  sampleUrl: string;
  clearedSampleInfo?: SampleInfo;
  status: 'pending' | 'processing' | 'cleared' | 'rejected';
  createdAt: Date;
}

export interface License {
  licenseId: string;
  projectId: string;
  rightsHolderId: string;
  licenseType: 'basic' | 'standard' | 'premium';
  terms: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  onchainTxHash?: string;
  createdAt: Date;
}

export interface RightsHolder {
  rightsHolderId: string;
  name: string;
  contactInfo: string;
  onchainAddress?: string;
  farcasterProfileUrl?: string;
}

export interface SampleInfo {
  originalArtist: string;
  songTitle: string;
  album?: string;
  releaseYear?: number;
  duration: number;
  fingerprint: string;
  confidence: number;
  rightsHolders: RightsHolder[];
}

export interface LicenseTier {
  type: 'basic' | 'standard' | 'premium';
  price: number;
  description: string;
  features: string[];
  royaltyRate: number;
}

export interface DMCARisk {
  score: number; // 0-100
  level: 'low' | 'medium' | 'high';
  factors: string[];
  recommendations: string[];
}

// Component prop types
export interface SampleUploaderProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export interface LicenseCardProps {
  license: License;
  variant: 'pending' | 'cleared' | 'rejected';
  onAction?: (action: string) => void;
}

export interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'destructive';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface FrameContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}
