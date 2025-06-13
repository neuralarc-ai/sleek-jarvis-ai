
import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex gap-3 mb-6 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`
        flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center
        ${isUser ? 'bg-secondary' : 'bg-primary'}
      `}>
        {isUser ? (
          <User className="h-5 w-5 text-secondary-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-primary-foreground" />
        )}
      </div>
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`
          px-4 py-3 rounded-2xl backdrop-blur-sm
          ${isUser 
            ? 'bg-secondary/80 text-secondary-foreground' 
            : 'bg-card/80 text-card-foreground border border-border/50'
          }
        `}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
