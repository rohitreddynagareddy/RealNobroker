import React, { useState } from 'react';
import { playTextToSpeech } from '../services/geminiService';

interface TTSButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'icon' | 'full';
}

export const TTSButton: React.FC<TTSButtonProps> = ({ text, label = "Listen", className = "", variant = 'full' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling if inside a clickable card
    if (isPlaying) return;

    await playTextToSpeech(
      text,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  if (variant === 'icon') {
    return (
      <button 
        onClick={handlePlay}
        disabled={isPlaying}
        className={`p-2 rounded-full transition-colors ${isPlaying ? 'bg-teal-100 text-teal-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'} ${className}`}
        title="Listen to description"
      >
        {isPlaying ? (
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
             <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 2.489.192 4.37.348 5.595.342 1.24 1.519 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
             <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
           </svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
             <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 2.489.192 4.37.348 5.595.342 1.24 1.519 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.25 12a5.25 5.25 0 00-1.32-3.525.75.75 0 00-1.102 1.012A3.75 3.75 0 0115 12a3.75 3.75 0 01-.172.987.75.75 0 001.103 1.012A5.25 5.25 0 0017.25 12z" />
           </svg>
        )}
      </button>
    );
  }

  return (
    <button 
      onClick={handlePlay}
      disabled={isPlaying}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isPlaying ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'} ${className}`}
    >
      {isPlaying ? (
        <>
          <span className="animate-pulse">Speaking...</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
             <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 2.489.192 4.37.348 5.595.342 1.24 1.519 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
};