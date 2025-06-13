
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import VoiceRecorder from './VoiceRecorder';

const JarvisInterface: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const { toast } = useToast();

  const sendToWebhook = async (message: string) => {
    try {
      setIsProcessing(true);
      setAiState('thinking');
      
      const simulateWebhookCall = new Promise<string>((resolve) => {
        setTimeout(() => {
          const responses = [
            "Processing your request now.",
            "I understand. Let me handle that for you.",
            "Analyzing your input. One moment please.",
            "Got it. Working on your request.",
            "Processing complete. Here's what I found."
          ];
          resolve(responses[Math.floor(Math.random() * responses.length)]);
        }, 2000);
      });

      const response = await simulateWebhookCall;
      
      setAiState('speaking');
      setTimeout(() => {
        setAiState('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Jarvis. Please check your webhook configuration.",
        variant: "destructive"
      });
      setAiState('idle');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceTranscription = (transcription: string) => {
    console.log('Voice input received:', transcription);
    sendToWebhook(transcription);
  };

  const handleRecordingStart = () => {
    setAiState('listening');
  };

  const handleRecordingStop = () => {
    setAiState('thinking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center relative overflow-hidden">
      {/* Ambient magical background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse magical-aura"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse magical-aura delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-accent/15 rounded-full blur-2xl animate-pulse magical-aura delay-500"></div>
      </div>

      {/* Floating orbs in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 floating-orb"
            style={{
              top: `${10 + (i * 10)}%`,
              left: `${5 + (i * 12)}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Main voice interface */}
      <div className="relative z-10">
        <VoiceRecorder 
          onTranscription={handleVoiceTranscription}
          onRecordingStart={handleRecordingStart}
          onRecordingStop={handleRecordingStop}
          disabled={isProcessing}
        />
        
        {/* Status text below orb */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-2xl font-light tracking-wide text-foreground/80">
            {aiState === 'idle' && "Ready"}
            {aiState === 'listening' && "Listening..."}
            {aiState === 'thinking' && "Processing..."}
            {aiState === 'speaking' && "Speaking..."}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
              aiState === 'idle' ? 'bg-muted-foreground/50' :
              aiState === 'listening' ? 'bg-primary animate-pulse scale-150' :
              aiState === 'thinking' ? 'bg-secondary animate-pulse scale-150' :
              'bg-accent animate-pulse scale-150'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JarvisInterface;
