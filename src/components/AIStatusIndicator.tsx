
import React from 'react';
import { Waves, Zap, Activity } from 'lucide-react';

interface AIStatusIndicatorProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking';
}

const AIStatusIndicator: React.FC<AIStatusIndicatorProps> = ({ state }) => {
  const getVisualization = () => {
    switch (state) {
      case 'idle':
        return (
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
              <Waves className="h-12 w-12 text-primary opacity-60" />
            </div>
          </div>
        );
      
      case 'listening':
        return (
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 flex items-center justify-center recording-animation">
              <Activity className="h-12 w-12 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/20 pulse-ring"></div>
            <div className="absolute inset-0 rounded-full bg-primary/10 pulse-ring delay-75"></div>
          </div>
        );
      
      case 'thinking':
        return (
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-secondary/40 to-accent/40 flex items-center justify-center">
              <div className="relative">
                <Zap className="h-12 w-12 text-secondary animate-pulse" />
                <div className="absolute inset-0 animate-spin">
                  <div className="h-2 w-2 bg-secondary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                  <div className="h-2 w-2 bg-secondary rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
                  <div className="h-2 w-2 bg-secondary rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
                  <div className="h-2 w-2 bg-secondary rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'speaking':
        return (
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-accent/40 to-primary/40 flex items-center justify-center">
              <Waves className="h-12 w-12 text-accent" />
            </div>
            {/* Audio wave visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-accent rounded-full animate-pulse"
                    style={{
                      height: '20px',
                      animationDelay: `${i * 100}ms`,
                      animationDuration: '600ms'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {getVisualization()}
      
      {/* Status Text */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">
          {state === 'idle' && 'Jarvis Ready'}
          {state === 'listening' && 'Listening...'}
          {state === 'thinking' && 'Processing...'}
          {state === 'speaking' && 'Responding...'}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${
            state === 'idle' ? 'bg-muted-foreground' :
            state === 'listening' ? 'bg-primary animate-pulse' :
            state === 'thinking' ? 'bg-secondary animate-pulse' :
            'bg-accent animate-pulse'
          }`}></div>
          <span className="text-sm text-muted-foreground uppercase tracking-wide">
            {state}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIStatusIndicator;
