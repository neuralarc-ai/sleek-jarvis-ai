
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
      {/* Outer magical rings */}
      <div className="absolute inset-0 -m-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 magical-ring scale-150 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/15 to-primary/15 magical-ring scale-200 animate-pulse delay-1000"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 magical-ring scale-250 animate-pulse delay-500"></div>
      </div>

      {/* Recording energy waves */}
      {isRecording && (
        <>
          <div className="absolute inset-0 -m-12 rounded-full bg-primary/30 energy-wave animate-ping"></div>
          <div className="absolute inset-0 -m-8 rounded-full bg-primary/20 energy-wave animate-ping delay-200"></div>
          <div className="absolute inset-0 -m-4 rounded-full bg-primary/10 energy-wave animate-ping delay-400"></div>
        </>
      )}
      
      {/* Main orb container */}
      <div className="relative">
        {/* Orb glow effect */}
        <div className={`absolute inset-0 -m-8 rounded-full transition-all duration-1000 ${
          isRecording 
            ? 'bg-gradient-to-r from-destructive/40 to-primary/40 scale-150 orb-glow-active' 
            : isProcessing
            ? 'bg-gradient-to-r from-secondary/40 to-accent/40 scale-125 orb-glow-thinking'
            : 'bg-gradient-to-r from-primary/30 to-secondary/30 scale-100 orb-glow-idle'
        }`}></div>

        {/* Inner orb layers */}
        <div className={`absolute inset-0 -m-4 rounded-full transition-all duration-700 ${
          isRecording 
            ? 'bg-gradient-to-br from-destructive/60 to-primary/60 animate-pulse' 
            : isProcessing
            ? 'bg-gradient-to-br from-secondary/60 to-accent/60 animate-spin'
            : 'bg-gradient-to-br from-primary/50 to-secondary/50'
        }`}></div>

        {/* Main microphone orb */}
        <button
          onClick={toggleRecording}
          disabled={disabled || isProcessing}
          className={`
            relative h-32 w-32 rounded-full transition-all duration-500 
            backdrop-blur-xl border-2 border-white/20
            hover:scale-110 active:scale-95
            ${isRecording 
              ? 'bg-gradient-to-br from-destructive via-primary to-destructive/80 shadow-2xl shadow-destructive/50' 
              : isProcessing
              ? 'bg-gradient-to-br from-secondary via-accent to-secondary/80 shadow-2xl shadow-secondary/50'
              : 'bg-gradient-to-br from-primary via-secondary to-primary/80 shadow-2xl shadow-primary/50 hover:shadow-primary/70'
            }
            ${isProcessing ? 'opacity-90 cursor-not-allowed' : ''}
          `}
        >
          {/* Inner orb highlight */}
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/30 blur-sm"></div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center h-full">
            {isProcessing ? (
              <div className="relative">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                <div className="absolute inset-2 animate-pulse rounded-full bg-white/20"></div>
              </div>
            ) : isRecording ? (
              <MicOff className="h-12 w-12 text-white animate-pulse drop-shadow-lg" />
            ) : (
              <Mic className="h-12 w-12 text-white drop-shadow-lg" />
            )}
          </div>

          {/* Bottom reflection */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white/10 rounded-full blur-md"></div>
        </button>

        {/* Floating particles */}
        {(isRecording || isProcessing) && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  isRecording ? 'bg-destructive/60' : 'bg-secondary/60'
                } floating-particle`}
                style={{
                  top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 60}%`,
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 60}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '3s'
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
