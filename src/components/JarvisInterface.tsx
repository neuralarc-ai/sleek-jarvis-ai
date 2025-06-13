
import React, { useState, useEffect } from 'react';
import { Settings, Waves, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import VoiceRecorder from './VoiceRecorder';
import AIStatusIndicator from './AIStatusIndicator';

const JarvisInterface: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [webhookUrl, setWebhookUrl] = useState('https://your-webhook-url.com/jarvis');
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const sendToWebhook = async (message: string) => {
    try {
      setIsProcessing(true);
      setAiState('thinking');
      
      // For demo purposes, we'll simulate a webhook response
      // In production, replace this with actual webhook call
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
      
      // Simulate AI speaking
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/30 backdrop-blur-xl bg-card/20 p-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Waves className="h-6 w-6 text-primary-foreground" />
              </div>
              {aiState !== 'idle' && (
                <div className="absolute -inset-2 rounded-full bg-primary/20 pulse-ring"></div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Jarvis
              </h1>
              <p className="text-sm text-muted-foreground">AI Voice Assistant</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-10 w-10 p-0 backdrop-blur-sm"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        {showSettings && (
          <Card className="max-w-2xl mx-auto mt-6 p-6 backdrop-blur-xl bg-card/40 border-border/30">
            <div className="space-y-3">
              <label className="text-sm font-medium">Webhook URL</label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Enter your webhook URL"
                className="bg-background/50 backdrop-blur-sm border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                Configure the endpoint where voice messages will be sent for processing.
              </p>
            </div>
          </Card>
        )}
      </header>

      {/* Main AI Interface */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-12">
          
          {/* AI Status Indicator */}
          <AIStatusIndicator state={aiState} />
          
          {/* Voice Interaction Area */}
          <div className="flex flex-col items-center space-y-8">
            <VoiceRecorder 
              onTranscription={handleVoiceTranscription}
              onRecordingStart={handleRecordingStart}
              onRecordingStop={handleRecordingStop}
              disabled={isProcessing}
            />
            
            {/* Status Text */}
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">
                {aiState === 'idle' && "Ready to listen"}
                {aiState === 'listening' && "Listening..."}
                {aiState === 'thinking' && "Processing..."}
                {aiState === 'speaking' && "Speaking..."}
              </p>
              <p className="text-sm text-muted-foreground">
                {aiState === 'idle' && "Hold the microphone to speak with Jarvis"}
                {aiState === 'listening' && "Speak now, I'm listening"}
                {aiState === 'thinking' && "Analyzing your request"}
                {aiState === 'speaking' && "Jarvis is responding"}
              </p>
            </div>
          </div>

          {/* AI Capabilities Indicators */}
          <div className="grid grid-cols-3 gap-6 opacity-60">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Real-time Processing</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground">Instant Response</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                <Waves className="h-6 w-6 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground">Voice Optimized</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JarvisInterface;
