
import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

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
        
        setTimeout(() => {
          onTranscription("Voice message recorded and ready for processing");
          setIsProcessing(false);
        }, 1000);
        
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
      {/* Outer tech rings - minimal and clean */}
      <div className="absolute inset-0 -m-24">
        <div className="absolute inset-0 rounded-full border border-primary/30"></div>
        <div className="absolute inset-0 rounded-full border border-secondary/20 scale-75"></div>
        <div className="absolute inset-0 rounded-full border border-primary/15 scale-50"></div>
      </div>

      {/* Recording pulse indicator */}
      {isRecording && (
        <div className="absolute inset-0 -m-8">
          <div className="absolute inset-0 rounded-full border-2 border-destructive/60 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border border-destructive/40 animate-pulse scale-110"></div>
        </div>
      )}

      {/* Processing indicator */}
      {isProcessing && (
        <div className="absolute inset-0 -m-12">
          <div className="absolute inset-0 rounded-full border-2 border-secondary/50 animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
      )}
      
      {/* Main orb container */}
      <div className="relative">
        {/* Soft glow background */}
        <div className={`absolute inset-0 -m-8 rounded-full transition-all duration-500 ${
          isRecording 
            ? 'bg-destructive/20 scale-110' 
            : isProcessing
            ? 'bg-secondary/20 scale-105'
            : 'bg-primary/15 scale-100'
        }`} style={{
          filter: 'blur(20px)'
        }}></div>

        {/* Glass morphism layer */}
        <div className={`absolute inset-0 -m-4 rounded-full backdrop-blur-xl border transition-all duration-500 ${
          isRecording 
            ? 'border-destructive/40 bg-destructive/10' 
            : isProcessing
            ? 'border-secondary/40 bg-secondary/10'
            : 'border-primary/30 bg-primary/5'
        }`}></div>

        {/* Main button */}
        <button
          onClick={toggleRecording}
          disabled={disabled || isProcessing}
          className={`
            relative h-32 w-32 rounded-full transition-all duration-300 
            backdrop-blur-xl border-2 shadow-2xl
            hover:scale-105 active:scale-95
            ${isRecording 
              ? 'border-destructive bg-gradient-to-br from-destructive/80 to-destructive/60' 
              : isProcessing
              ? 'border-secondary bg-gradient-to-br from-secondary/80 to-secondary/60'
              : 'border-primary bg-gradient-to-br from-primary/80 to-primary/60 hover:border-primary/80'
            }
            ${isProcessing ? 'opacity-90 cursor-not-allowed' : ''}
          `}
          style={{
            boxShadow: isRecording 
              ? '0 20px 40px -12px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : isProcessing
              ? '0 20px 40px -12px rgba(151, 164, 135, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 20px 40px -12px rgba(212, 142, 163, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Subtle highlight */}
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/30 blur-sm"></div>
          
          {/* Icon container */}
          <div className="relative z-10 flex items-center justify-center h-full">
            {isProcessing ? (
              <div className="relative">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              </div>
            ) : isRecording ? (
              <MicOff className="h-10 w-10 text-white drop-shadow-lg" />
            ) : (
              <Mic className="h-10 w-10 text-white drop-shadow-lg" />
            )}
          </div>

          {/* Base reflection */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white/10 rounded-full blur-md"></div>
        </button>

        {/* Tech corner accents */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary/60"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary/60"></div>

        {/* Subtle particle indicators for active states */}
        {(isRecording || isProcessing) && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  isRecording ? 'bg-destructive' : 'bg-secondary'
                }`}
                style={{
                  top: `${30 + Math.sin((i * 90) * Math.PI / 180) * 60}%`,
                  left: `${30 + Math.cos((i * 90) * Math.PI / 180) * 60}%`,
                  animation: 'pulse 2s ease-in-out infinite',
                  animationDelay: `${i * 500}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
