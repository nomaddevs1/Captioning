// audioUtils.ts

// Format time in seconds to mm:ss format
export const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
  // Calculate percentage based on current time and duration
  export const calculatePercentage = (currentTime: number, duration: number): number => {
    return (currentTime / duration) * 100 || 0;
  };
  