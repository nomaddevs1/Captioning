// AudioContext.tsx

import { createContext, useContext, useState, ReactNode, useRef } from 'react';

type AudioContextType = {
  audioFile: File | null;
  setAudioFile: (audioData: File | null) => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  currentTime: number;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());

  const play = () => {
    if (audioFile && !isPlaying) {
      audioRef.current.src = URL.createObjectURL(audioFile);
      audioRef.current.currentTime = currentTime; // Set the playback position
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const pause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setCurrentTime(audioRef.current.currentTime); // Save the current playback position
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ audioFile, setAudioFile, play, pause, isPlaying, currentTime }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
