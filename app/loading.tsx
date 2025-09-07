import { WaveformVisualizer } from '@/components/WaveformVisualizer';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <WaveformVisualizer isActive={true} />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">Loading SampleFlow</h2>
          <p className="text-text-secondary">Preparing your sample clearance platform...</p>
        </div>
      </div>
    </div>
  );
}
