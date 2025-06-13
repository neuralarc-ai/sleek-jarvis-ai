
import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  disabled?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onTranscription, 
  onRecordingStart,
  onRecordingStop,
  disabled 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setIsProcessing(true);
        onRecordingStop?.();
        
        // For now, we'll simulate transcription since we need API keys
        // In a real implementation, you'd send this to a speech-to-text service
        setTimeout(() => {
          onTranscription("Voice message recorded and ready for processing");
          setIsProcessing(false);
        }, 1000);
        
        // Clean up the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      onRecordingStart?.();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings for recording state */}
      {isRecording && (
        <>
          <div className="absolute inset-0 rounded-full bg-primary/10 pulse-ring scale-150"></div>
          <div className="absolute inset-0 rounded-full bg-primary/10 pulse-ring scale-125 delay-75"></div>
        </>
      )}
      
      {/* Main microphone button */}
      <Button
        onClick={toggleRecording}
        disabled={disabled || isProcessing}
        size="lg"
        className={`
          relative h-20 w-20 rounded-full transition-all duration-500 backdrop-blur-sm
          ${isRecording 
            ? 'bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 jarvis-glow shadow-2xl shadow-destructive/25' 
            : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover:scale-110 shadow-xl shadow-primary/25'
          }
          ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}
        `}
      >
        {isProcessing ? (
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-background border-t-transparent"></div>
        ) : isRecording ? (
          <MicOff className="h-8 w-8 animate-pulse" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>

      {/* Recording indicator dots */}
      {isRecording && (
        <div className="absolute -bottom-8 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 bg-destructive rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
