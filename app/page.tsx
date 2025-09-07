'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Music, Zap, Shield, Users, ArrowRight, Play } from 'lucide-react';

import { FrameContainer } from '@/components/FrameContainer';
import { SampleUploader } from '@/components/SampleUploader';
import { ActionButton } from '@/components/ActionButton';
import { WaveformVisualizer } from '@/components/WaveformVisualizer';
import { ProjectCard } from '@/components/ProjectCard';
import { LicenseCard } from '@/components/LicenseCard';
import { DMCARiskIndicator } from '@/components/DMCARiskIndicator';

import { Project, License, SampleInfo, DMCARisk } from '@/lib/types';
import { generateFingerprint, calculateDMCARisk } from '@/lib/utils';
import { LICENSE_TIERS } from '@/lib/constants';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'projects' | 'sample-details'>('home');
  const [isUploading, setIsUploading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sampleInfo, setSampleInfo] = useState<SampleInfo | null>(null);
  const [dmcaRisk, setDmcaRisk] = useState<DMCARisk | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleSampleUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Simulate audio processing and fingerprinting
      const arrayBuffer = await file.arrayBuffer();
      const fingerprint = generateFingerprint(arrayBuffer);
      
      // Simulate API call to identify sample
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockSampleInfo: SampleInfo = {
        originalArtist: 'The Notorious B.I.G.',
        songTitle: 'Juicy',
        album: 'Ready to Die',
        releaseYear: 1994,
        duration: 45,
        fingerprint,
        confidence: 0.95,
        rightsHolders: [
          {
            rightsHolderId: '1',
            name: 'Bad Boy Records',
            contactInfo: 'licensing@badboy.com',
            onchainAddress: '0x1234...5678',
            farcasterProfileUrl: 'https://warpcast.com/badboy',
          }
        ],
      };

      const risk = calculateDMCARisk(mockSampleInfo);
      
      // Create new project
      const newProject: Project = {
        projectId: Date.now().toString(),
        userId: 'current-user',
        projectName: file.name.replace(/\.[^/.]+$/, ''),
        sampleUrl: URL.createObjectURL(file),
        clearedSampleInfo: mockSampleInfo,
        status: 'processing',
        createdAt: new Date(),
      };

      setProjects(prev => [newProject, ...prev]);
      setSelectedProject(newProject);
      setSampleInfo(mockSampleInfo);
      setDmcaRisk(risk);
      setCurrentView('sample-details');

      // Generate license options
      const mockLicenses: License[] = Object.entries(LICENSE_TIERS).map(([type, tier]) => ({
        licenseId: `${newProject.projectId}-${type}`,
        projectId: newProject.projectId,
        rightsHolderId: '1',
        licenseType: type as 'basic' | 'standard' | 'premium',
        terms: `${tier.description}. Royalty rate: ${tier.royaltyRate * 100}%. ${tier.features.join(', ')}.`,
        price: tier.price,
        status: 'pending',
        createdAt: new Date(),
      }));

      setLicenses(mockLicenses);
      
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLicenseAction = async (action: string, licenseId?: string) => {
    if (action === 'approve' && licenseId) {
      // Simulate payment processing
      const license = licenses.find(l => l.licenseId === licenseId);
      if (license) {
        setLicenses(prev => prev.map(l => 
          l.licenseId === licenseId 
            ? { ...l, status: 'approved', onchainTxHash: '0xabcd...1234' }
            : l
        ));
        
        // Update project status
        if (selectedProject) {
          const updatedProject = { ...selectedProject, status: 'cleared' as const };
          setSelectedProject(updatedProject);
          setProjects(prev => prev.map(p => 
            p.projectId === selectedProject.projectId ? updatedProject : p
          ));
        }
      }
    }
  };

  const renderHomeView = () => (
    <FrameContainer title="SampleFlow">
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <WaveformVisualizer isActive={true} />
          </div>
          <p className="text-body text-text-secondary">
            Automate your sample clearance in minutes, not days.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="glass-card p-4">
          <Wallet>
            <ConnectWallet>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8" />
                <Name className="font-medium" />
              </div>
            </ConnectWallet>
          </Wallet>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <ActionButton
            variant="primary"
            onClick={() => setCurrentView('upload')}
            className="w-full text-lg py-4"
          >
            <Music className="w-5 h-5 mr-2" />
            Clear Sample
          </ActionButton>
          
          <ActionButton
            variant="secondary"
            onClick={() => setCurrentView('projects')}
            className="w-full"
          >
            View My Projects
          </ActionButton>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-heading">Why SampleFlow?</h3>
          <div className="grid gap-3">
            <div className="flex items-start space-x-3 p-3 glass-card">
              <Zap className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-medium">Instant Identification</div>
                <div className="text-sm text-text-secondary">
                  AI-powered audio fingerprinting identifies samples in seconds
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 glass-card">
              <Shield className="w-5 h-5 text-accent mt-1" />
              <div>
                <div className="font-medium">DMCA Protection</div>
                <div className="text-sm text-text-secondary">
                  Risk scoring and takedown defense guidance
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 glass-card">
              <Users className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <div className="font-medium">On-Chain Licensing</div>
                <div className="text-sm text-text-secondary">
                  Smart contracts ensure fair royalty distribution
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FrameContainer>
  );

  const renderUploadView = () => (
    <FrameContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading">Upload Sample</h2>
          <ActionButton
            variant="secondary"
            onClick={() => setCurrentView('home')}
          >
            Back
          </ActionButton>
        </div>

        <SampleUploader
          onUpload={handleSampleUpload}
          isUploading={isUploading}
        />

        {isUploading && (
          <div className="text-center space-y-2">
            <div className="text-sm text-text-secondary">
              Processing your sample...
            </div>
            <div className="text-xs text-text-secondary">
              This may take a few moments
            </div>
          </div>
        )}
      </div>
    </FrameContainer>
  );

  const renderProjectsView = () => (
    <FrameContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading">My Projects</h2>
          <ActionButton
            variant="secondary"
            onClick={() => setCurrentView('home')}
          >
            Back
          </ActionButton>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <Music className="w-12 h-12 text-text-secondary mx-auto" />
            <div>
              <h3 className="font-medium text-text-primary">No projects yet</h3>
              <p className="text-sm text-text-secondary">
                Upload your first sample to get started
              </p>
            </div>
            <ActionButton
              variant="primary"
              onClick={() => setCurrentView('upload')}
            >
              Upload Sample
            </ActionButton>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.projectId}
                project={project}
                onViewDetails={(projectId) => {
                  const project = projects.find(p => p.projectId === projectId);
                  if (project) {
                    setSelectedProject(project);
                    setCurrentView('sample-details');
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </FrameContainer>
  );

  const renderSampleDetailsView = () => (
    <FrameContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading">Sample Details</h2>
          <ActionButton
            variant="secondary"
            onClick={() => setCurrentView('projects')}
          >
            Back
          </ActionButton>
        </div>

        {selectedProject && sampleInfo && (
          <>
            {/* Sample Info */}
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedProject.projectName}</h3>
                  <p className="text-sm text-text-secondary">
                    {sampleInfo.originalArtist} - {sampleInfo.songTitle}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-sm text-text-secondary">Album</div>
                  <div className="font-medium">{sampleInfo.album}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Year</div>
                  <div className="font-medium">{sampleInfo.releaseYear}</div>
                </div>
              </div>
            </div>

            {/* DMCA Risk */}
            {dmcaRisk && <DMCARiskIndicator risk={dmcaRisk} />}

            {/* License Options */}
            <div className="space-y-4">
              <h3 className="text-heading">License Options</h3>
              {licenses.map((license) => (
                <LicenseCard
                  key={license.licenseId}
                  license={license}
                  variant={license.status === 'approved' ? 'cleared' : 'pending'}
                  rightsHolder={sampleInfo.rightsHolders[0]}
                  onAction={(action) => handleLicenseAction(action, license.licenseId)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </FrameContainer>
  );

  // Render current view
  switch (currentView) {
    case 'upload':
      return renderUploadView();
    case 'projects':
      return renderProjectsView();
    case 'sample-details':
      return renderSampleDetailsView();
    default:
      return renderHomeView();
  }
}
