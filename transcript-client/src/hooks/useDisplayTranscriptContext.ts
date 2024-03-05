import { useEffect, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import { useAudioContext } from "src/context/AudioContext";
import { EditorState } from "draft-js";
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";
import { useLocation } from "react-router-dom";
import { useEditor } from "src/context/EditorContext";

interface UseDisplayTranscriptContextReturn {
  transcriptionData: TranscriptionSegment[] | null;
  toggleInteractiveMode: () => void;
  isInteractiveMode: boolean;
  handleSeek: (time: number) => void;
  showAudioControls: boolean;
  toggleShowAudioControls: () => void;
  resetEditor: (initialEditorState: EditorState | null) => void;
  audioFile: any;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export const useDisplayTranscriptContext = (): UseDisplayTranscriptContextReturn => {
  const { setEditorState } = useEditor();
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const { transcriptionData, resetStyles } = useTranscription(); // Assume it returns transcription data and other relevant states
  const {
    audioFile,
    setAudioFile: setContextAudioFile,
    play,
    pause,
    isPlaying,
    currentTime,
    duration,
    updateJump,
  } = useAudioContext(); // Assume it returns audio playback state and controls
  const location = useLocation();
  const uploadedFile = (location.state as any)?.uploadedFile as
    | File
    | undefined;

  // Handle the uploaded file, you may want to set it in the audio context or perform other actions
  useEffect(() => {
    // Handle the uploaded file, you may want to set it in the audio context or perform other actions
    if (uploadedFile && !audioFile) {
      setContextAudioFile(uploadedFile);
      // Additional processing if needed
    }
  }, [uploadedFile, audioFile, setContextAudioFile]);
  const toggleInteractiveMode = () => {
    if (isInteractiveMode) {
      pause();
    }
    setIsInteractiveMode(!isInteractiveMode);
    toggleShowAudioControls();
  };

  const handleSeek = (time: number) => {
    updateJump(time); // Assume this method updates the audio playback position
  };

  const toggleShowAudioControls = () => {
    setShowAudioControls(!showAudioControls);
  };

  const resetEditor = (initialEditorState: EditorState | null) => {
    // if (initialEditorState) {
    //@ts-ignore
      setEditorState(initialEditorState);
      resetStyles();
    // }
  };

  return {
    transcriptionData,
    toggleInteractiveMode,
    isInteractiveMode,
    handleSeek,
    showAudioControls,
    toggleShowAudioControls,
    // onEditorChange,
    resetEditor,
    audioFile,
    play,
    pause,
    isPlaying,
    currentTime,
    duration,
  };
};
