
import React, { useState, useRef, useEffect } from 'react';
import { Settings, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import VoiceRecorder from './VoiceRecorder';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const JarvisInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://your-webhook-url.com/jarvis');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      text: "Hello! I'm Jarvis, your AI assistant. You can speak to me using the microphone button below.",
      isUser: false,
      timestamp: new Date()
    }]);
  }, []);

  const sendToWebhook = async (message: string) => {
    try {
      setIsProcessing(true);
      
      // For demo purposes, we'll simulate a webhook response
      // In production, replace this with actual webhook call
      const simulateWebhookCall = new Promise<string>((resolve) => {
        setTimeout(() => {
          const responses = [
            "I understand your request. Let me process that for you.",
            "Interesting question! Based on the data I have, here's what I think...",
            "I'm analyzing your input now. Give me a moment to formulate the best response.",
            "That's a great point. Let me provide you with some insights on that topic.",
            "I've processed your request. Here's my recommendation based on current information."
          ];
          resolve(responses[Math.floor(Math.random() * responses.length)]);
        }, 1500);
      });

      const response = await simulateWebhookCall;
      
      // Add Jarvis response
      const jarvisMessage: Message = {
        id: Date.now().toString() + '_jarvis',
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, jarvisMessage]);
      
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Jarvis. Please check your webhook configuration.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceTranscription = (transcription: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: transcription,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send to webhook
    sendToWebhook(transcription);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Waves className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Jarvis</h1>
              <p className="text-sm text-muted-foreground">AI Assistant</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-9 w-9 p-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {showSettings && (
          <Card className="max-w-4xl mx-auto mt-4 p-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-sm font-medium">Webhook URL</label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Enter your webhook URL"
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Configure the endpoint where voice messages will be sent for processing.
              </p>
            </div>
          </Card>
        )}
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isProcessing && (
            <div className="flex gap-3 mb-6 animate-fade-in">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
              </div>
              <div className="flex flex-col">
                <div className="px-4 py-3 rounded-2xl bg-card/80 border border-border/50">
                  <p className="text-sm text-muted-foreground">Jarvis is thinking...</p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Voice Input Area */}
        <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm p-6">
          <div className="flex flex-col items-center gap-4">
            <VoiceRecorder 
              onTranscription={handleVoiceTranscription}
              disabled={isProcessing}
            />
            <p className="text-sm text-muted-foreground text-center">
              {isProcessing 
                ? "Processing your message..." 
                : "Hold the microphone to speak with Jarvis"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JarvisInterface;
