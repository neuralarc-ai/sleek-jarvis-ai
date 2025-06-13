
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
      {/* Outer quantum field rings */}
      <div className="absolute inset-0 -m-32">
        <div className="absolute inset-0 rounded-full border border-primary/10 magical-ring scale-300"></div>
        <div className="absolute inset-0 rounded-full border border-secondary/15 magical-ring scale-250 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 magical-ring scale-200 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      </div>

      {/* Hexagonal energy matrix */}
      <div className="absolute inset-0 -m-24">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-secondary/20 magical-ring"
            style={{
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
              transform: `rotate(${i * 60}deg) scale(${1.5 + i * 0.3})`,
              animation: `magical-pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 500}ms`
            }}
          />
        ))}
      </div>

      {/* Energy pulse waves for recording */}
      {isRecording && (
        <>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-destructive/40 energy-wave"
              style={{
                animation: `energy-pulse 2s ease-out infinite`,
                animationDelay: `${i * 500}ms`,
                transform: `scale(${1.2 + i * 0.4})`
              }}
            />
          ))}
        </>
      )}

      {/* Thinking mode geometric patterns */}
      {isProcessing && (
        <div className="absolute inset-0 -m-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-2 border-secondary/30"
              style={{
                clipPath: i === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                          i === 1 ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' :
                          'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                animation: `thinking-glow ${2 + i}s linear infinite`,
                transform: `scale(${1.3 + i * 0.2})`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main orb container with innovative layering */}
      <div className="relative">
        {/* Outer holographic glow */}
        <div className={`absolute inset-0 -m-12 rounded-full transition-all duration-1000 ${
          isRecording 
            ? 'bg-gradient-conic from-destructive/30 via-primary/40 to-destructive/30 scale-160 orb-glow-active' 
            : isProcessing
            ? 'bg-gradient-conic from-secondary/30 via-accent/40 to-secondary/30 scale-140 orb-glow-thinking'
            : 'bg-gradient-radial from-primary/20 via-secondary/25 to-primary/15 scale-120 orb-glow-idle'
        }`} style={{
          background: isRecording 
            ? 'conic-gradient(from 0deg, #dc2626aa, #D48EA3aa, #dc2626aa, #D48EA3aa)' 
            : isProcessing
            ? 'conic-gradient(from 0deg, #97A487aa, #D48EA3aa, #97A487aa, #D48EA3aa)'
            : 'radial-gradient(circle, #D48EA350, #97A48740, #D48EA330)'
        }}></div>

        {/* Prismatic refraction layer */}
        <div className={`absolute inset-0 -m-8 rounded-full transition-all duration-700 ${
          isRecording 
            ? 'bg-gradient-to-br from-destructive/60 via-primary/70 to-destructive/50 animate-pulse scale-110' 
            : isProcessing
            ? 'bg-gradient-to-br from-secondary/60 via-accent/70 to-secondary/50 animate-spin scale-105'
            : 'bg-gradient-to-br from-primary/50 via-secondary/60 to-primary/40 scale-100'
        }`} style={{
          background: isRecording 
            ? 'linear-gradient(135deg, #dc2626bb, #D48EA3cc, #dc2626aa)' 
            : isProcessing
            ? 'linear-gradient(135deg, #97A487bb, #D48EA3cc, #97A487aa)'
            : 'linear-gradient(135deg, #D48EA3bb, #97A487cc, #D48EA3aa)'
        }}></div>

        {/* Crystalline core structure */}
        <div className={`absolute inset-0 -m-4 rounded-full border-2 transition-all duration-500 ${
          isRecording 
            ? 'border-destructive/80 bg-gradient-to-br from-destructive/40 via-primary/60 to-destructive/30' 
            : isProcessing
            ? 'border-secondary/80 bg-gradient-to-br from-secondary/40 via-accent/60 to-secondary/30'
            : 'border-primary/60 bg-gradient-to-br from-primary/30 via-secondary/50 to-primary/25'
        }`} style={{
          background: isRecording 
            ? 'linear-gradient(135deg, #dc262699, #D48EA3bb, #dc262677)' 
            : isProcessing
            ? 'linear-gradient(135deg, #97A48799, #D48EA3bb, #97A48777)'
            : 'linear-gradient(135deg, #D48EA399, #97A487bb, #D48EA377)',
          borderColor: isRecording ? '#dc2626cc' : isProcessing ? '#97A487cc' : '#D48EA3cc'
        }}></div>

        {/* Main quantum orb */}
        <button
          onClick={toggleRecording}
          disabled={disabled || isProcessing}
          className={`
            relative h-32 w-32 rounded-full transition-all duration-500 
            backdrop-blur-xl border-4
            hover:scale-110 active:scale-95
            ${isRecording 
              ? 'border-destructive/60 shadow-2xl' 
              : isProcessing
              ? 'border-secondary/60 shadow-2xl'
              : 'border-primary/40 shadow-2xl hover:border-primary/60'
            }
            ${isProcessing ? 'opacity-90 cursor-not-allowed' : ''}
          `}
          style={{
            background: isRecording 
              ? 'linear-gradient(135deg, #dc2626dd, #D48EA3ff, #dc2626cc)' 
              : isProcessing
              ? 'linear-gradient(135deg, #97A487dd, #D48EA3ff, #97A487cc)'
              : 'linear-gradient(135deg, #D48EA3dd, #97A487ff, #D48EA3cc)',
            borderColor: isRecording ? '#dc2626' : isProcessing ? '#97A487' : '#D48EA3',
            boxShadow: isRecording 
              ? '0 25px 50px -12px rgba(220, 38, 38, 0.6), 0 0 0 1px rgba(220, 38, 38, 0.3)'
              : isProcessing
              ? '0 25px 50px -12px rgba(151, 164, 135, 0.6), 0 0 0 1px rgba(151, 164, 135, 0.3)'
              : '0 25px 50px -12px rgba(212, 142, 163, 0.6), 0 0 0 1px rgba(212, 142, 163, 0.3)'
          }}
        >
          {/* Neural network pattern overlay */}
          <div className="absolute inset-2 rounded-full opacity-30" style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 2px, transparent 2px),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 2px, transparent 2px),
                        radial-gradient(circle at 30% 70%, rgba(255,255,255,0.4) 2px, transparent 2px),
                        radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 2px, transparent 2px)`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Volumetric highlight */}
          <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/40 blur-lg"></div>
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/60 blur-sm"></div>
          
          {/* Icon with quantum effect */}
          <div className="relative z-10 flex items-center justify-center h-full">
            {isProcessing ? (
              <div className="relative">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/20"></div>
                <div className="absolute inset-2 animate-pulse rounded-full bg-white/30"></div>
              </div>
            ) : isRecording ? (
              <div className="relative">
                <MicOff className="h-12 w-12 text-white animate-pulse drop-shadow-2xl" />
                <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/40"></div>
              </div>
            ) : (
              <div className="relative">
                <Mic className="h-12 w-12 text-white drop-shadow-2xl" />
                <div className="absolute -inset-2 rounded-full border border-white/20 animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Quantum base reflection */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-white/15 rounded-full blur-lg"></div>
        </button>

        {/* Orbital quantum particles */}
        {(isRecording || isProcessing) && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${
                  isRecording ? 'bg-destructive/80' : 'bg-secondary/80'
                } floating-particle`}
                style={{
                  top: `${50 + Math.sin((i * 30) * Math.PI / 180) * 80}%`,
                  left: `${50 + Math.cos((i * 30) * Math.PI / 180) * 80}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '4s',
                  backgroundColor: isRecording ? '#dc2626' : '#97A487',
                  boxShadow: `0 0 10px ${isRecording ? '#dc2626' : '#97A487'}`
                }}
              />
            ))}
          </div>
        )}

        {/* Holographic data streams */}
        {isProcessing && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-16 bg-gradient-to-t from-transparent via-secondary to-transparent"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${10 + i * 10}%`,
                  animation: `float-around 3s ease-in-out infinite`,
                  animationDelay: `${i * 200}ms`,
                  transform: `rotate(${i * 45}deg)`
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
