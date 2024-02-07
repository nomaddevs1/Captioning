import { useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import { useAudioContext } from "src/context/AudioContext";
//@ts-ignore
import { EditorState, ContentState } from "draft-js";
import { TranscriptionData } from "src/types/transcriptionDataTypes";

interface UseDisplayTranscriptContextReturn {
  transcriptionData: TranscriptionData[] | null;
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  toggleInteractiveMode: () => void;
  isInteractiveMode: boolean;
  handleSeek: (time: number) => void;
  showAudioControls: boolean;
  toggleShowAudioControls: () => void;
  onEditorChange: (newEditorState: EditorState) => void;
  resetEditor: () => void;
  audioFile: any;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export const useDisplayTranscriptContext =
  (): UseDisplayTranscriptContextReturn => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isInteractiveMode, setIsInteractiveMode] = useState(false);
    const [showAudioControls, setShowAudioControls] = useState(false);
    const { transcriptionData } = useTranscription(); // Assume it returns transcription data and other relevant states
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

    const toggleInteractiveMode = () => {
      setIsInteractiveMode(!isInteractiveMode);
      toggleShowAudioControls();
    };

    const handleSeek = (time: number) => {
      updateJump(time); // Assume this method updates the audio playback position
    };

    const toggleShowAudioControls = () => {
      setShowAudioControls(!showAudioControls);
    };

    const onEditorChange = (newEditorState: EditorState) => {
      setEditorState(newEditorState);
    };

    const resetEditor = () => {
      const emptyState = EditorState.createWithContent(
        ContentState.createFromText("")
      );
      setEditorState(emptyState);
    };

    return {
      transcriptionData,
      editorState,
      setEditorState,
      toggleInteractiveMode,
      isInteractiveMode,
      handleSeek,
      showAudioControls,
      toggleShowAudioControls,
      onEditorChange,
      resetEditor,
      audioFile,
      play,
      pause,
      isPlaying,
      currentTime,
      duration,
    };
  };
