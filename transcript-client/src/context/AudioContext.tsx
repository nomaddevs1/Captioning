// AudioContext.tsx

import { createContext, useContext, useState, ReactNode, useRef } from 'react';

type AudioContextType = {
  audioFile: File | null;
  setAudioFile: (audioData: File | null) => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number; // Add duration property
  setDuration: (duration: number) => void; // Setter for duration
  updateJump: (duration: number) => void; // Setter for duration
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Initialize duration state
  const audioRef = useRef(new Audio());

  const play = () => {
    if (audioFile && !isPlaying) {
      audioRef.current.src = URL.createObjectURL(audioFile);
      audioRef.current.currentTime = currentTime; // Set the playback position
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setDuration(audioRef.current.duration); // Set the duration
        updatePlaybackTime();
      });
    }
  };

  const pause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setCurrentTime(audioRef.current.currentTime); // Save the current playback position
      setIsPlaying(false);
      cancelAnimationFrame(animationFrameId); // Stop updating the playback time
    }
  };

  let animationFrameId: number;

  const updatePlaybackTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    animationFrameId = requestAnimationFrame(updatePlaybackTime);
  };

  const updateJump = (time: number) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  const contextValue: AudioContextType = {
    audioFile,
    setAudioFile,
    play,
    pause,
    isPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    updateJump
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  const { setCurrentTime, ...rest } = context;
  return { setCurrentTime, ...rest };
};
